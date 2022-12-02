import { Swiper, Pagination, Navigation } from 'swiper'
import PhotoSwipe from 'photoswipe'
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

class PhotoSlider {
  constructor ($element) {
    this.paginationAttr = 'data-photo-slider-pagination'
    this.container = 'data-photo-slider-container'
    this.prevAttr = 'data-photo-slider-prev'
    this.nextAttr = 'data-photo-slider-next'
    this.zoomImageAttr = 'data-zoom-image'

    this.$element = $element
    this._init()
  }

  _init () {
    this.$pagination = this.$element.querySelector(`[${this.paginationAttr}]`)
    this.$container = this.$element.querySelector(`[${this.container}]`)
    this.$prev = this.$element.querySelector(`[${this.prevAttr}]`)
    this.$next = this.$element.querySelector(`[${this.nextAttr}]`)

    Swiper.use([Pagination, Navigation])

    this.slider = new Swiper(this.$container, {

      loop: false,

      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,

      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 40
        },
        1260: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 45
        }
      },

      pagination: {
        el: this.$pagination,
        clickable: true
      },

      navigation: {
        nextEl: this.$next,
        prevEl: this.$prev
      }
    })

    this.$images = this.$element.querySelectorAll(`[${this.zoomImageAttr}]`)

    Array.from(this.$images).forEach(($image, index) => {
      $image.addEventListener('click', () => {
        this.openPhotoSwiper(index)
      })
    })
  }

  openPhotoSwiper (index) {
    const pswpElement = document.querySelectorAll('.pswp')[0]

    this.images = this.$element.querySelectorAll(`[${this.zoomImageAttr}]`)

    const items = Array.from(this.images).map($image => {
      return {
        src: $image.getAttribute(this.zoomImageAttr),
        w: 0,
        h: 0
      }
    })

    const options = {
      index: index,
      captionEl: false,
      fullscreenEl: false,
      zoomEl: false,
      shareEl: false,
      counterEl: false,
      history: false,
      loop: true
    }

    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(pswpElement, photoSwipeUIDefault, items, options)
    gallery.listen('gettingData', function (index, item) {
      if (item.w < 1 || item.h < 1) { // unknown size
        const img = new Image()
        img.onload = function () { // will get size after load
          item.w = this.width // set image width
          item.h = this.height // set image height
          gallery.invalidateCurrItems() // reinit Items
          gallery.updateSize(true) // reinit Items
        }
        img.src = item.src // let's download image
      }

      // dots
      const current = gallery.getCurrentIndex()
      const all = gallery.options.getNumItemsFn()

      const $dotsContainer = pswpElement.querySelector('.pswp__dots')
      $dotsContainer.innerHTML = ''
      for (let i = 0; i < all; i++) {
        const $dot = document.createElement('div')
        $dot.classList.add('pswp__dot')
        if (i === current) {
          $dot.classList.add('is-active')
        }
        $dotsContainer.appendChild($dot)
      }
    })
    gallery.init()
    Array.from(document.querySelectorAll('.pswp__button')).forEach($button => {
      const $icon = $button.children[0]
      if ($icon) {
        $icon.addEventListener('click', () => {
          $button.click()
        })
      }
    })
  }

  destroy () {
    this.slider.destroy(false, true)
  }
}

export default PhotoSlider
