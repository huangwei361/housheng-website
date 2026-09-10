// Real mouse click test
const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const URL = 'file:///C:/Users/64549/.minimax/大健康公司/shop/admin.html';

function cdp(port, target, method, params={}){
  return new Promise((resolve, reject)=>{
    const ws = new WebSocket('ws://127.0.0.1:'+port+'/devtools/page/'+target);
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
    ws.addEventListener('error', reject);
  });
}
function httpJson(port, p){
  return new Promise((res, rej)=>{
    http.get({host:'127.0.0.1', port, path:p, headers:{Host:'localhost:'+port}}, r=>{
      let b=''; r.on('data',c=>b+=c); r.on('end',()=>{try{res(JSON.parse(b))}catch(e){rej(e)}});
    }).on('error', rej);
  });
}
async function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

(async()=>{
  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'], {stdio:'ignore'}); }catch{}
  await sleep(500);
  const userData = 'C:\\tmp_real_click';
  fs.rmSync(userData, {recursive:true, force:true});
  fs.mkdirSync(userData, {recursive:true});
  const port = 9400 + Math.floor(Math.random()*100);
  const p = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage','--hide-scrollbars','--remote-debugging-port='+port,'--user-data-dir='+userData,'--window-size=1440,900', URL], {stdio:'ignore', detached:true});
  p.unref();
  let target = null;
  for(let i=0;i<30;i++){
    await sleep(400);
    try{
      const list = await httpJson(port, '/json');
      const t = list.find(x => x.type==='page' && x.url.startsWith('file://'));
      if(t){ target = t.webSocketDebuggerUrl.split('/').pop(); break; }
    }catch{}
  }
  if(!target){ console.log('NO TARGET'); return; }
  await cdp(port, target, 'Page.enable');
  await cdp(port, target, 'Input.setIgnoreInputEvents', { ignore: false });
  await cdp(port, target, 'Page.navigate', { url: URL });
  await sleep(2500);

  await cdp(port, target, 'Runtime.evaluate', { expression: "document.getElementById('loginPwd').value='admin888'; adminLogin();" });
  await sleep(1500);

  let shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\real_click_1_logged_in.png', Buffer.from(shot.data,'base64'));
  console.log('shot 1: logged in');

  const navRects = await cdp(port, target, 'Runtime.evaluate', { expression: "var els = Array.from(document.querySelectorAll('.admin-nav-item')).filter(n => n.dataset.pane==='products'); els.length ? JSON.stringify(els.map(n => ({pane: n.dataset.pane, rect: n.getBoundingClientRect()}))) : 'NONE'" });
  if(navRects.result.value === 'NONE'){ console.log('no products nav found'); return; }
  const navR = JSON.parse(navRects.result.value);
  console.log('products nav rect:', JSON.stringify(navR));
  if(navR.length > 0){
    const r = navR[0].rect;
    console.log('clicking at', r.x + r.width/2, r.y + r.height/2);
    await cdp(port, target, 'Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x + r.width/2, y: r.y + r.height/2 });
    await sleep(100);
    await cdp(port, target, 'Input.dispatchMouseEvent', { type: 'mousePressed', x: r.x + r.width/2, y: r.y + r.height/2, button: 'left', clickCount: 1 });
    await sleep(50);
    await cdp(port, target, 'Input.dispatchMouseEvent', { type: 'mouseReleased', x: r.x + r.width/2, y: r.y + r.height/2, button: 'left', clickCount: 1 });
    await sleep(1000);
  }
  shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\real_click_2_after_click.png', Buffer.from(shot.data,'base64'));
  const st = await cdp(port, target, 'Runtime.evaluate', { expression: "JSON.stringify({activePane: document.querySelector('.admin-pane.active')?.dataset?.pane, navActive: document.querySelector('.admin-nav-item.active')?.dataset?.pane})" });
  console.log('after real click:', st.result.value);

  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'}); }catch{}
  console.log('done');
})();
