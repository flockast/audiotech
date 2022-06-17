class HeaderMobileMenuList {
  constructor () {
    this.itemAttr = 'data-mobile-menu-item'
    this.chevronAttr = 'data-mobile-menu-item-chevron'
    this._init()
  }

  _init () {
    this.$items = document.querySelectorAll(`[${this.itemAttr}]`)

    this.$items.forEach($item => {
      const $chevron = $item.children[0].querySelector(`[${this.chevronAttr}]`)

      if ($chevron) {
        $chevron.addEventListener('click', () => {
          this.handleClickOnChevron($item)
        })
      }
    })
  }

  handleClickOnChevron ($item) {
    $item.classList.toggle('is-opened')
  }

  closeAll () {
    this.$items.forEach($item => {
      $item.classList.remove('is-opened')
    })
  }
}

export default HeaderMobileMenuList
