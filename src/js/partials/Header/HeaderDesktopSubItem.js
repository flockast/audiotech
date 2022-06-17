class HeaderDesktopSubItem {
  constructor () {
    this.itemsAttr = 'data-sub-item-id'
    this.contentsAttr = 'data-sub-item-content'
    this._init()
  }

  _init () {
    this.$items = Array.from(document.querySelectorAll(`[${this.itemsAttr}]`))
    this.$contents = Array.from(document.querySelectorAll(`[${this.contentsAttr}]`))

    this.closeAll()

    this.$items.forEach($item => {
      $item.addEventListener('mouseenter', () => {
        this.closeAll()
        this.openOne($item.getAttribute(this.itemsAttr))
      })
    })
  }

  _findItemById (id) {
    return this.$items.find($item => $item.getAttribute(this.itemsAttr) === id)
  }

  _findContentById (id) {
    return this.$contents.find($content => $content.getAttribute(this.contentsAttr) === id)
  }

  closeAll () {
    this.$contents.forEach($content => {
      $content.style.display = 'none'
    })

    this.$items.forEach($item => {
      $item.classList.remove('is-active')
    })
  }

  openOne (id) {
    this.closeAll()

    const $content = this._findContentById(id)

    if ($content) {
      $content.style.display = 'block'

      const $item = this._findItemById(id)

      if ($item) {
        $item.classList.add('is-active')
      }
    }
  }
}

export default HeaderDesktopSubItem
