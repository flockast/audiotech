import { Swiper, Pagination, Navigation } from 'swiper'

class MultiSlider {
  constructor ($element) {
    this.paginationAttr = 'data-multi-slider-pagination'
    this.prevAttr = 'data-multi-slider-prev'
    this.nextAttr = 'data-multi-slider-next'
    this._init($element)
  }

  _init ($element) {
    this.$pagination = $element.querySelector(`[${this.paginationAttr}]`)
    this.$prev = $element.querySelector(`[${this.prevAttr}]`)
    this.$next = $element.querySelector(`[${this.nextAttr}]`)

    Swiper.use([Pagination, Navigation])

    this.slider = new Swiper($element, {

      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1260: {
          slidesPerView: 3,
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
  }

  destroy () {
    this.slider.destroy(false, true)
  }
}

export default MultiSlider
