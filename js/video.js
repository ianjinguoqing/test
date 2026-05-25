(function () {
  'use strict';

  // ===== 英雄视频控制 =====
  const heroVideo = document.getElementById('heroVideo');
  const heroPlayPause = document.getElementById('heroPlayPause');
  const heroMute = document.getElementById('heroMute');
  const iconPlay = heroPlayPause?.querySelector('.icon-play');
  const iconPause = heroPlayPause?.querySelector('.icon-pause');
  const iconVolume = heroMute?.querySelector('.icon-volume');
  const iconMute = heroMute?.querySelector('.icon-mute');

  // 播放/暂停控制
  if (heroPlayPause && heroVideo) {
    // 初始状态：视频自动播放，显示暂停图标
    if (!heroVideo.paused) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }

    heroPlayPause.addEventListener('click', function () {
      if (heroVideo.paused) {
        heroVideo.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
      } else {
        heroVideo.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
      }
    });

    // 监听视频播放状态变化
    heroVideo.addEventListener('play', function () {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    });

    heroVideo.addEventListener('pause', function () {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    });
  }

  // 静音/取消静音控制
  if (heroMute && heroVideo) {
    // 初始状态：视频静音，显示静音图标
    if (heroVideo.muted) {
      iconVolume.style.display = 'none';
      iconMute.style.display = 'block';
    }

    heroMute.addEventListener('click', function () {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        iconVolume.style.display = 'none';
        iconMute.style.display = 'block';
      } else {
        iconVolume.style.display = 'block';
        iconMute.style.display = 'none';
      }
    });
  }

  // ===== 粒子效果 =====
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    createParticles();
  }

  function createParticles() {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 随机起始位置
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';

        // 随机移动距离
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = -Math.random() * 300 - 100;
        particle.style.setProperty('--tx', moveX + 'px');
        particle.style.setProperty('--ty', moveY + 'px');

        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 4;
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';

        heroParticles.appendChild(particle);
      }, i * 100);
    }
  }

  // ===== 视频卡片交互 =====
  const videoCards = document.querySelectorAll('.video-card');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoModalTitle = document.getElementById('videoModalTitle');

  videoCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const videoId = card.getAttribute('data-video-id');
      const title = card.querySelector('.video-card-title').textContent;
      openVideoModal(videoId, title);
    });

    // 添加悬停时的微妙动画
    card.addEventListener('mouseenter', function () {
      const playBtn = card.querySelector('.video-play-btn');
      if (playBtn) {
        playBtn.style.animation = 'none';
        setTimeout(() => {
          playBtn.style.animation = '';
        }, 10);
      }
    });
  });

  function openVideoModal(videoId, title) {
    if (videoModal && videoModalTitle) {
      videoModalTitle.textContent = title;
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // 这里可以加载实际的视频
      console.log('打开视频:', videoId, title);
    }
  }

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // 停止视频播放（如果有实际视频）
      const modalVideo = document.getElementById('modalVideo');
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }
  }

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModalBackdrop) {
    videoModalBackdrop.addEventListener('click', closeVideoModal);
  }

  // ESC 键关闭模态框
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // ===== 滚动视差效果 =====
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    const heroWrapper = document.querySelector('.video-hero-wrapper');

    if (heroWrapper) {
      // 视差效果
      const parallaxSpeed = 0.5;
      heroWrapper.style.transform = 'translateY(' + (scrollY * parallaxSpeed) + 'px)';

      // 渐隐效果
      const opacity = Math.max(0, 1 - scrollY / 600);
      heroWrapper.style.opacity = opacity;
    }
  }

  // ===== 视频卡片入场动画观察器 =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  videoCards.forEach(function (card) {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  // ===== 视频预加载优化 =====
  // 当视频卡片进入视口时，预加载视频元数据
  const videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const video = entry.target.querySelector('video');
        if (video && !video.src) {
          // 这里可以设置实际的视频源
          // video.src = 'path/to/video.mp4';
          // video.load();
        }
        videoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  videoCards.forEach(function (card) {
    videoObserver.observe(card);
  });

  // ===== 性能优化：减少重绘 =====
  // 使用 CSS transform 而不是 top/left 来提高性能
  const playButtons = document.querySelectorAll('.video-play-btn');
  playButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.willChange = 'transform';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.willChange = 'auto';
    });
  });

  // ===== 添加加载完成类 =====
  window.addEventListener('load', function () {
    document.body.classList.add('page-loaded');

    // 确保英雄视频开始播放
    if (heroVideo) {
      heroVideo.play().catch(function (error) {
        console.log('自动播放被阻止:', error);
        // 如果自动播放被阻止，显示播放按钮
        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }
      });
    }
  });

  // ===== 响应式处理 =====
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // 重新计算粒子位置等
      handleResponsiveChanges();
    }, 250);
  });

  function handleResponsiveChanges() {
    // 在移动设备上可以减少粒子数量等优化
    const isMobile = window.innerWidth < 768;
    if (isMobile && heroParticles) {
      const particles = heroParticles.querySelectorAll('.particle');
      particles.forEach(function (particle, index) {
        if (index > 15) {
          particle.style.display = 'none';
        }
      });
    }
  }

  // 初始化响应式检查
  handleResponsiveChanges();

  // ===== 添加平滑滚动到视频网格 =====
  const heroContent = document.querySelector('.video-hero-content');
  if (heroContent) {
    // 可以添加一个向下滚动的提示按钮
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    scrollHint.style.cssText = `
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      animation: bounce 2s ease-in-out infinite;
      z-index: 10;
    `;

    // 添加弹跳动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-10px); }
      }
    `;
    document.head.appendChild(style);

    const heroWrapper = document.querySelector('.video-hero-wrapper');
    if (heroWrapper) {
      heroWrapper.appendChild(scrollHint);

      scrollHint.addEventListener('click', function () {
        const gallery = document.querySelector('.video-gallery');
        if (gallery) {
          gallery.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // ===== 视频加载状态提示 =====
  if (heroVideo) {
    heroVideo.addEventListener('loadstart', function () {
      console.log('视频开始加载');
    });

    heroVideo.addEventListener('canplay', function () {
      console.log('视频可以播放');
    });

    heroVideo.addEventListener('error', function (e) {
      console.error('视频加载错误:', e);
      // 可以显示错误提示
    });
  }

})();
