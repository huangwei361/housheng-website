// 用 CDP 模拟微信 UA 截图,验证 wechat-tip 渲染
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const SHOP = String.raw`C:\Users\64549\.minimax\大健康公司\shop`;
const OUT  = path.join(SHOP, 'smoke');
const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const PAGES = ['index.html','service.html','cart.html','product.html','user.html','account.html','consult.html','chat.html','compare.html','checkout.html','detail.html'];
const UA_WECHAT = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003130) NetType/WIFI Language/zh_CN";

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
    http.get({host:'127.0.0.1', port, path:urlPath}, (res)=>{
      let buf = '';
      res.on('data', c=>buf+=c);
      res.on('end', ()=>{ try{resolve(JSON.parse(buf))}catch(e){reject(e)} });
    }).on('error', reject);
  });
}

(async ()=>{
  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'], {stdio:'ignore'}); }catch{}
  await new Promise(r=>setTimeout(r,500));

  for(const page of PAGES){
    const userData = `C:\\tmp_wx_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    fs.rmSync(userData, {recursive:true, force:true});
    fs.mkdirSync(userData, {recursive:true});
    const port = 9300 + Math.floor(Math.random()*300);
    const url  = `file:///${SHOP.replace(/\\/g,'/')}/${page}`;

    const args = [
      '--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage','--hide-scrollbars',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userData}`,
      `--user-agent=${UA_WECHAT}`,
      '--window-size=390,1400',
      url
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
    if(!target){ console.log('FAIL', page); try{spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'})}catch{}; continue; }

    await cdp(port, target, 'Page.enable');
    await cdp(port, target, 'Page.navigate', { url });
    await new Promise(r=>setTimeout(r,2000));

    // 检查 wechat-tip 是否渲染
    let hasTip = false;
    try{
      const r = await cdp(port, target, 'Runtime.evaluate', { expression: "document.querySelector('.wechat-tip') ? 'YES' : 'NO'" });
      hasTip = r && r.result && r.result.value === 'YES';
    }catch{}

    // 等渲染稳定
    await new Promise(r=>setTimeout(r,400));

    const shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
    const outPath = path.join(OUT, `wx_${page.replace('.html','')}.png`);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    const sz = fs.statSync(outPath).size;
    console.log((hasTip?'✓':'✗'), page.padEnd(20), 'tip=' + (hasTip?'YES':'NO '), 'size='+sz);

    try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'}); }catch{}
    await new Promise(r=>setTimeout(r,400));
  }
  console.log('done.');
})();
