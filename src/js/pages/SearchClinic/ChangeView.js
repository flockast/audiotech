class ChangeView {
  constructor () {
    this.labelAttr = 'data-view'
    this.contentAttr = 'data-content'
    this._init()
  }

  _init () {
    this.$labels = document.querySelectorAll(`[${this.labelAttr}]`)
    this.$contents = document.querySelectorAll(`[${this.contentAttr}]`)

    if (this.$labels.length && this.$contents.length) {
      Array.from(this.$labels).forEach($label => {
        $label.addEventListener('click', (event) => {
          event.preventDefault()
          this.open($label.getAttribute(this.labelAttr))
        })
      })

      // Изначальное открытие
      const hash = window.location.hash.replace('#', '')
      if (hash && this._findContentByKey(hash)) {
        this.open(hash)
      } else {
        this.open(this.$labels[0].getAttribute(this.labelAttr))
      }
    }
  }

  _findLabelByKey (key) {
    return Array.from(this.$labels).find($label => $label.getAttribute(this.labelAttr) === key)
  }

  _findContentByKey (key) {
    return Array.from(this.$contents).find($content => $content.getAttribute(this.contentAttr) === key)
  }

  open (key) {
    this.closeAll()
    const $content = this._findContentByKey(key)
    const $label = this._findLabelByKey(key)

    $content.classList.add('d-block')
    $content.classList.remove('d-none')
    $label.classList.add('is-active')

    window.location.hash = `#${key}`
  }

  closeAll () {
    Array.from(this.$labels).forEach($label => {
      $label.classList.remove('is-active')
    })

    Array.from(this.$contents).forEach($content => {
      $content.classList.remove('d-block')
      $content.classList.add('d-none')
    })
  }
}

export default ChangeView
