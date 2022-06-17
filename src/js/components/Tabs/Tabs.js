class Tabs {
  constructor ($element, options) {
    this.tabsItemAttr = 'data-tabs-menu-id'
    this.tabsContentAttr = 'data-tabs-content-id'
    this.tabsMarkerAttr = 'data-tabs-menu-marker'
    this.classTabMarker = 'at-tabs-menu-marker'

    this.$element = $element
    this._init($element, options)
  }

  _init (options) {
    this.options = Object.assign({
      onChange: () => {}
    }, options)

    this.$tabs = Array.from(this.$element.children[0].querySelectorAll(`[${this.tabsItemAttr}]`))
    this.$contents = Array.from(this.$element.children[1].children[0].children)

    this.$marker = document.createElement('div')
    this.$marker.classList.add(this.classTabMarker)
    this.$element.children[0].appendChild(this.$marker)

    this._handleClickOnTab = this._handleClickOnTab.bind(this)

    this.$tabs.forEach(tab => {
      tab.addEventListener('click', this._handleClickOnTab)
    })

    // Open first tab
    this._handleOpenTab(this.$tabs[0].getAttribute(this.tabsItemAttr), true)
  }

  _getContentById (id) {
    return this.$contents.find(content => content.getAttribute(this.tabsContentAttr) === id)
  }

  _getTabById (id) {
    return this.$tabs.find(tab => tab.getAttribute(this.tabsItemAttr) === id)
  }

  _handleClickOnTab (event) {
    event.preventDefault()
    const $tab = event.target
    const id = $tab.getAttribute(this.tabsItemAttr)
    this._handleOpenTab(id)
  }

  _closeAll () {
    this.$tabs.forEach(tab => tab.classList.remove('is-active', 'is-initial'))
    this.$contents.forEach(content => content.classList.remove('is-active'))
  }

  _handleOpenTab (id, firstOpen = false) {
    this._closeAll()
    this._openTab(id)
    // this._updateMarker(id)
    this.options.onChange(id)

    // Класс для замены маркера, если изначально табы были скрыты
    if (firstOpen) {
      this._getTabById(id).classList.add('is-initial')
    }
  }

  _updateMarker (id) {
    const $tab = this._getTabById(id)
    const offset = $tab.offsetLeft
    const width = $tab.offsetWidth
    this.$marker.style.width = `${width}px`
    this.$marker.style.transform = `translateX(${offset}px)`
  }

  _openTab (id) {
    const $content = this._getContentById(id)
    if ($content) {
      $content.classList.add('is-active')
      const $tab = this._getTabById(id)
      $tab.classList.add('is-active')
    }
  }

  on (event, callback) {
    if (event === 'change') {
      this.options.onChange = callback
    }
  }

  destroy () {
    this.$tabs.forEach(tab => {
      tab.removeEventListener('click', this._handleClickOnTab)
    })
  }
}

export default Tabs
