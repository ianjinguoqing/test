    (function () {
      'use strict';

      // ===== Random Background Image =====
      // ↓↓↓ 在这里添加你的背景图片 URL，刷新页面随机选一张 ↓↓↓
      var BG_POOL = [
        '../images/33.png',
        '../images/IMG_20251107_211233.jpg',
        '../images/IMG_20251107_211242.jpg',
        'https://picsum.photos/1920/1080?random=10',
        'https://picsum.photos/1920/1080?random=11',
        'https://picsum.photos/1920/1080?random=12'
      ];

      if (BG_POOL.length > 0) {
        var picked = BG_POOL[Math.floor(Math.random() * BG_POOL.length)];
        var bgDiv = document.getElementById('bg-image');
        if (bgDiv) {
          bgDiv.style.backgroundImage = 'url("' + picked + '")';
        }
      }

      // ===== Navbar =====
      var navbar = document.getElementById('navbar');
      var navItems = document.querySelectorAll('.nav-item');

      // 滚动时加深背景
      if (navbar) {
        window.addEventListener('scroll', function () {
          navbar.classList.toggle('scrolled', window.scrollY > 20);
        });
      }

      // 点击切换选中态
      navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          navItems.forEach(function (n) { n.classList.remove('active'); });
          item.classList.add('active');
        });
      });

      // ===== Login Window =====
      // 兼容两种导航栏结构：code.html使用.nav-login，about.html和index.html使用.nav-auth
      var loginTrigger = document.querySelector('.nav-login') || document.querySelector('.nav-auth');
      var loginOverlay = document.getElementById('loginOverlay');
      var loginModal = document.getElementById('loginModal');
      var loginCloseBtn = document.getElementById('loginCloseBtn');
      var loginMiniBtn = document.getElementById('loginMiniBtn');
      var loginDragHandle = document.getElementById('loginDragHandle');
      var loginTabs = document.querySelectorAll('.login-tab');
      var loginPanels = document.querySelectorAll('.login-panel');
      var loginToast = document.getElementById('loginToast');
      var loginSubmitBtn = document.getElementById('loginSubmitBtn');
      var quickLoginBtn = document.getElementById('quickLoginBtn');
      var verifyBtn = document.getElementById('verifyBtn');
      var loginAccount = document.getElementById('loginAccount');
      var loginPassword = document.getElementById('loginPassword');
      var loginPhone = document.getElementById('loginPhone');
      var loginCode = document.getElementById('loginCode');
      var rememberMeCheck = document.getElementById('rememberMeCheck');
      var passwordToggleBtn = document.getElementById('passwordToggleBtn');
      var navAuth = document.querySelector('.nav-auth');
      var navLoginText = document.getElementById('navLoginText');
      var navLoginAvatar = document.getElementById('navLoginAvatar');
      var navUserMenu = document.getElementById('navUserMenu');
      var navUserName = document.getElementById('navUserName');
      var navUserSub = document.getElementById('navUserSub');
      var navUserCardAvatar = document.getElementById('navUserCardAvatar');
      var navUserMotto = document.getElementById('navUserMotto');
      var navUserStatusTag = document.getElementById('navUserStatusTag');
      var navUserThemeTag = document.getElementById('navUserThemeTag');
      var navDashboardBtn = document.getElementById('navDashboardBtn');
      var navProfileBtn = document.getElementById('navProfileBtn');
      var navLogoutBtn = document.getElementById('navLogoutBtn');

      var profileOverlay = document.getElementById('profileOverlay');
      var profileModal = document.getElementById('profileModal');
      var profileDragHandle = document.getElementById('profileDragHandle');
      var profileCloseBtn = document.getElementById('profileCloseBtn');
      var profileResetBtn = document.getElementById('profileResetBtn');
      var profileTabs = document.querySelectorAll('.profile-tab');
      var profilePanels = document.querySelectorAll('.profile-panel');
      var profileToast = document.getElementById('profileToast');
      var profileHeroName = document.getElementById('profileHeroName');
      var profileHeroRole = document.getElementById('profileHeroRole');
      var profileHeroBio = document.getElementById('profileHeroBio');
      var profileHeroStatus = document.getElementById('profileHeroStatus');
      var profileHeroAccent = document.getElementById('profileHeroAccent');
      var profileAvatarCore = document.getElementById('profileAvatarCore');
      var profileNameInput = document.getElementById('profileNameInput');
      var profileRoleInput = document.getElementById('profileRoleInput');
      var profileMottoInput = document.getElementById('profileMottoInput');
      var profileBioInput = document.getElementById('profileBioInput');
      var profileMotionRange = document.getElementById('profileMotionRange');
      var profileMotionValue = document.getElementById('profileMotionValue');
      var profileAvatarUpload = document.getElementById('profileAvatarUpload');
      var profileUploadNote = document.getElementById('profileUploadNote');
      var avatarStyleCards = document.querySelectorAll('.avatar-style-card');
      var themeSwatches = document.querySelectorAll('.theme-swatch');
      var profileSaveBasicBtn = document.getElementById('profileSaveBasicBtn');
      var profileSaveAvatarBtn = document.getElementById('profileSaveAvatarBtn');
      var profileSaveThemeBtn = document.getElementById('profileSaveThemeBtn');
      var profilePasswordBtn = document.getElementById('profilePasswordBtn');
      var profileRememberBtn = document.getElementById('profileRememberBtn');
      var profileLogoutBtn = document.getElementById('profileLogoutBtn');

      var avatarCropperOverlay = document.getElementById('avatarCropperOverlay');
      var avatarCropperCanvas = document.getElementById('avatarCropperCanvas');

      var AUTH_STORAGE_KEY = 'codePageMockAuth';
      var authState = null;
      var hoverTimer = null;
      var profileDraft = null;
      var cropperState = null;
      var cropperImage = null;
      var cropperCtx = avatarCropperCanvas ? avatarCropperCanvas.getContext('2d') : null;

      var loginDragState = {
        active: false,
        offsetX: 0,
        offsetY: 0
      };

      var profileDragState = {
        active: false,
        offsetX: 0,
        offsetY: 0
      };

      var cropperDragState = {
        active: false,
        startX: 0,
        startY: 0,
        startOffsetX: 0,
        startOffsetY: 0
      };

      function getDefaultProfile(seed) {
        var isGuest = seed && seed.type === 'Quick Login';
        return {
          name: (seed && seed.name) || 'JinGuoQing',
          type: (seed && seed.type) || 'Password Login',
          roleLabel: isGuest ? '快速体验用户' : 'AI 开发者',
          motto: isGuest ? '体验中，欢迎探索我的空间。' : 'Build softly, shine brightly.',
          bio: isGuest
            ? '这是一位通过快捷登录进入的体验用户，目前可以预览个人资料中心的交互和视觉效果。'
            : '专注于 AI Agent、自动化与工程化实践，喜欢把复杂体验打磨成流畅、优雅又可靠的产品细节。',
          avatarMode: 'gradient',
          themeAccent: 'purple',
          motionLevel: 70,
          avatarImage: '',
          avatarCropScale: 1.2,
          avatarCropX: 0,
          avatarCropY: 0,
          remember: true
        };
      }

      function normalizeAuth(user) {
        if (!user) return null;
        var defaults = getDefaultProfile(user);
        var normalized = Object.assign({}, defaults, user);
        normalized.name = (normalized.name || defaults.name).trim() || defaults.name;
        normalized.roleLabel = (normalized.roleLabel || defaults.roleLabel).trim() || defaults.roleLabel;
        normalized.motto = (normalized.motto || defaults.motto).trim() || defaults.motto;
        normalized.bio = (normalized.bio || defaults.bio).trim() || defaults.bio;
        normalized.type = normalized.type || defaults.type;
        normalized.avatarMode = normalized.avatarMode || defaults.avatarMode;
        normalized.themeAccent = normalized.themeAccent || defaults.themeAccent;
        normalized.motionLevel = Number.isFinite(+normalized.motionLevel) ? Math.max(0, Math.min(100, +normalized.motionLevel)) : defaults.motionLevel;
        normalized.avatarImage = normalized.avatarImage || '';
        normalized.avatarCropScale = Number.isFinite(+normalized.avatarCropScale) ? Math.max(1, Math.min(3, +normalized.avatarCropScale)) : defaults.avatarCropScale;
        normalized.avatarCropX = Number.isFinite(+normalized.avatarCropX) ? +normalized.avatarCropX : defaults.avatarCropX;
        normalized.avatarCropY = Number.isFinite(+normalized.avatarCropY) ? +normalized.avatarCropY : defaults.avatarCropY;
        normalized.remember = typeof normalized.remember === 'boolean' ? normalized.remember : defaults.remember;
        return normalized;
      }

      function isFinePointer() {
        return !!(window.matchMedia && window.matchMedia('(pointer:fine)').matches);
      }

      function isReducedMotion() {
        return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      }

      function syncMotionScale(user) {
        var scale = 0.70;
        if (user && typeof user.motionLevel === 'number') {
          scale = user.motionLevel / 100;
        }
        if (navAuth) {
          navAuth.style.setProperty('--nav-motion-scale', String(scale));
        }
      }

      function resetLoginPosition() {
        if (!loginModal) return;
        loginModal.style.left = '50%';
        loginModal.style.top = '110px';
        loginModal.style.transform = 'translate(-50%, -10px) scale(.94)';
      }

      function resetProfilePosition() {
        if (!profileModal) return;
        profileModal.style.left = '50%';
        profileModal.style.top = window.innerWidth <= 700 ? '74px' : '96px';
        profileModal.style.transform = 'translate(-50%, -10px) scale(.95)';
      }

      function openLogin() {
        if (!loginOverlay || !loginModal) return;
        closeProfileCenter();
        loginOverlay.classList.add('show');
        loginOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(function () {
          if (loginAccount) loginAccount.focus();
        }, 220);
      }

      function closeLogin() {
        if (!loginOverlay) return;
        loginOverlay.classList.remove('show');
        loginOverlay.setAttribute('aria-hidden', 'true');
        if (loginModal) loginModal.classList.remove('dragging');
        if (!(profileOverlay && profileOverlay.classList.contains('show'))) {
          document.body.style.overflow = '';
        }
      }

      function showLoginToast(text) {
        if (!loginToast) return;
        loginToast.textContent = text;
        loginToast.classList.add('show');
        clearTimeout(showLoginToast._timer);
        showLoginToast._timer = setTimeout(function () {
          loginToast.classList.remove('show');
        }, 2200);
      }

      function showProfileToast(text) {
        if (!profileToast) {
          showLoginToast(text);
          return;
        }
        profileToast.textContent = text;
        profileToast.classList.add('show');
        clearTimeout(showProfileToast._timer);
        showProfileToast._timer = setTimeout(function () {
          profileToast.classList.remove('show');
        }, 2200);
      }

      function getInitials(name) {
        var safe = (name || 'JG').trim();
        if (!safe) return 'JG';
        return safe.slice(0, 2).toUpperCase();
      }

      function persistAuth(state, remember) {
        if (!remember) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          return;
        }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
      }

      function readAuth() {
        try {
          var raw = localStorage.getItem(AUTH_STORAGE_KEY);
          return raw ? normalizeAuth(JSON.parse(raw)) : null;
        } catch (err) {
          return null;
        }
      }

      function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str || ''));
        return div.innerHTML;
      }

      function getThemeLabel(accent) {
        if (accent === 'coral') return '珊瑚主题';
        if (accent === 'teal') return '青色主题';
        return '紫色主题';
      }

      function setAvatarContent(el, state, size) {
        if (!el) return;
        el.classList.remove('avatar-soft', 'avatar-neon', 'avatar-mono');
        var mode = state && state.avatarMode ? state.avatarMode : 'gradient';
        if (mode !== 'gradient') {
          el.classList.add('avatar-' + mode);
        }
        if (state && state.avatarImage) {
          el.innerHTML = '<img src="' + state.avatarImage + '" alt="头像预览">';
          return;
        }
        el.textContent = getInitials(state && state.name ? state.name : 'JG');
        if (size === 'small') {
          el.style.fontSize = '.72rem';
        }
      }

      function setNavAvatar(state) {
        if (navLoginAvatar) {
          navLoginAvatar.classList.remove('avatar-soft', 'avatar-neon', 'avatar-mono');
          navLoginAvatar.innerHTML = '';
          navLoginAvatar.textContent = getInitials(state && state.name ? state.name : 'JG');
          if (state && state.avatarImage) {
            navLoginAvatar.innerHTML = '<img src="' + state.avatarImage + '" alt="导航头像">';
          }
        }
        if (navUserCardAvatar) {
          navUserCardAvatar.classList.remove('avatar-soft', 'avatar-neon', 'avatar-mono');
          navUserCardAvatar.innerHTML = '';
          navUserCardAvatar.textContent = getInitials(state && state.name ? state.name : 'JG');
          if (state && state.avatarImage) {
            navUserCardAvatar.innerHTML = '<img src="' + state.avatarImage + '" alt="用户头像">';
          }
        }
      }

      function syncProfileDraftToView() {
        if (!profileDraft) return;
        if (profileHeroName) profileHeroName.textContent = profileDraft.name;
        if (profileHeroRole) profileHeroRole.textContent = profileDraft.roleLabel;
        if (profileHeroBio) profileHeroBio.textContent = profileDraft.bio;
        if (profileHeroStatus) profileHeroStatus.textContent = profileDraft.type;
        if (profileHeroAccent) profileHeroAccent.textContent = getThemeLabel(profileDraft.themeAccent);
        if (profileMotionValue) profileMotionValue.textContent = profileDraft.motionLevel + '%';
        if (profileModal) profileModal.setAttribute('data-accent', profileDraft.themeAccent);
        if (profileAvatarCore) {
          profileAvatarCore.classList.remove('avatar-soft', 'avatar-neon', 'avatar-mono');
          profileAvatarCore.innerHTML = '';
          if (profileDraft.avatarMode !== 'gradient') {
            profileAvatarCore.classList.add('avatar-' + profileDraft.avatarMode);
          }
          if (profileDraft.avatarImage) {
            profileAvatarCore.innerHTML = '<img src="' + profileDraft.avatarImage + '" alt="头像预览">';
          } else {
            profileAvatarCore.textContent = getInitials(profileDraft.name);
          }
        }
        avatarStyleCards.forEach(function (card) {
          card.classList.toggle('active', card.getAttribute('data-avatar-mode') === profileDraft.avatarMode);
        });
        themeSwatches.forEach(function (swatch) {
          swatch.classList.toggle('active', swatch.getAttribute('data-theme-accent') === profileDraft.themeAccent);
        });
      }

      function fillProfileForm() {
        if (!authState) return;
        profileDraft = Object.assign({}, authState);
        if (profileNameInput) profileNameInput.value = profileDraft.name;
        if (profileRoleInput) profileRoleInput.value = profileDraft.roleLabel;
        if (profileMottoInput) profileMottoInput.value = profileDraft.motto;
        if (profileBioInput) profileBioInput.value = profileDraft.bio;
        if (profileMotionRange) profileMotionRange.value = String(profileDraft.motionLevel);
        syncProfileDraftToView();
      }

      function runThemeFlash(accent, sourceEl) {
        if (!profileThemeFlash) return;
        var rect = sourceEl ? sourceEl.getBoundingClientRect() : null;
        var hostRect = profileModal ? profileModal.getBoundingClientRect() : null;
        if (rect && hostRect) {
          var x = ((rect.left + rect.width / 2) - hostRect.left) / hostRect.width * 100;
          var y = ((rect.top + rect.height / 2) - hostRect.top) / hostRect.height * 100;
          profileThemeFlash.style.setProperty('--flash-x', x.toFixed(2) + '%');
          profileThemeFlash.style.setProperty('--flash-y', y.toFixed(2) + '%');
        }
        profileThemeFlash.style.background = 'radial-gradient(circle at var(--flash-x, 50%) var(--flash-y, 50%), ' +
          (accent === 'coral' ? 'rgba(255,107,107,.42)' : accent === 'teal' ? 'rgba(78,205,196,.42)' : 'rgba(124,92,231,.42)') +
          ' 0%, rgba(255,255,255,.10) 16%, rgba(255,255,255,0) 58%)';
        profileThemeFlash.classList.remove('is-active');
        void profileThemeFlash.offsetWidth;
        profileThemeFlash.classList.add('is-active');
        clearTimeout(runThemeFlash._timer);
        runThemeFlash._timer = setTimeout(function () {
          profileThemeFlash.classList.remove('is-active');
        }, 520);
      }

      function renderCropperPreview(dataUrl) {
        if (!avatarCropperPreview) return;
        avatarCropperPreview.innerHTML = dataUrl ? '<img src="' + dataUrl + '" alt="裁剪预览">' : '';
      }

      function createCroppedAvatarDataUrl() {
        if (!cropperImage || !cropperState) return '';
        var output = document.createElement('canvas');
        output.width = 320;
        output.height = 320;
        var ctx = output.getContext('2d');
        var scale = cropperState.scale;
        var drawWidth = cropperImage.width * scale;
        var drawHeight = cropperImage.height * scale;
        var centerX = output.width / 2;
        var centerY = output.height / 2;
        ctx.clearRect(0, 0, output.width, output.height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          cropperImage,
          centerX - drawWidth / 2 + cropperState.offsetX,
          centerY - drawHeight / 2 + cropperState.offsetY,
          drawWidth,
          drawHeight
        );
        ctx.restore();
        return output.toDataURL('image/png', 0.92);
      }

      function drawAvatarCropper() {
        if (!cropperCtx || !avatarCropperCanvas || !cropperImage || !cropperState) return;
        var width = avatarCropperCanvas.width;
        var height = avatarCropperCanvas.height;
        var centerX = width / 2;
        var centerY = height / 2;
        var scale = cropperState.scale;
        var drawWidth = cropperImage.width * scale;
        var drawHeight = cropperImage.height * scale;
        cropperCtx.clearRect(0, 0, width, height);
        cropperCtx.fillStyle = 'rgba(8, 10, 22, .96)';
        cropperCtx.fillRect(0, 0, width, height);
        cropperCtx.drawImage(
          cropperImage,
          centerX - drawWidth / 2 + cropperState.offsetX,
          centerY - drawHeight / 2 + cropperState.offsetY,
          drawWidth,
          drawHeight
        );
        renderCropperPreview(createCroppedAvatarDataUrl());
      }

      function syncCropperScale() {
        if (!cropperState || !avatarCropperScale) return;
        cropperState.scale = Number(avatarCropperScale.value || 1.2);
        drawAvatarCropper();
      }

      function openAvatarCropper(dataUrl) {
        if (!avatarCropperOverlay || !avatarCropperCanvas) return;
        cropperImage = new Image();
        cropperImage.onload = function () {
          var baseScale = Math.max(260 / cropperImage.width, 260 / cropperImage.height, 0.4);
          cropperState = {
            source: dataUrl,
            baseScale: baseScale,
            scale: Math.max(baseScale, profileDraft && profileDraft.avatarCropScale ? profileDraft.avatarCropScale : 1.2),
            offsetX: profileDraft && Number.isFinite(+profileDraft.avatarCropX) ? +profileDraft.avatarCropX : 0,
            offsetY: profileDraft && Number.isFinite(+profileDraft.avatarCropY) ? +profileDraft.avatarCropY : 0
          };
          if (avatarCropperScale) {
            avatarCropperScale.value = String(cropperState.scale);
            avatarCropperScale.min = String(baseScale.toFixed(2));
          }
          avatarCropperOverlay.classList.add('show');
          avatarCropperOverlay.setAttribute('aria-hidden', 'false');
          if (avatarCropperStage) avatarCropperStage.classList.remove('is-dragging');
          document.body.style.overflow = 'hidden';
          drawAvatarCropper();
        };
        cropperImage.src = dataUrl;
      }

      function closeAvatarCropper() {
        if (!avatarCropperOverlay) return;
        avatarCropperOverlay.classList.remove('show');
        avatarCropperOverlay.setAttribute('aria-hidden', 'true');
        cropperDragState.active = false;
        if (avatarCropperStage) avatarCropperStage.classList.remove('is-dragging');
        renderCropperPreview('');
        if (!(profileOverlay && profileOverlay.classList.contains('show')) && !(loginOverlay && loginOverlay.classList.contains('show'))) {
          document.body.style.overflow = '';
        }
      }

      function resetAvatarCropper() {
        if (!cropperImage || !cropperState) return;
        var baseScale = cropperState.baseScale || Math.max(260 / cropperImage.width, 260 / cropperImage.height, 0.4);
        cropperState.scale = Math.max(baseScale, 1.2);
        cropperState.offsetX = 0;
        cropperState.offsetY = 0;
        if (avatarCropperScale) avatarCropperScale.value = String(cropperState.scale);
        drawAvatarCropper();
      }

      function applyAvatarCrop() {
        if (!profileDraft || !cropperState) return;
        var finalUrl = createCroppedAvatarDataUrl();
        if (!finalUrl) return;
        profileDraft.avatarImage = finalUrl;
        profileDraft.avatarCropScale = cropperState.scale;
        profileDraft.avatarCropX = cropperState.offsetX;
        profileDraft.avatarCropY = cropperState.offsetY;
        syncProfileDraftToView();
        closeAvatarCropper();
        if (profileUploadNote) {
          profileUploadNote.textContent = '头像裁剪已更新，记得点击“保存头像样式”完成持久化。';
        }
        showProfileToast('头像裁剪已应用到预览。');
      }

      function primeProfileTiltTargets() {
        document.querySelectorAll('#profileHeroCard, .avatar-style-card, .theme-swatch, .profile-security-card').forEach(function (card) {
          card.setAttribute('data-profile-tilt', 'true');
        });
      }

      function initAvatarCropperGestures() {
        if (!avatarCropperStage || !avatarCropperScale) return;
        avatarCropperScale.addEventListener('input', function () {
          syncCropperScale();
        });

        avatarCropperStage.addEventListener('pointerdown', function (e) {
          if (!cropperState || !cropperImage) return;
          cropperDragState.active = true;
          cropperDragState.startX = e.clientX;
          cropperDragState.startY = e.clientY;
          cropperDragState.startOffsetX = cropperState.offsetX;
          cropperDragState.startOffsetY = cropperState.offsetY;
          avatarCropperStage.classList.add('is-dragging');
          if (avatarCropperStage.setPointerCapture) avatarCropperStage.setPointerCapture(e.pointerId);
          e.preventDefault();
        });

        avatarCropperStage.addEventListener('pointermove', function (e) {
          if (!cropperDragState.active || !cropperState) return;
          cropperState.offsetX = cropperDragState.startOffsetX + (e.clientX - cropperDragState.startX);
          cropperState.offsetY = cropperDragState.startOffsetY + (e.clientY - cropperDragState.startY);
          drawAvatarCropper();
        });

        function stopCropperDrag(e) {
          if (!cropperDragState.active) return;
          cropperDragState.active = false;
          if (avatarCropperStage) avatarCropperStage.classList.remove('is-dragging');
          if (avatarCropperStage && avatarCropperStage.releasePointerCapture && e && typeof e.pointerId !== 'undefined') {
            try { avatarCropperStage.releasePointerCapture(e.pointerId); } catch (err) {}
          }
        }

        avatarCropperStage.addEventListener('pointerup', stopCropperDrag);
        avatarCropperStage.addEventListener('pointercancel', stopCropperDrag);
      }

      function enable3DTilt(selector) {
        if (!isFinePointer() || isReducedMotion()) return;
        document.querySelectorAll(selector).forEach(function (card) {
          if (card.dataset.tiltBound === 'true') return;
          card.dataset.tiltBound = 'true';
          card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - .5;
            var y = (e.clientY - rect.top) / rect.height - .5;
            var motionScale = profileModal ? Number(profileModal.style.getPropertyValue('--motion-scale') || '.70') : .70;
            var rotate = 4 + motionScale * 8;
            card.style.transform = 'perspective(900px) rotateY(' + (x * rotate) + 'deg) rotateX(' + (-y * rotate) + 'deg) translateY(' + (-1 - motionScale * 4) + 'px) scale(' + (1 + motionScale * .03) + ')';
            card.style.setProperty('--sheen-x', ((x + .5) * 100).toFixed(2) + '%');
            card.style.setProperty('--sheen-y', ((y + .5) * 100).toFixed(2) + '%');
            card.classList.add('is-tilting');
          });
          card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.classList.remove('is-tilting');
          });
        });
      }

      function updateAuthUI() {
        var loggedIn = !!authState;
        if (navAuth) {
          navAuth.classList.toggle('logged-in', loggedIn);
          navAuth.classList.toggle('is-guest', !!(authState && authState.type === 'Quick Login'));
          navAuth.setAttribute('data-accent', loggedIn ? authState.themeAccent : 'purple');
          if (!loggedIn) navAuth.classList.remove('menu-open');
        }
        syncMotionScale(loggedIn ? authState : null);
        if (navLoginText) {
          navLoginText.textContent = loggedIn ? authState.name : '登录';
        }
        setNavAvatar(loggedIn ? authState : null);
        if (navUserName) {
          navUserName.textContent = loggedIn ? authState.name : '未登录';
        }
        if (navUserSub) {
          navUserSub.textContent = loggedIn ? authState.roleLabel : '点击登录后可进入控制台';
        }
        if (navUserMotto) {
          navUserMotto.textContent = loggedIn ? authState.motto : '登录后可查看你的个人状态与偏好设置。';
        }
        if (navUserStatusTag) {
          navUserStatusTag.textContent = loggedIn ? authState.type : '未登录';
        }
        if (navUserThemeTag) {
          navUserThemeTag.textContent = loggedIn ? getThemeLabel(authState.themeAccent) : '默认主题';
        }
        if (profileHeroName) {
          profileHeroName.textContent = loggedIn ? authState.name : '未登录';
        }
        if (profileHeroRole) {
          profileHeroRole.textContent = loggedIn ? authState.roleLabel : '演示身份';
        }
        if (profileHeroBio) {
          profileHeroBio.textContent = loggedIn ? authState.bio : '登录后可编辑你的昵称、简介、头像风格与个性化主题。';
        }
        if (profileHeroStatus) {
          profileHeroStatus.textContent = loggedIn ? authState.type : '未登录';
        }
        if (profileHeroAccent) {
          profileHeroAccent.textContent = loggedIn ? getThemeLabel(authState.themeAccent) : '紫色主题';
        }
        if (profileModal) {
          profileModal.setAttribute('data-accent', loggedIn ? authState.themeAccent : 'purple');
        }
        if (profileAvatarCore) {
          if (loggedIn) {
            syncProfileDraftToView();
          } else {
            profileAvatarCore.className = 'profile-avatar-core';
            profileAvatarCore.textContent = 'JG';
          }
        }
      }

      function setButtonLoading(button, loading, textWhenIdle, textWhenLoading) {
        if (!button) return;
        button.classList.toggle('is-loading', loading);
        button.disabled = loading;
        button.textContent = loading ? textWhenLoading : textWhenIdle;
      }

      function openUserMenu() {
        if (navAuth && authState) {
          clearTimeout(hoverTimer);
          navAuth.classList.add('menu-open');
        }
      }

      function closeUserMenu(immediate) {
        if (!navAuth) return;
        clearTimeout(hoverTimer);
        if (immediate) {
          navAuth.classList.remove('menu-open');
          return;
        }
        hoverTimer = setTimeout(function () {
          navAuth.classList.remove('menu-open');
        }, 120);
      }

      function activateProfilePanel(panelId) {
        profileTabs.forEach(function (tab) {
          var active = tab.getAttribute('data-profile-panel') === panelId;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        profilePanels.forEach(function (panel) {
          panel.classList.toggle('active', panel.id === panelId);
        });
      }

      function openProfileCenter(panelId) {
        if (!authState || !profileOverlay || !profileModal) return;
        closeLogin();
        closeUserMenu(true);
        fillProfileForm();
        activateProfilePanel(panelId || 'profileBasicPanel');
        profileOverlay.classList.add('show');
        profileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(function () {
          if (panelId === 'profileAvatarPanel') {
            var firstAvatarCard = document.querySelector('.avatar-style-card.active') || document.querySelector('.avatar-style-card');
            if (firstAvatarCard) firstAvatarCard.focus();
            return;
          }
          if (profileNameInput) profileNameInput.focus();
        }, 220);
      }

      function closeProfileCenter() {
        if (!profileOverlay) return;
        profileOverlay.classList.remove('show');
        profileOverlay.setAttribute('aria-hidden', 'true');
        if (profileModal) profileModal.classList.remove('dragging');
        if (!(loginOverlay && loginOverlay.classList.contains('show')) && !(avatarCropperOverlay && avatarCropperOverlay.classList.contains('show'))) {
          document.body.style.overflow = '';
        }
      }

      function mockPasswordLogin(payload) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if ((payload.account === 'admin' || payload.account === 'jinguoqing') && payload.password === '123456') {
              resolve({
                ok: true,
                user: normalizeAuth({
                  name: payload.account === 'admin' ? 'Admin' : 'JinGuoQing',
                  type: 'Password Login',
                  account: payload.account,
                  remember: !!(rememberMeCheck && rememberMeCheck.checked)
                })
              });
            } else {
              reject(new Error('账号或密码不正确，演示账号：admin / 123456'));
            }
          }, 900);
        });
      }

      function mockQuickLogin(payload) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (/^\d{11}$/.test(payload.phone) && payload.code === '666666') {
              resolve({
                ok: true,
                user: normalizeAuth({
                  name: '访客' + payload.phone.slice(-4),
                  type: 'Quick Login',
                  phone: payload.phone,
                  remember: !!(rememberMeCheck && rememberMeCheck.checked)
                })
              });
            } else {
              reject(new Error('演示快捷登录需输入 11 位手机号，验证码固定为 666666'));
            }
          }, 800);
        });
      }

      function handleLoginSuccess(user, remember) {
        authState = normalizeAuth(Object.assign({}, user, { remember: remember }));
        persistAuth(authState, remember);
        fillProfileForm();
        updateAuthUI();
        closeLogin();
        showLoginToast('欢迎回来，' + authState.name + '。现在可以悬停查看状态，点击进入资料中心。');
      }

      function logoutAuth() {
        authState = null;
        profileDraft = null;
        localStorage.removeItem(AUTH_STORAGE_KEY);
        closeUserMenu(true);
        closeProfileCenter();
        closeAvatarCropper();
        updateAuthUI();
        showLoginToast('已退出登录，演示会话已清除。');
      }

      function saveProfile(partial, successText) {
        if (!authState) return;
        authState = normalizeAuth(Object.assign({}, authState, partial));
        persistAuth(authState, authState.remember !== false);
        fillProfileForm();
        updateAuthUI();
        showProfileToast(successText);
      }

      function attachDrag(handle, modal, state, scaleTransform) {
        if (!handle || !modal) return;
        handle.addEventListener('mousedown', function (e) {
          var actionsSelector = handle === loginDragHandle ? '.login-actions' : '.profile-actions-top';
          if (e.target.closest(actionsSelector)) return;
          state.active = true;
          modal.classList.add('dragging');
          var rect = modal.getBoundingClientRect();
          state.offsetX = e.clientX - rect.left;
          state.offsetY = e.clientY - rect.top;
          modal.style.left = rect.left + 'px';
          modal.style.top = rect.top + 'px';
          modal.style.transform = scaleTransform;
          e.preventDefault();
        });
      }

      document.addEventListener('mousemove', function (e) {
        if (loginDragState.active && loginModal) {
          var loginLeft = e.clientX - loginDragState.offsetX;
          var loginTop = e.clientY - loginDragState.offsetY;
          var loginMaxLeft = window.innerWidth - loginModal.offsetWidth - 12;
          var loginMaxTop = window.innerHeight - loginModal.offsetHeight - 12;
          loginModal.style.left = Math.max(12, Math.min(loginLeft, loginMaxLeft)) + 'px';
          loginModal.style.top = Math.max(12, Math.min(loginTop, loginMaxTop)) + 'px';
        }
        if (profileDragState.active && profileModal) {
          var profileLeft = e.clientX - profileDragState.offsetX;
          var profileTop = e.clientY - profileDragState.offsetY;
          var profileMaxLeft = window.innerWidth - profileModal.offsetWidth - 12;
          var profileMaxTop = window.innerHeight - profileModal.offsetHeight - 12;
          profileModal.style.left = Math.max(12, Math.min(profileLeft, profileMaxLeft)) + 'px';
          profileModal.style.top = Math.max(12, Math.min(profileTop, profileMaxTop)) + 'px';
        }
      });

      document.addEventListener('mouseup', function () {
        if (loginDragState.active) {
          loginDragState.active = false;
          if (loginModal) loginModal.classList.remove('dragging');
        }
        if (profileDragState.active) {
          profileDragState.active = false;
          if (profileModal) profileModal.classList.remove('dragging');
        }
      });

      authState = readAuth();
      if (authState) {
        fillProfileForm();
      }
      updateAuthUI();
      resetLoginPosition();
      resetProfilePosition();
      initAvatarCropperGestures();
      primeProfileTiltTargets();
      enable3DTilt('[data-profile-tilt]');

      if (loginTrigger) {
        loginTrigger.setAttribute('href', 'javascript:void(0)');
        loginTrigger.addEventListener('click', function (e) {
          e.preventDefault();
          navItems.forEach(function (n) { n.classList.remove('active'); });
          loginTrigger.classList.add('active');
          if (!authState) {
            openLogin();
            return;
          }
          openProfileCenter('profileBasicPanel');
        });
      }

      if (navAuth) {
        navAuth.addEventListener('mouseenter', function () {
          if (!authState) return;
          openUserMenu();
        });
        navAuth.addEventListener('mouseleave', function () {
          if (!authState) return;
          closeUserMenu(false);
        });
      }

      if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', function () {
          closeLogin();
        });
      }

      if (loginMiniBtn) {
        loginMiniBtn.addEventListener('click', function () {
          closeLogin();
          showLoginToast('登录窗口已最小化，点击右上角“登录”可再次打开。');
        });
      }

      if (loginOverlay) {
        loginOverlay.addEventListener('click', function (e) {
          if (e.target === loginOverlay) {
            closeLogin();
          }
        });
      }

      if (profileOverlay) {
        profileOverlay.addEventListener('click', function (e) {
          if (e.target === profileOverlay) {
            closeProfileCenter();
          }
        });
      }

      if (avatarCropperOverlay) {
        avatarCropperOverlay.addEventListener('click', function (e) {
          if (e.target === avatarCropperOverlay) {
            closeAvatarCropper();
          }
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          if (avatarCropperOverlay && avatarCropperOverlay.classList.contains('show')) {
            closeAvatarCropper();
            return;
          }
          if (profileOverlay && profileOverlay.classList.contains('show')) {
            closeProfileCenter();
            return;
          }
          if (loginOverlay && loginOverlay.classList.contains('show')) {
            closeLogin();
          }
        }
      });

      loginTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          loginTabs.forEach(function (t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          loginPanels.forEach(function (p) { p.classList.remove('active'); });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          var panel = document.getElementById(tab.getAttribute('data-panel'));
          if (panel) panel.classList.add('active');
        });
      });

      profileTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateProfilePanel(tab.getAttribute('data-profile-panel'));
        });
      });

      attachDrag(loginDragHandle, loginModal, loginDragState, 'translate(0, 0) scale(1)');
      attachDrag(profileDragHandle, profileModal, profileDragState, 'translate(0, 0) scale(1)');

      if (passwordToggleBtn && loginPassword) {
        passwordToggleBtn.addEventListener('click', function () {
          var isPassword = loginPassword.type === 'password';
          loginPassword.type = isPassword ? 'text' : 'password';
          passwordToggleBtn.classList.toggle('active', isPassword);
          passwordToggleBtn.textContent = isPassword ? '🙈' : '👁';
        });
      }

      if (navDashboardBtn) {
        navDashboardBtn.addEventListener('click', function () {
          openProfileCenter('profileBasicPanel');
        });
      }

      if (navProfileBtn) {
        navProfileBtn.addEventListener('click', function () {
          openProfileCenter('profileThemePanel');
        });
      }

      if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', function () {
          logoutAuth();
        });
      }

      if (profileCloseBtn) {
        profileCloseBtn.addEventListener('click', function () {
          closeProfileCenter();
        });
      }

      if (profileResetBtn) {
        profileResetBtn.addEventListener('click', function () {
          if (!authState) return;
          var defaults = getDefaultProfile(authState);
          authState = normalizeAuth(Object.assign({}, authState, defaults, {
            name: authState.name,
            type: authState.type,
            account: authState.account,
            phone: authState.phone,
            remember: authState.remember,
            avatarImage: '',
            avatarCropScale: defaults.avatarCropScale,
            avatarCropX: defaults.avatarCropX,
            avatarCropY: defaults.avatarCropY
          }));
          persistAuth(authState, authState.remember !== false);
          fillProfileForm();
          updateAuthUI();
          if (profileUploadNote) {
            profileUploadNote.textContent = '上传图片后会先进入裁剪器，再生成头像预览。';
          }
          showProfileToast('已恢复默认资料风格。');
        });
      }

      if (profileNameInput) {
        profileNameInput.addEventListener('input', function () {
          if (!profileDraft) return;
          profileDraft.name = profileNameInput.value.trim() || getDefaultProfile(authState).name;
          syncProfileDraftToView();
        });
      }

      if (profileRoleInput) {
        profileRoleInput.addEventListener('input', function () {
          if (!profileDraft) return;
          profileDraft.roleLabel = profileRoleInput.value.trim() || getDefaultProfile(authState).roleLabel;
          syncProfileDraftToView();
        });
      }

      if (profileMottoInput) {
        profileMottoInput.addEventListener('input', function () {
          if (!profileDraft) return;
          profileDraft.motto = profileMottoInput.value.trim() || getDefaultProfile(authState).motto;
          if (navUserMotto) navUserMotto.textContent = profileDraft.motto;
        });
      }

      if (profileBioInput) {
        profileBioInput.addEventListener('input', function () {
          if (!profileDraft) return;
          profileDraft.bio = profileBioInput.value.trim() || getDefaultProfile(authState).bio;
          syncProfileDraftToView();
        });
      }

      if (profileMotionRange) {
        profileMotionRange.addEventListener('input', function () {
          if (!profileDraft) return;
          profileDraft.motionLevel = Number(profileMotionRange.value || 70);
          if (profileMotionValue) profileMotionValue.textContent = profileDraft.motionLevel + '%';
          syncMotionScale(profileDraft);
        });
      }

      avatarStyleCards.forEach(function (card) {
        card.addEventListener('click', function () {
          if (!profileDraft) return;
          profileDraft.avatarMode = card.getAttribute('data-avatar-mode');
          if (!profileDraft.avatarImage) {
            profileDraft.avatarImage = '';
          }
          syncProfileDraftToView();
        });
      });

      themeSwatches.forEach(function (swatch) {
        swatch.addEventListener('click', function () {
          if (!profileDraft) return;
          profileDraft.themeAccent = swatch.getAttribute('data-theme-accent');
          syncProfileDraftToView();
          syncMotionScale(profileDraft);
          runThemeFlash(profileDraft.themeAccent, swatch);
        });
      });

      if (profileAvatarUpload) {
        profileAvatarUpload.addEventListener('change', function () {
          var file = profileAvatarUpload.files && profileAvatarUpload.files[0];
          if (!file || !profileDraft) return;
          if (!file.type || file.type.indexOf('image/') !== 0) {
            showProfileToast('请选择图片文件。');
            return;
          }
          var reader = new FileReader();
          reader.onload = function () {
            openAvatarCropper(reader.result);
            if (profileUploadNote) {
              profileUploadNote.textContent = '请在裁剪器中拖动与缩放图片，确认后再保存头像样式。';
            }
          };
          reader.readAsDataURL(file);
        });
      }

      if (avatarCropperCloseBtn) {
        avatarCropperCloseBtn.addEventListener('click', closeAvatarCropper);
      }
      if (avatarCropperCancelBtn) {
        avatarCropperCancelBtn.addEventListener('click', closeAvatarCropper);
      }
      if (avatarCropperResetBtn) {
        avatarCropperResetBtn.addEventListener('click', resetAvatarCropper);
      }
      if (avatarCropperApplyBtn) {
        avatarCropperApplyBtn.addEventListener('click', applyAvatarCrop);
      }

      if (profileSaveBasicBtn) {
        profileSaveBasicBtn.addEventListener('click', function () {
          if (!profileDraft) return;
          setButtonLoading(profileSaveBasicBtn, true, '保存基础资料', '保存中...');
          setTimeout(function () {
            saveProfile({
              name: profileDraft.name,
              roleLabel: profileDraft.roleLabel,
              motto: profileDraft.motto,
              bio: profileDraft.bio
            }, '基础资料已更新。');
            setButtonLoading(profileSaveBasicBtn, false, '保存基础资料', '保存中...');
          }, 420);
        });
      }

      if (profileSaveAvatarBtn) {
        profileSaveAvatarBtn.addEventListener('click', function () {
          if (!profileDraft) return;
          setButtonLoading(profileSaveAvatarBtn, true, '保存头像样式', '保存中...');
          setTimeout(function () {
            saveProfile({
              avatarMode: profileDraft.avatarMode,
              avatarImage: profileDraft.avatarImage,
              avatarCropScale: profileDraft.avatarCropScale,
              avatarCropX: profileDraft.avatarCropX,
              avatarCropY: profileDraft.avatarCropY
            }, '头像样式已保存。');
            setButtonLoading(profileSaveAvatarBtn, false, '保存头像样式', '保存中...');
          }, 420);
        });
      }

      if (profileSaveThemeBtn) {
        profileSaveThemeBtn.addEventListener('click', function () {
          if (!profileDraft) return;
          setButtonLoading(profileSaveThemeBtn, true, '保存外观设置', '保存中...');
          setTimeout(function () {
            saveProfile({
              themeAccent: profileDraft.themeAccent,
              motionLevel: profileDraft.motionLevel
            }, '主题外观已更新。');
            setButtonLoading(profileSaveThemeBtn, false, '保存外观设置', '保存中...');
          }, 420);
        });
      }

      if (profilePasswordBtn) {
        profilePasswordBtn.addEventListener('click', function () {
          showProfileToast('演示模式：这里后续可接入真实的修改密码流程。');
        });
      }

      if (profileRememberBtn) {
        profileRememberBtn.addEventListener('click', function () {
          var rememberText = authState && authState.remember !== false ? '当前会话已记住，下次刷新仍会保持登录态。' : '当前会话未持久保存，刷新后不会保留。';
          showProfileToast(rememberText);
        });
      }

      if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', function () {
          logoutAuth();
        });
      }

      if (verifyBtn) {
        verifyBtn.addEventListener('click', function () {
          setButtonLoading(verifyBtn, true, '获取验证码', '发送中...');
          showLoginToast('演示验证码已发送：验证码固定为 666666，后续可在这里接入短信或邮箱服务。');
          setTimeout(function () {
            setButtonLoading(verifyBtn, false, '获取验证码', '发送中...');
          }, 1800);
        });
      }

      if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function () {
          if (!loginAccount.value.trim() || !loginPassword.value.trim()) {
            showLoginToast('请先输入账号和密码。');
            return;
          }

          setButtonLoading(loginSubmitBtn, true, '进入控制台', '登录中...');
          mockPasswordLogin({
            account: loginAccount.value.trim().toLowerCase(),
            password: loginPassword.value.trim()
          }).then(function (result) {
            handleLoginSuccess(result.user, !!(rememberMeCheck && rememberMeCheck.checked));
          }).catch(function (err) {
            showLoginToast(err.message || '登录失败');
          }).finally(function () {
            setButtonLoading(loginSubmitBtn, false, '进入控制台', '登录中...');
          });
        });
      }

      if (quickLoginBtn) {
        quickLoginBtn.addEventListener('click', function () {
          if (!loginPhone.value.trim() || !loginCode.value.trim()) {
            showLoginToast('请先输入手机号和验证码。');
            return;
          }

          setButtonLoading(quickLoginBtn, true, '快捷进入', '验证中...');
          mockQuickLogin({
            phone: loginPhone.value.trim(),
            code: loginCode.value.trim()
          }).then(function (result) {
            handleLoginSuccess(result.user, !!(rememberMeCheck && rememberMeCheck.checked));
          }).catch(function (err) {
            showLoginToast(err.message || '快捷登录失败');
          }).finally(function () {
            setButtonLoading(quickLoginBtn, false, '快捷进入', '验证中...');
          });
        });
      }

      var glow = document.getElementById('mouseGlow');
      if (glow) {
        var glowTimer;
        document.addEventListener('mousemove', function (e) {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
          glow.style.opacity = '1';
          clearTimeout(glowTimer);
          glowTimer = setTimeout(function () { glow.style.opacity = '0' }, 1200);
        });
      }

      // ===== Scroll Reveal (Intersection Observer) =====
      var reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

      // 页面加载时初始可见的直接显示（已进入视口）
      setTimeout(function() {
        reveals.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
          }
          observer.observe(el);
        });
      }, 100);

      // ===== Typing Effect =====
      var phrases = [
        'AI 开发者 · 终身学习者',
        'Python 爱好者 · 自动化实践者',
        '写代码 · 也写文章',
        'Building the future, one line at a time'
      ];
      var phraseIdx = 0;
      var charIdx = 0;
      var isDeleting = false;
      var typeEl = document.getElementById('typingText');

      if (typeEl) {
        var typeSpeed = 80;

        function tick() {
          var current = phrases[phraseIdx];
          if (isDeleting) {
            typeEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 35;
          } else {
            typeEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 80 + Math.random() * 40;
          }

          if (!isDeleting && charIdx === current.length) {
            // 打完停顿后删除
            typeSpeed = 1800;
            isDeleting = true;
          } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
          }

          setTimeout(tick, typeSpeed);
        }
        setTimeout(tick, 600);
      }

      // ===== Number Counting Animation =====
      var countEls = document.querySelectorAll('[data-count]');
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1800;
          var startTime = null;
          var startVal = 0;

          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            // ease-out
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(startVal + (target - startVal) * eased) + (target >= 100 ? '+' : '');
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = target + (target >= 100 ? '+' : '');
            }
          }
          requestAnimationFrame(step);
          countObserver.unobserve(el);
        });
      }, { threshold: .5 });
      countEls.forEach(function (el) { countObserver.observe(el) });

      // ===== Card Tilt Effect =====
      var tiltCards = document.querySelectorAll('[data-tilt]');
      tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - .5;
          var y = (e.clientY - rect.top) / rect.height - .5;
          card.style.transform = 'perspective(600px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
        });
      });

      // ===== Button Ripple =====
      document.querySelectorAll('.btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          var ripple = document.createElement('span');
          ripple.className = 'btn-ripple';
          var rect = btn.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
          ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
          btn.appendChild(ripple);
          ripple.addEventListener('animationend', function () { ripple.remove() });
        });
      });

      // ===== Particle Canvas (subtle) =====
      var canvas = document.getElementById('particle-canvas');
      if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var W, H;

        function resize() {
          W = canvas.width = window.innerWidth;
          H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (var i = 0; i < 45; i++) {
          particles.push({
            x: Math.random() * W, y: Math.random() * H,
            r: .4 + Math.random() * 1.6,
            vx: (Math.random() - .5) * .3,
            vy: -.15 - Math.random() * .35,
            a: .15 + Math.random() * .35
          });
        }

        function drawParticles() {
          ctx.clearRect(0, 0, W, H);
          for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;

            var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            g.addColorStop(0, 'rgba(200,210,255,' + p.a + ')');
            g.addColorStop(.5, 'rgba(200,210,255,' + (p.a * .3) + ')');
            g.addColorStop(1, 'rgba(200,210,255,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(220,225,255,' + (p.a + .1) + ')';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * .45, 0, Math.PI * 2); ctx.fill();
          }
          requestAnimationFrame(drawParticles);
        }
        drawParticles();
      }

      // ===== Glass Cards hover lift =====
      document.querySelectorAll('.glass').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.transform = 'translateY(-3px)';
          card.style.boxShadow = '0 12px 44px rgba(0,0,0,.35)';
          card.style.transition = 'all .35s cubic-bezier(.4,0,.2,1)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 8px 40px rgba(0,0,0,.25)';
        });
      });

    })();

