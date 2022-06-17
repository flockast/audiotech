import { Swiper, Pagination, Navigation, Parallax, EffectFade } from 'swiper'

class MainSlider {
  constructor ($element) {
    this.$element = $element
    this.sliderContainerAttr = 'data-main-slider-container'
    this.sliderPrevAttr = 'data-main-slider-prev'
    this.sliderNextAttr = 'data-main-slider-next'
    this.sliderPaginationAttr = 'data-main-slider-pagination'

    this.init($element)
  }

  init () {
    this.$container = this.$element.querySelector(`[${this.sliderContainerAttr}]`)
    this.$pagination = this.$element.querySelector(`[${this.sliderPaginationAttr}]`)
    this.$prev = this.$element.querySelector(`[${this.sliderPrevAttr}]`)
    this.$next = this.$element.querySelector(`[${this.sliderNextAttr}]`)

    Swiper.use([Pagination, Navigation, Parallax, EffectFade])

    this.slider = new Swiper(this.$container, {
      effect: 'fade',

      fadeEffect: {
        crossFade: true
      },

      loop: true,

      speed: 250,

      parallax: true,

      autoHeight: true,

      pagination: {
        el: this.$pagination,
        clickable: true,
        type: getPaginationType(),
        renderCustom: (_, current, total) => {
          return `<span class="page-current">0${current}</span>/<span class="page-total">0${total}</span>`
        }
      },

      navigation: {
        nextEl: this.$next,
        prevEl: this.$prev
      },

      on: {
        init: () => {
          this.$element.classList.add('has-initialized')
        }
      }
    })

    function getPaginationType () {
      return window.innerWidth < 1024 ? 'bullets' : 'custom'
    }
  }
}

export default MainSlider
