/**
 * @file Allows user access and functionality to the slideshow controls.
 */
(function () {
  "use strict";

  // eslint-disable-next-line no-unused-vars
  let slideshow;
  let infoFadeTimeout;
  let audioFadeTimeout;

  const ui = {
    bigPlay: $id("big-play"),
    playPause: $id("play-pause"),
    mute: $id("mute"),
    fullscreen: $id("fullscreen"),
    info: $id("info"),
    slides: $id("slides"),
    audio: $id("music"),
  };

  const uiIcons = {
    slideshowPlay: $id("icon-slideshow-play"),
    slideshowPause: $id("icon-slideshow-pause"),
    musicPlay: $id("icon-music-play"),
    musicMute: $id("icon-music-mute"),
    fullscreenStart: $id("icon-fullscreen-start"),
    fullscreenExit: $id("icon-fullscreen-exit"),
  };

  const hide = (elem) => {
    elem.hidden = true;
    elem.setAttribute("aria-hidden", true);
  };

  const show = (elem) => {
    elem.hidden = false;
    elem.removeAttribute("aria-hidden");
  };

  const showSlideshowPause = () => {
    hide(uiIcons.slideshowPlay);
    show(uiIcons.slideshowPause);
  };

  const showSlideshowPlay = () => {
    show(uiIcons.slideshowPlay);
    hide(uiIcons.slideshowPause);
  };

  const showMusicMute = () => {
    hide(uiIcons.musicPlay);
    show(uiIcons.musicMute);
  };

  const showMusicPlay = () => {
    show(uiIcons.musicPlay);
    hide(uiIcons.musicMute);
  };

  const showFullscreenExit = () => {
    hide(uiIcons.fullscreenStart);
    show(uiIcons.fullscreenExit);
  };

  const showFullscreenStart = () => {
    show(uiIcons.fullscreenStart);
    hide(uiIcons.fullscreenExit);
  };

  const fadeMusicOut = () => {
    audioFadeTimeout = setTimeout(() => {
      clearTimeout(audioFadeTimeout);
      if (ui.audio.volume > 0.1) {
        ui.audio.volume -= 0.1;
        fadeMusicOut();
      } else {
        ui.audio.pause();
      }
    }, 50);
  };

  const fadeMusicIn = () => {
    ui.audio.play();
    audioFadeTimeout = setTimeout(() => {
      clearTimeout(audioFadeTimeout);
      if (ui.audio.volume < 0.9) {
        ui.audio.volume += 0.1;
        fadeMusicIn();
      }
    }, 50);
  };

  const handlePlayPause = () => {
    if (slideshow.isPlaying) {
      slideshow.pause();
      fadeMusicOut();
      showSlideshowPlay();
    } else {
      slideshow.play();
      fadeMusicIn();
      ui.bigPlay.classList.add("big-play-hide");
      showSlideshowPause();
    }
  };

  const handleMute = () => {
    if (ui.audio.paused) {
      fadeMusicIn();
      showMusicPlay();
    } else {
      fadeMusicOut();
      showMusicMute();
    }
  };

  const handleFullscreenBtn = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        document.exitFullscreen();
      } catch {
        // Code don’t care
      }
      try {
        document.webkitExitFullscreen();
      } catch {
        // Code don’t care
      }
      showFullscreenStart();
    } else {
      try {
        document.body.requestFullscreen();
      } catch {
        // Code don’t care
      }
      try {
        document.body.webkitRequestFullscreen();
      } catch {
        // Code don’t care
      }
      showFullscreenExit();
    }
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      showFullscreenExit();
    } else {
      showFullscreenStart();
    }
  };

  const hideInfo = () => {
    ui.info.classList.add("info-hidden");
    ui.info.setAttribute("aria-hidden", true);
  };

  const showInfo = () => {
    ui.info.classList.remove("info-hidden");
    ui.info.removeAttribute("aria-hidden");
  };

  const handleToolbar = () => {
    clearTimeout(infoFadeTimeout);
    showInfo();
    infoFadeTimeout = setTimeout(() => {
      clearTimeout(infoFadeTimeout);
      hideInfo();
    }, 3000);
  };

  const init = () => {
    slideshow = new ImageAnimator($$(".slides img"), $id("slides"));
    ui.bigPlay.addEventListener("click", handlePlayPause);
    ui.playPause.addEventListener("click", handlePlayPause);
    ui.mute.addEventListener("click", handleMute);
    ui.fullscreen.addEventListener("click", handleFullscreenBtn);
    document.addEventListener("fullscreenchange", handleFullscreen);
    document.addEventListener("webkitfullscreenchange", handleFullscreen);
    document.addEventListener("mousemove", handleToolbar);
  };

  const initShortcutKeys = () => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ": // Space
          handlePlayPause();
          break;
        case "f":
          handleFullscreenBtn();
          break;
        case "m":
          handleMute();
          break;
        default:
          break;
      }
    });
  };

  init();
  initShortcutKeys();
})();
