import scrollLock from '../../utils/scrollLock.js'

class HeaderMobileMenu {
  constructor (options) {
    this.hamburgerAttr = 'data-hamburger'
    this.mobileMenuAttr = 'data-mobile-menu-wrapper'
    this._init(options)
  }

  _init (options) {
    this.options = Object.assign({
      onClick: () => {},
      onOpen: () => {},
      onClose: () => {}
    }, options)

    this.$hamburger = document.querySelector(`[${this.hamburgerAttr}]`)
    this.$menu = document.querySelector(`[${this.mobileMenuAttr}]`)

    this._handleClickOnHamburger = this._handleClickOnHamburger.bind(this)
    if (this.$hamburger) {
      this.$hamburger.addEventListener('click', this._handleClickOnHamburger)
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.closeMobileMenu()
      }
    })
  }

  _handleClickOnHamburger () {
    this.options.onClick()
    if (this.$hamburger.classList.contains('is-active')) {
      scrollLock.disable()
      this.options.onClose()
      this.closeMobileMenu()
    } else {
      scrollLock.enable()
      this.options.onOpen()
      this.openMobileMenu()
    }
  }

  openMobileMenu () {
    this.$hamburger.classList.add('is-active')
    this.$menu.classList.add('is-active')
  }

  closeMobileMenu () {
    this.$hamburger.classList.remove('is-active')
    this.$menu.classList.remove('is-active')
  }

  on (event, callback) {
    if (event === 'open') {
      this.options.onOpen = callback
    }

    if (event === 'close') {
      this.options.onClose = callback
    }
  }
}

export default HeaderMobileMenu
