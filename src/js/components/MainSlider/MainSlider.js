import { Swiper, Pagination, Navigation, Parallax, EffectFade, Autoplay } from 'swiper'

const AUTOPLAY_DELAY = 5000

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

    Swiper.use([Pagination, Navigation, Parallax, EffectFade, Autoplay])

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
        type: 'custom',
        renderCustom: (swiper, current, total) => {
          return `
            <div
              class="progress-bullets"
              style="--delay: ${AUTOPLAY_DELAY}ms"
            > 
              ${
                Array.from(Array(total).keys()).map((index) => {
                  return current === index + 1
                    ? `
                      <div class="progress-bullet is-active">
                        <svg viewBox="0 0 20 20" width="20" height="20">
                          <circle cx="50%" cy="50%" r="9" stroke-linecap="round" />
                        </svg>
                      </div>
                    `
                    : `
                      <div class="progress-bullet"></div>
                    `
                }).join('')
              }
            </div>
          `
        }
      },

      navigation: {
        nextEl: this.$next,
        prevEl: this.$prev
      },

      autoplay: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false
      },

      on: {
        init: () => {
          this.$element.classList.add('has-initialized')
        },

        slideChange: () => {
          setTimeout(() => {
            const bullets = Array.from(this.$element.querySelectorAll('.progress-bullet'))
            if (!bullets && !bullets.length) return
            bullets.forEach((bullet, index) => {
              bullet.addEventListener('click', () => {
                this.slideTo(index + 1)
              })
            })
          })
        }
      }
    })
  }

  slideTo (index) {
    this.slider.slideTo(index)
  }
}

export default MainSlider
