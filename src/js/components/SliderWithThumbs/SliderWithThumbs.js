import { Swiper, Thumbs } from 'swiper'

class SliderWithThumbs {
  constructor ($element) {
    this.$element = $element
    this.gallerySelector = '.slider-with-thumbs__gallery'
    this.thumbsSelector = '.slider-with-thumbs__thumbs'
    this._init()
  }

  _init () {
    this.$gallery = this.$element.querySelector(this.gallerySelector)
    this.$thumbs = this.$element.querySelector(this.thumbsSelector)

    this.enableSlider()
  }

  enableSlider () {
    Swiper.use([Thumbs])

    this.thumbs = new Swiper(this.$thumbs, {

      spaceBetween: 15,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,

      breakpoints: {
        768: {
          slidesPerView: 4.85
        },

        1024: {
          slidesPerView: 3.59
        },

        1260: {
          slidesPerView: 4.39
        }
      }
    })

    this.gallery = new Swiper(this.$gallery, {
      spaceBetween: 15,
      thumbs: {
        swiper: this.thumbs
      }
    })
  }

  destory () {
    this.gallery.destroy(true, true)
    this.thumbs.destroy(true, true)
  }
}

export default SliderWithThumbs
