class Accordion {
  constructor ($element) {
    this.$element = $element

    this.itemSelect = '.accordion__item'
    this.labelSelect = '.accordion-label'
    this.contentSelect = '.accordion-content'

    this._init()
  }

  _init () {
    this.$items = this.$element.querySelectorAll(this.itemSelect)
    this.items = []
    this.$items.forEach(($item, index) => {
      const $label = $item.querySelector(this.labelSelect)
      const $content = $item.querySelector(this.contentSelect)
      this.items.push({
        $item,
        $label,
        $content
      })
      $label.addEventListener('click', () => {
        this.handleClickOnLabel(index)
      })
    })

    // Настройки
    let options = this.$element.getAttribute('data-options')
    if (options) {
      options = options.replace(/\s/g, '').split(',')
    }

    // Открыть первый элемент
    if (options) {
      if (options.includes('first-is-open')) {
        setTimeout(() => {
          this.open(0)
        })
      }
    }
  }

  handleClickOnLabel (id) {
    if (this.items[id].$item.classList.contains('is-active')) {
      this.close(id)
    } else {
      this.open(id)
    }
  }

  closeAll () {
    this.items.forEach(item => {
      item.$item.classList.remove('is-active')
      item.$content.style.maxHeight = 0
    })
  }

  open (id) {
    this.items[id].$item.classList.add('is-active')
    this.items[id].$content.style.maxHeight = this.items[id].$content.scrollHeight + 'px'
  }

  close (id) {
    this.items[id].$item.classList.remove('is-active')
    this.items[id].$content.style.maxHeight = 0
  }

  destroy () {
    this.$tabs.forEach(tab => {
      tab.removeEventListener('click', this._handleClickOnTab)
    })
  }
}

export default Accordion
