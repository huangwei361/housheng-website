// CDP-driven screenshot suite for admin.html
// Usage:  node tools/cdp_shot.js          (snap all 13 panes)
//   or:   node tools/cdp_shot.js orders   (snap one pane)
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ALL_PANES = ['dashboard','products','orders','customers','finance','inventory','marketing','content','service','consult','aftersales','analytics','settings'];
const PANES = process.argv[2] && !/^\d/.test(process.argv[2])
  ? [process.argv[2]]
  : ALL_PANES;
const OUT   = String.raw`C:\Users\64549\.minimax\大健康公司\shop\smoke`;
const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const URL_BASE = 'file:///C:/Users/64549/.minimax/大健康公司/shop/admin.html?demo=1#';

function cdp(port, target, method, params={}){
  return new Promise((resolve, reject)=>{
    const ws = new WebSocket(`ws://127.0.0.1:${port}/devtools/page/${target}`);
    const id = Math.floor(Math.random()*1e9);
    ws.addEventListener('open', ()=> ws.send(JSON.stringify({id, method, params})));
    ws.addEventListener('message', (ev)=>{
      const msg = JSON.parse(ev.data);
      if(msg.id === id){
        ws.close();
        if(msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
    ws.addEventListener('error', (e)=>reject(e));
  });
}

function httpJson(port, urlPath){
  return new Promise((resolve, reject)=>{
    http.get({host:'127.0.0.1', port, path:urlPath, headers:{Host:`localhost:${port}`}}, (res)=>{
      let buf = '';
      res.on('data', c=>buf+=c);
      res.on('end', ()=>{ try{resolve(JSON.parse(buf))}catch(e){reject(e)} });
    }).on('error', reject);
  });
}

(async ()=>{
  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'], {stdio:'ignore'}); }catch{}
  await new Promise(r=>setTimeout(r,500));

  for(const pane of PANES){
    const userData = `C:\\tmp_cdp_${pane}`;
    fs.rmSync(userData, {recursive:true, force:true});
    fs.mkdirSync(userData, {recursive:true});

    const port = 9200 + Math.floor(Math.random()*200);
    const args = [
      '--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage','--hide-scrollbars',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userData}`,
      '--window-size=1440,900',
      `${URL_BASE}${pane}`
    ];
    const p = spawn(CHROME, args, {stdio:'ignore', detached:true});
    p.unref();

    let target = null;
    for(let i=0;i<30;i++){
      await new Promise(r=>setTimeout(r,400));
      try{
        const list = await httpJson(port, '/json');
        const t = list.find(x => x.type === 'page' && x.url.startsWith('file://'));
        if(t){ target = t.webSocketDebuggerUrl.split('/').pop(); break; }
      }catch{}
    }
    if(!target){ console.log('FAIL', pane); try{spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'})}catch{}; continue; }

    await cdp(port, target, 'Page.enable');
    await cdp(port, target, 'Page.navigate', { url: `${URL_BASE}${pane}` });
    await new Promise(r=>setTimeout(r,2500));

    // wait for switchPane ready
    for(let i=0;i<30;i++){
      await new Promise(r=>setTimeout(r,200));
      const r = await cdp(port, target, 'Runtime.evaluate', { expression: "typeof switchPane === 'function' ? 'ok' : 'wait'" });
      if(r && r.result && r.result.value === 'ok') break;
    }

    // switch to target pane + render
    await cdp(port, target, 'Runtime.evaluate', { expression: "(function(){ try{ document.body.classList.add('demo'); const navItems=document.querySelectorAll('.admin-nav-item'); for(const n of navItems){ n.classList.remove('active'); if(n.dataset.pane==='"+pane+"') n.classList.add('active'); } document.querySelectorAll('.admin-pane').forEach(p=>p.classList.remove('active')); const t=document.querySelector('.admin-pane[data-pane=\""+pane+"\"]'); if(t) t.classList.add('active'); switchPane('"+pane+"'); renderProducts(); renderOrders(); renderCustomers(); }catch(e){} })();" });
    await new Promise(r=>setTimeout(r,1200));

    const shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
    const outPath = path.join(OUT, `v9_${pane}.png`);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    const sz = fs.statSync(outPath).size;
    console.log('OK', pane.padEnd(12), 'size='+sz);

    try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'}); }catch{}
    await new Promise(r=>setTimeout(r,500));
  }
  console.log('done.');
})();
