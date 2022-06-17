import { Swiper, Pagination } from 'swiper'

class MultiSlider {
  constructor ($element) {
    this.breakpoint = window.matchMedia('(min-width: 1024px)')
    this.mySwiper = undefined
    this.$element = $element
    this.paginationAttr = 'data-mob-slider-pagination'
    this.breakpointChecker = this.breakpointChecker.bind(this)

    this._init()
  }

  _init () {
    this.$pagination = this.$element.querySelector(`[${this.paginationAttr}]`)

    // keep an eye on viewport size changes
    this.breakpoint.addListener(this.breakpointChecker)

    // kickstart
    this.breakpointChecker()
  }

  breakpointChecker () {
    // if larger viewport and multi-row layout needed
    if (this.breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (this.mySwiper !== undefined) this.mySwiper.destroy(true, true)

      // or/and do nothing
      return false

      // else if a small viewport and single column layout needed
    } else if (this.breakpoint.matches === false) {
      // fire small viewport version of swiper
      return this.enableSwiper()
    }
  }

  enableSwiper () {
    Swiper.use([Pagination])

    this.mySwiper = new Swiper(this.$element, {

      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        }
      },

      pagination: {
        el: this.$pagination,
        clickable: true
      }
    })
  }

  destroy () {
    this.mySwiper.destroy(true, true)
  }
}

export default MultiSlider
