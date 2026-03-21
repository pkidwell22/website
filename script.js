// Margot — Mountain Meadow Systems
// Smooth scroll + navbar shadow. Nothing else.

(function () {
  'use strict';

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    });
  });

  // Theme toggle (dark/light)
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    var iconMoon = themeToggle.querySelector('.icon-moon');
    var iconSun = themeToggle.querySelector('.icon-sun');

    function applyTheme(light) {
      document.documentElement.classList.toggle('light', light);
      iconMoon.style.display = light ? 'none' : '';
      iconSun.style.display = light ? '' : 'none';
    }

    // Restore saved preference
    var saved = localStorage.getItem('theme');
    if (saved === 'light') applyTheme(true);

    themeToggle.addEventListener('click', function () {
      var isLight = document.documentElement.classList.toggle('light');
      iconMoon.style.display = isLight ? 'none' : '';
      iconSun.style.display = isLight ? '' : 'none';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Navbar shadow on scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 1px 3px 0 rgb(0 0 0 / 0.08)'
        : 'none';
    });
  }
  // ---- Custom Video Player ----
  var player = document.getElementById('videoPlayer');
  if (player) {
    var video = player.querySelector('video');
    var overlay = player.querySelector('.vp-overlay');
    var controls = player.querySelector('.vp-controls');
    var playPause = player.querySelector('.vp-play-pause');
    var iconPlay = player.querySelector('.vp-icon-play');
    var iconPause = player.querySelector('.vp-icon-pause');
    var timeDisplay = player.querySelector('.vp-time');
    var progress = player.querySelector('.vp-progress');
    var progressFilled = player.querySelector('.vp-progress-filled');
    var volumeBtn = player.querySelector('.vp-volume-btn');
    var iconVol = player.querySelector('.vp-icon-vol');
    var iconMute = player.querySelector('.vp-icon-mute');
    var fullscreenBtn = player.querySelector('.vp-fullscreen');

    function formatTime(s) {
      var m = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function updatePlayState() {
      var paused = video.paused;
      iconPlay.style.display = paused ? '' : 'none';
      iconPause.style.display = paused ? 'none' : '';
      overlay.classList.toggle('hidden', !paused);
      player.classList.toggle('vp-paused', paused);
    }

    function togglePlay() {
      if (video.paused) { video.play(); } else { video.pause(); }
    }

    overlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    playPause.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);

    video.addEventListener('timeupdate', function () {
      var pct = (video.currentTime / video.duration) * 100 || 0;
      progressFilled.style.width = pct + '%';
      timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration || 0);
    });

    video.addEventListener('ended', function () {
      updatePlayState();
    });

    progress.addEventListener('click', function (e) {
      e.stopPropagation();
      var rect = progress.getBoundingClientRect();
      var pct = (e.clientX - rect.left) / rect.width;
      video.currentTime = pct * video.duration;
    });

    volumeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      video.muted = !video.muted;
      iconVol.style.display = video.muted ? 'none' : '';
      iconMute.style.display = video.muted ? '' : 'none';
    });

    fullscreenBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      }
    });

    // Show controls in fullscreen on mouse move
    var hideTimer;
    player.addEventListener('mousemove', function () {
      if (document.fullscreenElement) {
        controls.style.opacity = '1';
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
          if (!video.paused) controls.style.opacity = '';
        }, 2500);
      }
    });

    // Initial state
    player.classList.add('vp-paused');
  }
})();
