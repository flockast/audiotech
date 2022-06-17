import { Swiper, Pagination, Navigation } from 'swiper'

class SingleSlider {
  constructor ($element) {
    this.$element = $element
    this.paginationAttr = 'data-single-slider-pagination'
    this.prevAttr = 'data-single-slider-prev'
    this.nextAttr = 'data-single-slider-next'
    this._init()
  }

  _init () {
    this.$pagination = this.$element.querySelector(`[${this.paginationAttr}]`)
    this.$prev = this.$element.querySelector(`[${this.prevAttr}]`)
    this.$next = this.$element.querySelector(`[${this.nextAttr}]`)

    this._enableSlider()
  }

  _enableSlider () {
    Swiper.use([Pagination, Navigation])
    this.slider = new Swiper(this.$element, {

      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 40
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
    this.slider.destroy(true, true)
  }
}

export default SingleSlider
