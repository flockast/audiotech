const $body = document.querySelector('body')
let scrollPosition = 0

export default {
  enable () {
    scrollPosition = window.pageYOffset
    $body.classList.add('scroll-lock')
    $body.style.top = `-${scrollPosition}px`
  },

  disable () {
    $body.classList.remove('scroll-lock')
    $body.style.removeProperty('top')
    window.scrollTo(0, scrollPosition)
  }
}
