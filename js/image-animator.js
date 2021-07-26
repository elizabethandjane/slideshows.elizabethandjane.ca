/**
 * @file A class that defines the slideshow animation & autoplaying capabilities.
 */
(function () {
  "use strict";

  class ImageAnimator {
    constructor(imgs, ctx) {
      this.images = [...imgs];
      this.context = ctx;
      this.totalImages = imgs.length;
      this.isPlaying = false;
      this.currentSlideIndex = 0;
      this.slideDisplayLength = 6000;
      this.animationInterval = false;
    }

    transition() {
      const currentSlide = $(".slide-current", this.context);
      const next =
        this.currentSlideIndex + 1 == this.totalImages ? 0 : this.currentSlideIndex + 1;
      const nextnext = next + 1 == this.totalImages ? 0 : next + 1;
      const nextSlide = this.images[next];

      this.currentSlideIndex = next;
      this.images[nextnext].classList.add("slide-next");

      currentSlide.classList.add("slide-leaving");
      currentSlide.classList.remove("slide-next", "slide-current");
      nextSlide.classList.add("slide-current");
      nextSlide.classList.remove("slide-next");

      nextSlide.addEventListener(
        "transitionend",
        () => {
          $(".slide-leaving").classList.remove(
            "slide-leaving",
            "slide-current",
            "slide-next",
          );
        },
        { once: true },
      );
    }

    play() {
      this.isPlaying = true;
      this.animationInterval = setInterval(
        this.transition.bind(this),
        this.slideDisplayLength,
      );
    }

    pause() {
      this.isPlaying = false;
      clearInterval(this.animationInterval);
    }
  }

  window.ImageAnimator = ImageAnimator;
})();
