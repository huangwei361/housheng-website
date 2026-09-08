// Test: login → click "商品管理" → screenshot
const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const URL = 'file:///C:/Users/64549/.minimax/大健康公司/shop/admin.html';

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
    ws.addEventListener('error', reject);
  });
}
function httpJson(port, p){
  return new Promise((res, rej)=>{
    http.get({host:'127.0.0.1', port, path:p, headers:{Host:`localhost:${port}`}}, r=>{
      let b=''; r.on('data',c=>b+=c); r.on('end',()=>{try{res(JSON.parse(b))}catch(e){rej(e)}});
    }).on('error', rej);
  });
}

(async()=>{
  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'], {stdio:'ignore'}); }catch{}
  await new Promise(r=>setTimeout(r,500));
  const userData = 'C:\\tmp_click_test';
  fs.rmSync(userData, {recursive:true, force:true});
  fs.mkdirSync(userData, {recursive:true});
  const port = 9300 + Math.floor(Math.random()*100);
  const p = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage','--hide-scrollbars',`--remote-debugging-port=${port}`,`--user-data-dir=${userData}`,'--window-size=1440,900', URL], {stdio:'ignore', detached:true});
  p.unref();
  let target = null;
  for(let i=0;i<30;i++){
    await new Promise(r=>setTimeout(r,400));
    try{
      const list = await httpJson(port, '/json');
      const t = list.find(x => x.type==='page' && x.url.startsWith('file://'));
      if(t){ target = t.webSocketDebuggerUrl.split('/').pop(); break; }
    }catch{}
  }
  if(!target){ console.log('NO TARGET'); return; }
  await cdp(port, target, 'Page.enable');
  await cdp(port, target, 'Page.navigate', { url: URL });
  await new Promise(r=>setTimeout(r,2500));

  // Step 1: snapshot the LOGIN page
  let shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\click_test_1_login.png', Buffer.from(shot.data,'base64'));
  console.log('shot 1: login page');

  // Step 2: type password and click login
  await cdp(port, target, 'Runtime.evaluate', { expression: "document.getElementById('loginPwd').value='admin888'; adminLogin();" });
  await new Promise(r=>setTimeout(r,1500));
  // Force render via direct DOM ops (in case renderAll is missing)
  await cdp(port, target, 'Runtime.evaluate', { expression: "if(typeof renderProducts==='function') renderProducts(); if(typeof renderOrders==='function') renderOrders(); if(typeof renderCustomers==='function') renderCustomers();" });
  await new Promise(r=>setTimeout(r,1500));
  shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\click_test_2_after_login.png', Buffer.from(shot.data,'base64'));
  const st1 = await cdp(port, target, 'Runtime.evaluate', { expression: "JSON.stringify({adminDisp: getComputedStyle(document.getElementById('adminPage')).display, mainRect: document.querySelector('.admin-main')?.getBoundingClientRect(), sidebarRect: document.querySelector('.admin-sidebar')?.getBoundingClientRect(), contentRect: document.querySelector('.admin-content')?.getBoundingClientRect(), mainDisplay: getComputedStyle(document.querySelector('.admin-main')).display, mainPos: getComputedStyle(document.querySelector('.admin-main')).position, mainZ: getComputedStyle(document.querySelector('.admin-main')).zIndex, mainW: getComputedStyle(document.querySelector('.admin-main')).width, adminGridCols: getComputedStyle(document.getElementById('adminPage')).gridTemplateColumns})" });
  console.log('after login:', st1.result.value);

  // Step 3: click "商品管理" nav-item via JS (simulate click)
  await cdp(port, target, 'Runtime.evaluate', { expression: "(function(){ const el = document.querySelector('.admin-nav-item[data-pane=\"products\"]'); if(!el){ return 'NOT_FOUND'; } el.click(); return 'CLICKED'; })()" });
  await new Promise(r=>setTimeout(r,500));
  shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\click_test_3_after_click_products.png', Buffer.from(shot.data,'base64'));
  const st2 = await cdp(port, target, 'Runtime.evaluate', { expression: "JSON.stringify({activePane: document.querySelector('.admin-pane.active')?.dataset?.pane, productRows: document.getElementById('productTable')?.children?.length, navActive: document.querySelector('.admin-nav-item.active')?.dataset?.pane})" });
  console.log('after click products:', st2.result.value);

  // Step 4: click "订单管理"
  await cdp(port, target, 'Runtime.evaluate', { expression: "(function(){ const el = document.querySelector('.admin-nav-item[data-pane=\"orders\"]'); el.click(); })()" });
  await new Promise(r=>setTimeout(r,500));
  shot = await cdp(port, target, 'Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('C:\\Users\\64549\\.minimax\\大健康公司\\shop\\smoke\\click_test_4_after_click_orders.png', Buffer.from(shot.data,'base64'));
  const st3 = await cdp(port, target, 'Runtime.evaluate', { expression: "JSON.stringify({activePane: document.querySelector('.admin-pane.active')?.dataset?.pane, orderRows: document.getElementById('orderTable')?.children?.length})" });
  console.log('after click orders:', st3.result.value);

  try{ spawn('taskkill',['/F','/IM','chrome.exe','/T'],{stdio:'ignore'}); }catch{}
  console.log('done');
})();
