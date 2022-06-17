class HeaderDesktopSubmenu {
  constructor () {
    this.menuWrapperAttr = 'data-header'
    this.menuItemAttr = 'data-menu-item-id'
    this.submenuAttr = 'data-submenu-id'
    this.submenuWrapperAttr = 'data-submenu-wrapper'
    this._init()
  }

  _init () {
    this.events = {
      onClose: () => {}
    }

    this.$menuWrapper = document.querySelector(`[${this.menuWrapperAttr}]`)
    this.$menuItems = document.querySelectorAll(`[${this.menuItemAttr}]`)
    this.$subMenus = document.querySelectorAll(`[${this.submenuAttr}]`)
    this.$submenuWrapper = document.querySelector(`[${this.submenuWrapperAttr}]`)

    this.$menuItems.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.showOneSubmenu(element.getAttribute(this.menuItemAttr))
      })
    })

    if (this.$menuWrapper) {
      this.$menuWrapper.addEventListener('mouseleave', () => {
        this.closeOneSubmenu()
      })
    }

    this.$subMenus.forEach(element => {
      element.children[0].addEventListener('mouseleave', () => {
        this.closeOneSubmenu(element.getAttribute(this.submenuAttr))
      })
    })
  }

  _getSubmenuById (menuId) {
    if (!menuId) return false
    return [...this.$subMenus].find(element => element.getAttribute(this.submenuAttr) === menuId)
  }

  closeSubmenu () {
    this.$subMenus.forEach(element => {
      element.classList.remove('is-active')
    })
    this.$submenuWrapper.classList.remove('is-active')
    this.events.onClose()
  }

  closeOneSubmenu (menuId) {
    const $submenu = this._getSubmenuById(menuId)
    if ($submenu) {
      $submenu.classList.remove('is-active')
    }
    this.$submenuWrapper.classList.remove('is-active')
  }

  showOneSubmenu (menuId) {
    this.closeSubmenu()
    this.$submenuWrapper.classList.add('is-active')
    const $submenu = this._getSubmenuById(menuId)
    if ($submenu) {
      $submenu.classList.add('is-active')
    }
  }

  on (event, callback) {
    if (event === 'close') {
      this.events.onClose = callback
    }
  }
}

export default HeaderDesktopSubmenu
