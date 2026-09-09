/* 厚生 HOUSHENG · 营养商城 · 交互逻辑 */
(function(){
  const $  = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s||"").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => Number(n).toLocaleString("zh-CN",{minimumFractionDigits:0});
  const money = n => "¥" + fmt(n);

  const LS = {
    cart:        "hs_cart",
    favorites:   "hs_favorites",
    compare:     "hs_compare",
    user:        "hs_user",
    coupons:     "hs_coupons",
    usedCoupon:  "hs_used_coupon",
    addresses:   "hs_addresses",
    recent:      "hs_recent_search",
    history:     "hs_browse_history",
  };

  // ========== 顶部 nav / footer 渲染 ==========
  function renderTopBar(){
    return `
    <div class="top-bar">
      <div class="container">
        <div>📞 健康咨询：13971691656（微信同号） · 📧 huangwei_361@163.com</div>
        <div>
          <a href="consult.html">健康咨询</a> ·
          <a href="user.html?tab=orders">我的订单</a> ·
          <a href="chat.html">消息</a> ·
          <a href="#about">关于厚生</a>
        </div>
      </div>
    </div>
    <nav class="navbar">
      <div class="container">
        <a class="brand" href="index.html">
          <span class="brand-mark">厚</span>
          <div class="brand-text">
            <div class="brand-name">厚生 HOUSHENG</div>
            <div class="brand-slogan">厚待众生 · 让健康回归生活</div>
          </div>
        </a>
        <div class="nav-search">
          <input type="text" id="navSearchInput" placeholder="搜索商品 / 功效 / 食材（如：助眠、三高、八段锦）" />
          <button onclick="HS.doSearch()">🔍</button>
        </div>
        <div class="nav-links">
          <a href="index.html">首页</a>
          <a href="service.html">六大服务</a>
          <a href="product.html">产品</a>
          <a href="cart.html" class="nav-cart">🛒 购物车 <span class="cart-badge" id="cartBadge">0</span></a>
          <a href="user.html">👤 我的</a>
        </div>
      </div>
    </nav>
    <div class="cat-nav">
      <div class="container">
        <a href="index.html">首页</a>
        <a href="product.html?cat=基础营养" id="catNavBasic">基础营养</a>
        <a href="product.html?cat=慢病养护" id="catNavCare">慢病养护</a>
        <a href="product.html?cat=肠胃健康" id="catNavGut">肠胃健康</a>
        <a href="product.html?cat=运动营养" id="catNavFit">运动营养</a>
        <a href="compare.html" style="margin-left:auto">⚖️ 对比 (<span id="navCmpCount">0</span>)</a>
      </div>
    </div>`;
  }

  function renderFooter(){
    return `
    <footer class="footer">
      <div class="container">
        <div>
          <h4 style="color:#fff">厚生 HOUSHENG</h4>
          <p style="font-size:13px;line-height:1.7;margin-top:8px">厚待众生 · 让健康回归生活<br>For Life, For Wellness</p>
          <p style="font-size:12px;margin-top:14px;color:#666">📞 13971691656（微信同号）<br>📧 huangwei_361@163.com<br>📍 武汉·青山</p>
        </div>
        <div>
          <h4>了解厚生</h4>
          <ul><li><a href="#about">品牌理念</a></li><li><a href="service.html">六大服务</a></li><li><a href="product.html">产品体系</a></li><li><a href="chat.html">健康科普</a></li></ul>
        </div>
        <div>
          <h4>健康服务</h4>
          <ul><li><a href="service.html#nutrition">🥗 公共营养学</a></li><li><a href="service.html#exercise">🏃 运动健康</a></li><li><a href="service.html#gongfa">🌿 传统功法</a></li><li><a href="service.html#tcm">💆 中医理疗</a></li><li><a href="service.html#psy">💭 心理咨询</a></li><li><a href="service.html#check">🩺 健康检测</a></li></ul>
        </div>
        <div>
          <h4>个人中心</h4>
          <ul><li><a href="user.html">会员中心</a></li><li><a href="user.html?tab=orders">我的订单</a></li><li><a href="user.html?tab=favorites">我的收藏</a></li><li><a href="user.html?tab=coupons">优惠券</a></li></ul>
        </div>
        <div>
          <h4>联系我们</h4>
          <ul><li><a href="chat.html">💬 在线咨询</a></li><li><a href="#" onclick="HS.Toast.show('已复制微信号:13971691656','success');return false;">📋 复制微信</a></li><li><a href="mailto:huangwei_361@163.com">📧 邮件联系</a></li><li><a href="admin.html">后台管理</a></li></ul>
        </div>
      </div>
      <div class="copyright">
        © 2026 厚生 HOUSHENG · 厚待众生 · 营养商城
        <br>
        <span style="font-size:11px;color:#888">本站所售商品均为营养保健食品,不可替代药物治疗</span>
      </div>
    </footer>`;
  }

  // ========== 购物车 ==========
  const Cart = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.cart))||[]}catch(e){return []} },
    set(items){ localStorage.setItem(LS.cart, JSON.stringify(items)); Cart.updateBadge(); },
    add(id, qty=1){
      const items = Cart.get();
      const item = items.find(i => i.id===id);
      if(item) item.qty += qty;
      else items.push({id, qty});
      Cart.set(items);
      Toast.show(`✓ 已加入购物车`, "success");
    },
    remove(id){
      const items = Cart.get().filter(i => i.id!==id);
      Cart.set(items);
    },
    update(id, qty){
      const items = Cart.get();
      const item = items.find(i => i.id===id);
      if(item){ item.qty = Math.max(1, qty); Cart.set(items); }
    },
    count(){ return Cart.get().reduce((s,i) => s+i.qty, 0); },
    total(){ return Cart.get().reduce((s,i) => {
      const p = HS.products.find(p => p.id===i.id);
      return s + (p ? p.price*i.qty : 0);
    }, 0); },
    clear(){ Cart.set([]); },
    updateBadge(){ const b = $("#cartBadge"); if(b) b.textContent = Cart.count(); }
  };

  // ========== 收藏 ==========
  const Fav = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.favorites))||[]}catch(e){return []} },
    set(arr){ localStorage.setItem(LS.favorites, JSON.stringify(arr)); },
    toggle(id){
      const arr = Fav.get();
      const idx = arr.indexOf(id);
      if(idx>-1){ arr.splice(idx,1); Toast.show("已取消收藏"); }
      else{ arr.push(id); Toast.show("❤ 已收藏", "success"); }
      Fav.set(arr);
      return idx===-1;
    },
    has(id){ return Fav.get().includes(id); }
  };

  // ========== 对比 ==========
  const Compare = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.compare))||[]}catch(e){return []} },
    set(arr){ localStorage.setItem(LS.compare, JSON.stringify(arr)); },
    toggle(id){
      const arr = Compare.get();
      const idx = arr.indexOf(id);
      if(idx>-1){ arr.splice(idx,1); Toast.show("已移出对比"); }
      else{
        if(arr.length>=4){ Toast.show("最多对比 4 款", "error"); return false; }
        arr.push(id); Toast.show("✓ 已加入对比", "success");
      }
      Compare.set(arr);
      return idx===-1;
    },
    has(id){ return Compare.get().includes(id); },
    count(){ return Compare.get().length; }
  };

  // ========== 优惠券 ==========
  const Coupon = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.coupons))||null}catch(e){return null} },
    set(arr){ if(arr) localStorage.setItem(LS.coupons, JSON.stringify(arr)); else localStorage.removeItem(LS.coupons); },
    init(){
      if(!Coupon.get()){
        // available + used + expired
        const all = HS.coupons.map(c => ({...c, status: c.status}));
        Coupon.set(all);
      }
    },
    available(){ return Coupon.get().filter(c => c.status==="available"); },
    used(){ return Coupon.get().filter(c => c.status==="used"); },
    expired(){ return Coupon.get().filter(c => c.status==="expired"); },
    claim(id){
      const arr = Coupon.get();
      const c = arr.find(c => c.id===id);
      if(c && c.status==="expired"){ Toast.show("已过期", "error"); return; }
      if(c && c.status==="used"){ Toast.show("已使用", "error"); return; }
      // mark a new instance of the coupon (toggle)
      const exists = arr.find(c => c.id===id && c.status==="available");
      if(exists){ Toast.show("已领取过", "error"); return; }
      arr.push({...c, status:"available"});
      Coupon.set(arr);
      Toast.show("🎁 领取成功", "success");
      Modal.refresh("couponCenterModal");
    },
    pickBest(total){
      const all = Coupon.available();
      const ok = all.filter(c => total >= c.threshold);
      if(!ok.length) return null;
      return ok.sort((a,b) => (b.amount/total) - (a.amount/total))[0];
    }
  };

  // ========== 评价统计 ==========
  const Review = {
    get(productId){ return HS.reviews[productId] || HS.reviews._default; },
    stats(productId){
      const list = Review.get(productId);
      const total = list.length;
      const avg = total ? list.reduce((s,r) => s+r.rating,0)/total : 5;
      const dist = [5,4,3,2,1].map(s => ({s, n:list.filter(r=>r.rating===s).length}));
      return {total, avg:avg.toFixed(1), dist};
    }
  };

  // ========== Toast ==========
  const Toast = {
    el:null,
    show(msg, type=""){
      if(!Toast.el) Toast.el = $("#toast");
      if(!Toast.el){
        Toast.el = document.createElement("div");
        Toast.el.id = "toast";
        Toast.el.className = "toast";
        document.body.appendChild(Toast.el);
      }
      Toast.el.textContent = msg;
      Toast.el.className = "toast show " + type;
      clearTimeout(Toast._t);
      Toast._t = setTimeout(() => Toast.el.className = "toast " + type, 2000);
    }
  };

  // ========== Modal ==========
  const Modal = {
    open(id){
      let m = document.getElementById(id);
      if(!m){
        // dynamic modal
        m = document.createElement("div");
        m.id = id;
        m.className = "modal-mask";
        document.body.appendChild(m);
      }
      Modal.refresh(id);
      m.classList.add("show");
      document.body.style.overflow = "hidden";
    },
    close(id){
      const m = document.getElementById(id);
      if(m) m.classList.remove("show");
      document.body.style.overflow = "";
    },
    refresh(id){
      if(id==="couponCenterModal") Modal._renderCouponCenter();
      if(id==="compareModal") Modal._renderCompare();
      if(id==="loginModal") Modal._renderLogin();
      if(id==="advisorModal") Modal._renderAdvisor();
    },
    _renderCouponCenter(){
      const c = $("#couponCenterModal");
      if(!c) return;
      Coupon.init();
      const groups = [
        {label:"可使用", data: Coupon.available(), type:"available"},
        {label:"已使用", data: Coupon.used(), type:"used"},
        {label:"已过期", data: Coupon.expired(), type:"expired"},
      ];
      c.innerHTML = `
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-head">
            <div class="modal-title">🎁 优惠券中心</div>
            <div class="modal-close" onclick="HS.Modal.close('couponCenterModal')">×</div>
          </div>
          <div class="modal-body">
            ${groups.map(g => `
              <div style="margin-bottom:20px">
                <h4 style="font-size:14px;color:var(--dark);margin-bottom:10px">${g.label}（${g.data.length}）</h4>
                ${g.data.length===0 ? '<div style="text-align:center;color:var(--gray);padding:20px">暂无</div>' : ''}
                ${g.data.map(c => `
                  <div class="coupon" style="margin-bottom:10px">
                    <div class="coupon-left">
                      <div class="coupon-amount"><small>¥</small>${c.amount}</div>
                      <div class="coupon-condition">满${c.threshold}可用</div>
                    </div>
                    <div class="coupon-right">
                      <div class="coupon-name">${esc(c.name)}</div>
                      <div class="coupon-scope">${esc(c.scope)}</div>
                      <div class="coupon-date">${c.date} 到期</div>
                      ${g.type==="available" ? `<button class="coupon-btn" onclick="HS.Coupon.claim('${c.id}')">立即使用</button>` : ''}
                      ${g.type==="used" ? `<button class="coupon-btn used">已使用</button>` : ''}
                      ${g.type==="expired" ? `<button class="coupon-btn used">已过期</button>` : ''}
                    </div>
                  </div>
                `).join("")}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },
    _renderCompare(){
      const c = $("#compareModal");
      if(!c) return;
      const ids = Compare.get();
      const list = ids.map(id => HS.products.find(p => p.id===id)).filter(Boolean);
      c.innerHTML = `
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-head">
            <div class="modal-title">🔍 商品对比（${list.length}/4）</div>
            <div class="modal-close" onclick="HS.Modal.close('compareModal')">×</div>
          </div>
          <div class="modal-body">
            ${list.length===0 ? '<div style="text-align:center;color:var(--gray);padding:40px">对比栏为空<br>去商品页添加要对比的商品</div>' : ''}
            ${list.length>0 ? `
              <table class="compare-table">
                <thead><tr><th></th>${list.map(p => `<td class="image-cell"><img src="${p.img}"/><br><strong>${esc(p.name)}</strong><br><span style="color:var(--red);font-size:16px">${money(p.price)}</span></td>`).join("")}</tr></thead>
                <tbody>
                  <tr><th>分类</th>${list.map(p => `<td>${p.cat}</td>`).join("")}</tr>
                  <tr><th>规格</th>${list.map(p => `<td>${esc(p.spec)}</td>`).join("")}</tr>
                  <tr><th>评分</th>${list.map(p => `<td><span class="stars">${"★".repeat(Math.round(p.rating))}</span> ${p.rating}</td>`).join("")}</tr>
                  <tr><th>评价数</th>${list.map(p => `<td>${p.reviews} 条</td>`).join("")}</tr>
                  <tr><th>销量</th>${list.map(p => `<td>${p.sales}</td>`).join("")}</tr>
                  <tr><th>库存</th>${list.map(p => `<td>${p.stock}</td>`).join("")}</tr>
                  <tr><th>操作</th>${list.map(p => `<td><button class="btn btn-primary btn-sm" onclick="HS.Cart.add('${p.id}');HS.Modal.refresh('compareModal')">加入购物车</button><br><button class="btn btn-ghost btn-sm" onclick="HS.Compare.toggle('${p.id}');HS.Modal.refresh('compareModal')">移出</button></td>`).join("")}</tr>
                </tbody>
              </table>
              <div style="margin-top:16px;text-align:right">
                <button class="btn btn-primary" onclick="location.href='compare.html'">查看完整对比 →</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    },
    _renderLogin(){
      const c = $("#loginModal");
      if(!c) return;
      c.innerHTML = `
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-head">
            <div class="modal-title">登录 / 注册</div>
            <div class="modal-close" onclick="HS.Modal.close('loginModal')">×</div>
          </div>
          <div class="modal-body">
            <div style="text-align:center;padding:20px 0">
              <div style="font-size:48px;margin-bottom:10px">📱</div>
              <p style="color:var(--gray);margin-bottom:20px">演示版 · 输入任意手机号即可登录</p>
              <input type="tel" id="loginPhone" placeholder="请输入手机号" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-size:15px" />
              <input type="text" id="loginCode" placeholder="验证码：1234" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:6px;margin-bottom:16px;font-size:15px" />
              <button class="btn btn-primary btn-block btn-lg" onclick="HS.User.login()">登录 / 注册</button>
              <p style="font-size:12px;color:var(--gray);margin-top:12px">登录即同意《用户协议》《隐私政策》</p>
            </div>
          </div>
        </div>
      `;
    },
    _renderAdvisor(){
      const c = $("#advisorModal");
      if(!c) return;
      c.innerHTML = `
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-head">
            <div class="modal-title">🩺 在线咨询营养师</div>
            <div class="modal-close" onclick="HS.Modal.close('advisorModal')">×</div>
          </div>
          <div class="modal-body">
            <p style="margin-bottom:14px;color:var(--gray)">选择您需要的营养师，开始 1v1 咨询</p>
            ${HS.advisors.map(a => `
              <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--border);border-radius:8px;margin-bottom:10px">
                <div style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;flex-shrink:0">${a.avatar}</div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:600">${a.name} <span style="font-size:12px;color:var(--gray);font-weight:400">· ${a.title}</span></div>
                  <div style="font-size:12px;color:var(--primary);margin-top:2px">${a.specialty}</div>
                  <div style="font-size:11px;color:var(--gray);margin-top:4px">${a.bio}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="HS.User.startChat('${a.id}')">咨询</button>
              </div>
            `).join("")}
          </div>
          <div class="modal-foot">
            <button class="btn btn-outline" onclick="HS.Modal.close('advisorModal')">关闭</button>
          </div>
        </div>
      `;
    }
  };

  // ========== 用户 ==========
  const User = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.user))}catch(e){return null} },
    set(u){ localStorage.setItem(LS.user, JSON.stringify(u)); },
    login(){
      const phone = ($("#loginPhone")||{}).value;
      if(!phone || phone.length<11){ Toast.show("请输入正确手机号", "error"); return; }
      const u = {id:"U"+phone.slice(-6), name:"用户"+phone.slice(-4), phone, avatar:phone.slice(-1), vip:false, points:1280};
      User.set(u);
      Toast.show("✓ 登录成功", "success");
      Modal.close("loginModal");
      setTimeout(() => location.reload(), 600);
    },
    logout(){ localStorage.removeItem(LS.user); location.href = "index.html"; },
    startChat(advId){
      const a = HS.advisors.find(x => x.id===advId);
      if(!a) return;
      Toast.show(`正在为您接通 ${a.name} 营养师…`, "success");
      setTimeout(() => {
        Modal.open("advisorModal"); // open chat panel
        Toast.show("💬 " + a.name + "：您好，我是 " + a.title + "，请问想咨询什么？", "success");
      }, 800);
    }
  };

  // ========== 搜索 ==========
  function doSearch(){
    const kw = ($("#navSearchInput")||{}).value || "";
    if(!kw.trim()){ location.href = "product.html"; return; }
    // save history
    let recent = JSON.parse(localStorage.getItem(LS.recent)||"[]");
    recent = [kw, ...recent.filter(k => k!==kw)].slice(0, 8);
    localStorage.setItem(LS.recent, JSON.stringify(recent));
    location.href = "product.html?q=" + encodeURIComponent(kw);
  }

  // ========== 商品卡渲染 ==========
  function productCard(p){
    const inFav = Fav.has(p.id);
    const inCmp = Compare.has(p.id);
    return `
      <div class="product" data-id="${p.id}">
        <div class="product-image">
          <a href="detail.html?id=${p.id}"><img src="${p.img}" alt="${esc(p.name)}"/></a>
          <span class="product-badge ${p.tags[0]==='新品'?'green':p.tags[0]==='三高'?'gold':'red'}">${esc(p.tags[0]||"")}</span>
          <div class="product-actions">
            <span class="icon-btn ${inFav?'active':''}" title="收藏" onclick="event.preventDefault();event.stopPropagation();HS.Fav.toggle('${p.id}');this.classList.toggle('active')">❤</span>
            <span class="icon-btn ${inCmp?'active':''}" title="对比" onclick="event.preventDefault();event.stopPropagation();HS.Compare.toggle('${p.id}');this.classList.toggle('active');HS.Modal.open('compareModal')">⇄</span>
          </div>
        </div>
        <div class="product-body">
          <div class="product-cat">${p.cat}</div>
          <a href="detail.html?id=${p.id}" class="product-name">${esc(p.name)}</a>
          <div class="product-rating">
            <span class="stars">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5-Math.round(p.rating))}</span>
            <span>${p.rating}</span>
            <span style="color:var(--gray-light)">· ${p.reviews} 评</span>
          </div>
          <div class="product-tags">${p.tags.slice(0,2).map(t => `<span class="product-tag">${esc(t)}</span>`).join("")}</div>
          <div class="product-price-row">
            <div class="product-price">
              <span class="price-now">${money(p.price)}</span>
              <span class="price-was">${money(p.was)}</span>
            </div>
            <span class="product-sales">已售 ${p.sales}</span>
          </div>
          <button class="btn btn-primary btn-block" style="margin-top:8px" onclick="HS.Cart.add('${p.id}')">加入购物车</button>
        </div>
      </div>
    `;
  }

  // ========== 公共初始化 ==========
  function init(){
    // 注入 nav + footer
    const navEl = $("#navMount");
    if(navEl) navEl.innerHTML = renderTopBar();
    const fEl = $("#footerMount");
    if(fEl) fEl.innerHTML = renderFooter();

    // 搜索框 enter
    const inp = $("#navSearchInput");
    if(inp){
      inp.addEventListener("keydown", e => { if(e.key==="Enter") doSearch(); });
    }

    // 高亮当前 cat
    const params = new URLSearchParams(location.search);
    const curCat = params.get("cat") || "all";
    const navId = "catNav" + ({all:"All", "基础营养":"Basic", "慢病养护":"Care", "肠胃健康":"Gut", "运动营养":"Fit"})[curCat];
    if($("#"+navId)) $("#"+navId).classList.add("active");

    // 购物车 badge
    Cart.updateBadge();

    // 优惠券初始化
    Coupon.init();

    // 聊天初始化
    Chat.init();
    Chat.updateBadge();

    // 财务初始化
    Account.init();

    // 注入聊天悬浮窗(admin 页面不显示)
    const isAdmin = location.pathname.includes("admin");
    if(!isAdmin && !document.getElementById("chatWidget")){
      const mount = document.createElement("div");
      mount.innerHTML = renderChatWidget();
      document.body.appendChild(mount.firstElementChild);
      Chat.updateBadge();
    }

    // 全局 click 关闭 modal
    document.addEventListener("click", e => {
      $$(".modal-mask").forEach(m => {
        if(e.target === m && !m.querySelector(".modal").contains(e.target)){
          Modal.close(m.id);
        }
      });
      // 点击外部关闭聊天面板
      const widget = document.getElementById("chatWidget");
      const panel = document.getElementById("chatPanel");
      if(panel && widget && !widget.contains(e.target)){
        panel.style.display = "none";
      }
    });
  }

  // expose
  HS.Cart = Cart;
  HS.Fav = Fav;
  HS.Compare = Compare;
  HS.Coupon = Coupon;
  HS.Review = Review;
  HS.User = User;
  HS.Modal = Modal;
  HS.Toast = Toast;
  HS.productCard = productCard;
  HS.doSearch = doSearch;
  HS.init = init;
  HS.esc = esc;        // escape HTML helper, available globally
  HS.money = money;    // ¥ formatter
  HS.toggleAdminSidebar = function(forceClose){
    const sb = document.querySelector(".admin-sidebar");
    const ov = document.querySelector(".admin-overlay");
    if(!sb) return;
    const willOpen = forceClose === true ? false : !sb.classList.contains("open");
    sb.classList.toggle("open", willOpen);
    if(ov) ov.style.display = willOpen ? "block" : "none";
  };

  // ========== 聊天系统 ==========
  LS.chat = "hs_chats";
  const Chat = {
    get(){ try{return JSON.parse(localStorage.getItem(LS.chat))||null}catch(e){return null} },
    set(arr){ localStorage.setItem(LS.chat, JSON.stringify(arr)); Chat.updateBadge(); },
    init(){
      if(!Chat.get()){
        const initial = HS.chatThreads.map(t => ({...t, messages: t.messages.slice(), unread: t.unread}));
        Chat.set(initial);
      }
    },
    threads(){ return Chat.get() || []; },
    thread(id){ return (Chat.get() || []).find(t => t.id===id); },
    send(threadId, text){
      const arr = Chat.get() || [];
      const t = arr.find(x => x.id===threadId);
      if(!t) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,"0");
      const mm = String(now.getMinutes()).padStart(2,"0");
      t.messages.push({from:"me", text, time:`${hh}:${mm}`});
      t.lastTime = "刚刚";
      Chat.set(arr);
      // 模拟自动回复
      setTimeout(() => {
        const replies = {
          merchant:["收到~ 帮您查询中 📋","您的问题已记录,稍后详细回复您","已为您转接专员,请稍候~"],
          advisor:["根据您的情况,我建议...","好的,我先看下您之前的记录","可以详细描述下症状吗?"],
          aftersales:["已为您加急处理","我们会尽快联系您","已为您登记,请耐心等待~"]
        };
        const reply = replies[t.type][Math.floor(Math.random()*replies[t.type].length)];
        t.messages.push({from:"them", text: reply, time:`${hh}:${mm}`});
        Chat.set(arr);
      }, 1200);
    },
    markRead(threadId){
      const arr = Chat.get() || [];
      const t = arr.find(x => x.id===threadId);
      if(t){ t.unread = 0; Chat.set(arr); }
    },
    totalUnread(){
      return (Chat.get() || []).reduce((s,t) => s+(t.unread||0), 0);
    },
    updateBadge(){
      const n = Chat.totalUnread();
      $$(".chat-badge").forEach(b => { b.textContent = n; b.style.display = n>0?"":"none"; });
    }
  };

  // ========== 财务账户 ==========
  const Account = {
    get(){ try{return JSON.parse(localStorage.getItem("hs_account"))}catch(e){return null} },
    set(a){ localStorage.setItem("hs_account", JSON.stringify(a)); },
    init(){ if(!Account.get()) Account.set(HS.account); },
    balance(){ return (Account.get()||HS.account).balance; },
    points(){ return (Account.get()||HS.account).points; },
    transactions(){ try{return JSON.parse(localStorage.getItem("hs_transactions"))||HS.transactions}catch(e){return HS.transactions} },
    recharge(amount, bonus=0){
      const a = Account.get() || HS.account;
      a.balance += amount + bonus;
      Account.set(a);
      // 记录
      const tx = Account.transactions();
      tx.unshift({
        id:"TX"+Date.now(),
        date:new Date().toISOString().slice(0,10),
        type:"recharge",
        amount: amount + bonus,
        desc:`储值卡充值${bonus>0?`(+${bonus} 赠送)`:""}`,
        status:"success"
      });
      localStorage.setItem("hs_transactions", JSON.stringify(tx));
    },
    pay(amount, desc){
      const a = Account.get() || HS.account;
      if(a.balance < amount){ Toast.show("余额不足,请先充值", "error"); return false; }
      a.balance -= amount;
      Account.set(a);
      const tx = Account.transactions();
      tx.unshift({
        id:"TX"+Date.now(),
        date:new Date().toISOString().slice(0,10),
        type:"order",
        amount: -amount,
        desc,
        status:"success"
      });
      localStorage.setItem("hs_transactions", JSON.stringify(tx));
      return true;
    }
  };

  // ========== 后台管理 ==========
  const Admin = {
    login(pwd){
      // 演示版:密码 admin888
      if(pwd === "admin888"){
        const a = {isAdmin:true, name:"黄巍", role:"创始人 · 店长", loginTime: Date.now()};
        localStorage.setItem("hs_admin", JSON.stringify(a));
        HS.adminAuth = a;
        return true;
      }
      return false;
    },
    logout(){
      localStorage.removeItem("hs_admin");
      HS.adminAuth = {isAdmin:false, name:"", role:""};
    },
    current(){
      try{return JSON.parse(localStorage.getItem("hs_admin"))}catch(e){return null}
    }
  };

  // ========== 增强的 Review(含图片上传占位/有用投票) ==========
  Review.helpful = (productId, idx) => {
    const key = "hs_review_helpful";
    const voted = JSON.parse(localStorage.getItem(key)||"{}");
    const id = productId + "_" + idx;
    if(voted[id]){ Toast.show("已点过赞"); return; }
    voted[id] = true;
    localStorage.setItem(key, JSON.stringify(voted));
    Toast.show("👍 感谢您的反馈", "success");
  };

  // ========== 全局聊天悬浮窗 ==========
  function renderChatWidget(){
    return `
    <div class="chat-widget" id="chatWidget">
      <div class="chat-bubble" onclick="toggleChatWidget()" title="消息中心">
        💬
        <span class="chat-badge" id="chatWidgetBadge" style="display:none">0</span>
      </div>
      <div class="chat-panel" id="chatPanel" style="display:none">
        <div class="chat-panel-head">
          <div>
            <div style="font-weight:700">💬 消息中心</div>
            <div style="font-size:11px;opacity:0.9;margin-top:2px">营养师 · 1 对 1 在线</div>
          </div>
          <div class="chat-panel-close" onclick="toggleChatWidget()">×</div>
        </div>
        <div class="chat-panel-body" id="chatPanelBody">
          <div style="text-align:center;color:var(--gray);padding:30px 0">暂无消息</div>
        </div>
        <div class="chat-panel-foot">
          <a href="chat.html" class="btn btn-primary btn-sm btn-block">💬 进入消息中心 →</a>
        </div>
      </div>
    </div>`;
  }

  function toggleChatWidget(){
    const panel = document.getElementById("chatPanel");
    if(!panel) return;
    if(panel.style.display === "none"){
      panel.style.display = "flex";
      renderChatPanel();
    } else {
      panel.style.display = "none";
    }
  }

  function renderChatPanel(){
    const body = document.getElementById("chatPanelBody");
    if(!body) return;
    const threads = Chat.threads();
    body.innerHTML = threads.length === 0 ? '<div style="text-align:center;color:var(--gray);padding:30px 0">暂无消息</div>' :
      threads.map(t => `
        <div class="chat-panel-item" onclick="openChatThread('${t.id}')">
          <div class="chat-avatar" style="background:${t.type==='merchant'?'linear-gradient(135deg,var(--primary),var(--primary-light))':t.type==='advisor'?'linear-gradient(135deg,var(--green),#52b788)':'linear-gradient(135deg,var(--accent),#f4a261)'}">${t.avatar}</div>
          <div class="chat-info">
            <div class="chat-name">${esc(t.name)}${t.unread>0?`<span class="chat-unread-dot"></span>`:''}</div>
            <div class="chat-preview">${esc(t.messages[t.messages.length-1].text)}</div>
          </div>
          <div class="chat-time">${esc(t.lastTime)}${t.unread>0?`<span class="chat-unread-num">${t.unread}</span>`:''}</div>
        </div>
      `).join("");
  }

  function openChatThread(id){
    Chat.markRead(id);
    // 切换到全屏 chat.html
    location.href = "chat.html?tid=" + id;
  }

  // expose new modules
  HS.Chat = Chat;
  HS.Account = Account;
  HS.Admin = Admin;
  HS.renderChatWidget = renderChatWidget;
  HS.toggleChatWidget = toggleChatWidget;

  document.addEventListener("DOMContentLoaded", init);
})();
