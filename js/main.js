(function () {
  'use strict';

  // ===== Page Detection =====
  const path = window.location.pathname;
  const isHome = path.endsWith('index.html') || path === '/' || path.endsWith('/');
  const isArticle = path.includes('article.html');
  const isAbout = path.includes('about.html');
  const isCode = path.includes('code.html');
  const isVideo = path.includes('video.html');
  const AUTH_STORAGE_KEY = 'codePageMockAuth';

  // ===== Header Scroll Effect =====
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ===== Active Nav =====
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (isHome && href === 'index.html') link.classList.add('active');
    if (isAbout && href === 'about.html') link.classList.add('active');
    if (isCode && href === 'code.html') link.classList.add('active');
    if (isVideo && href === 'video.html') link.classList.add('active');
  });

  syncNavAuth();

  // ===== Home: Render Article List =====
  if (isHome) {
    renderArticleList();
  }

  // ===== Article Detail Page =====
  if (isArticle) {
    renderArticleDetail();
  }

  // ===== Functions =====

  function syncNavAuth() {
    const navAuthLink = document.getElementById('navAuthLink');
    const navLoginText = document.getElementById('navLoginText');
    const navLoginAvatar = document.getElementById('navLoginAvatar');
    if (!navAuthLink && !navLoginText && !navLoginAvatar) return;

    const authState = readAuth();
    const loggedIn = !!authState;
    const name = loggedIn ? authState.name : '登录';
    const initials = loggedIn ? getInitials(authState.name) : 'JG';

    if (navAuthLink) {
      navAuthLink.setAttribute('href', 'code.html');
      navAuthLink.setAttribute('title', loggedIn ? (name + '，前往主页面') : '前往主页面登录');
    }

    if (navLoginText) {
      navLoginText.textContent = name;
    }

    if (navLoginAvatar) {
      navLoginAvatar.textContent = initials;
    }
  }

  function readAuth() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function getInitials(name) {
    const safe = (name || 'JG').trim();
    if (!safe) return 'JG';
    return safe.slice(0, 2).toUpperCase();
  }

  function renderArticleList() {
    var list = document.getElementById('article-list');
    if (!list) return;

    if (!ARTICLES || ARTICLES.length === 0) {
      list.innerHTML = '<p class="empty-state">暂无文章，稍后再来。</p>';
      return;
    }

    var sorted = ARTICLES.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    var html = '';
    sorted.forEach(function (article) {
      var tagsHtml = article.tags.map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + '</span>';
      }).join('');

      html +=
        '<a class="article-card" href="article.html?id=' + article.id + '">' +
          '<h2 class="card-title">' + escapeHtml(article.title) + '</h2>' +
          '<div class="card-meta">' + formatDate(article.date) + '</div>' +
          '<p class="card-summary">' + escapeHtml(article.summary) + '</p>' +
          '<div class="card-tags">' + tagsHtml + '</div>' +
        '</a>';
    });

    list.innerHTML = html;
  }

  function renderArticleDetail() {
    var container = document.getElementById('article-content');
    if (!container) return;

    var id = parseInt(getUrlParam('id'), 10);
    if (!id) {
      container.innerHTML = '<p class="empty-state">文章不存在。</p>';
      return;
    }

    var article = ARTICLES.find(function (a) { return a.id === id; });
    if (!article) {
      container.innerHTML = '<p class="empty-state">文章不存在。</p>';
      document.title = '文章不存在 - 我的博客';
      return;
    }

    document.title = article.title + ' - 我的博客';

    var tagsHtml = article.tags.map(function (t) {
      return '<span class="tag">' + escapeHtml(t) + '</span>';
    }).join('');

    var html =
      '<div class="article-header">' +
        '<h1 class="article-title">' + escapeHtml(article.title) + '</h1>' +
        '<div class="article-meta">' +
          '<span>' + formatDate(article.date) + '</span>' +
          tagsHtml +
        '</div>' +
      '</div>' +
      '<div class="article-body">' + article.content + '</div>';

    container.innerHTML = html;
  }

  // ===== Utilities =====

  function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return year + '年' + month + '月' + day + '日';
  }

})();
