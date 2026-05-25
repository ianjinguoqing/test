/**
 * 背景配置 — 按需修改以下参数即可
 *
 * image         : 背景图片 URL，留空 '' 则仅使用粒子动画
 *                 示例: 'https://images.unsplash.com/...'  或  './images/bg.jpg'
 * imageOpacity  : 背景图片显示强度 (0~1)，建议 0.15~0.35
 * overlayColor  : 覆盖层颜色，深色主题用暗色保证文字可读
 * particles     : 是否开启动态粒子
 * particleCount : 粒子数量，建议 40~80
 */
var BG_CONFIG = {
  image: '../images/IMG_20251107_211212.jpg',
  imageOpacity: 0.22,
  overlayColor: 'rgba(10, 12, 30, 0.50)',
  particles: true,
  particleCount: 55,
  particleMinR: 1.5,
  particleMaxR: 5,
  driftSpeed: 0.3,
  connectDist: 140,
  particleColor: '180, 190, 240',   // RGB — 淡蓝紫光点
  lineAlpha: 0.08,
};

(function () {
  'use strict';

  // ========== 背景图片层 ==========
  var bgImage = null;
  if (BG_CONFIG.image) {
    bgImage = document.createElement('div');
    bgImage.id = 'bg-image';
    bgImage.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;' +
      'background-image:url("' + BG_CONFIG.image + '");' +
      'background-size:cover;background-position:center;background-repeat:no-repeat;' +
      'opacity:' + BG_CONFIG.imageOpacity + ';';
    document.body.insertBefore(bgImage, document.body.firstChild);

    // 暗色覆盖层：保证浅色图片上文字可读
    var overlay = document.createElement('div');
    overlay.id = 'bg-overlay';
    overlay.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;' +
      'background:' + BG_CONFIG.overlayColor + ';pointer-events:none;';
    document.body.insertBefore(overlay, document.body.firstChild);
  }

  // ========== 粒子画布 ==========
  if (!BG_CONFIG.particles) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var w, h;
  var animId;
  var mouseX = -999;
  var mouseY = -999;

  // ----- 粒子类 -----
  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (randomY) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : h + 20;
    this.r = BG_CONFIG.particleMinR + Math.random() * (BG_CONFIG.particleMaxR - BG_CONFIG.particleMinR);
    this.baseSpeed = 0.15 + Math.random() * BG_CONFIG.driftSpeed;
    this.wobbleAmp = 0.25 + Math.random() * 0.5;
    this.wobbleFreq = 0.004 + Math.random() * 0.012;
    this.wobblePhase = Math.random() * Math.PI * 2;
    this.opacity = 0.15 + Math.random() * 0.4;
    this.frame = Math.floor(Math.random() * 600);
  };

  Particle.prototype.update = function () {
    this.frame++;

    // 鼠标轻微排斥
    var dx = this.x - mouseX;
    var dy = this.y - mouseY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && dist > 0) {
      var force = (150 - dist) / 150 * 1.0;
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }

    // 缓慢上浮 + 水平正弦摆动
    this.y -= this.baseSpeed;
    this.x += Math.sin(this.frame * this.wobbleFreq + this.wobblePhase) * this.wobbleAmp;

    // 边界环绕
    if (this.y < -20) { this.y = h + 20; this.x = Math.random() * w; }
    if (this.x < -20) this.x = w + 20;
    if (this.x > w + 20) this.x = -20;
  };

  Particle.prototype.draw = function () {
    var alpha = this.opacity;
    var x = this.x;
    var y = this.y;
    var r = this.r;

    // 发光光晕
    var glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
    glow.addColorStop(0, 'rgba(' + BG_CONFIG.particleColor + ',' + alpha + ')');
    glow.addColorStop(0.3, 'rgba(' + BG_CONFIG.particleColor + ',' + (alpha * 0.45) + ')');
    glow.addColorStop(1, 'rgba(' + BG_CONFIG.particleColor + ',0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
    ctx.fill();

    // 实心核心
    ctx.fillStyle = 'rgba(' + BG_CONFIG.particleColor + ',' + (alpha + 0.2) + ')';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  };

  // ----- 初始化粒子 -----
  function initParticles() {
    particles = [];
    for (var i = 0; i < BG_CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // ----- 绘制连接线 -----
  function drawConnections() {
    var maxDist = BG_CONFIG.connectDist;
    var lineAlpha = BG_CONFIG.lineAlpha;

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          var alpha = lineAlpha * (1 - dist / maxDist);
          ctx.strokeStyle = 'rgba(' + BG_CONFIG.particleColor + ',' + alpha + ')';
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // ----- 动画循环 -----
  function animate() {
    ctx.clearRect(0, 0, w, h);

    drawConnections();

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animId = requestAnimationFrame(animate);
  }

  // ----- 尺寸调整 -----
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  // ----- 鼠标跟踪 -----
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // ----- 启动 -----
  function start() {
    resize();
    initParticles();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
