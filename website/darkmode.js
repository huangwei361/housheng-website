// 暗色模式切换 — 自动添加按钮 + 处理持久化
(function(){
  const KEY = 'hs_theme';
  const saved = localStorage.getItem(KEY);
  if(saved) document.documentElement.setAttribute('data-theme', saved);

  function btn(){
    const b = document.createElement('button');
    b.className = 'theme-toggle';
    b.title = '切换主题';
    b.setAttribute('aria-label', '切换主题');
    b.textContent = saved === 'dark' ? '☀️' : '🌙';
    b.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? '' : 'dark';
      if(next) document.documentElement.setAttribute('data-theme', next);
      else document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(KEY, next);
      b.textContent = next === 'dark' ? '☀️' : '🌙';
    });
    return b;
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn()));
  } else {
    document.body.appendChild(btn());
  }
})();
