class SearchBlock {
  constructor () {
    this.iconAttr = 'data-search-icon'
    this.clearButton = 'data-search-clear'
    this.searchBlockAttr = 'data-search-block'
    this.searchBlocInputkAttr = 'data-search-block-input'
    this._init()
  }

  _init () {
    this.$icon = document.querySelector(`[${this.iconAttr}]`)
    this.$search = document.querySelector(`[${this.searchBlockAttr}]`)
    this.$input = document.querySelector(`[${this.searchBlocInputkAttr}]`)
    this.$clear = document.querySelector(`[${this.clearButton}]`)

    this.handleClickIcon = this.handleClickIcon.bind(this)
    if (this.$icon) {
      this.$icon.addEventListener('click', this.handleClickIcon)
    }

    this.handleClear = this.handleClear.bind(this)
    if (this.$clear) {
      this.$clear.addEventListener('click', this.handleClear)
    }
  }

  handleClickIcon () {
    if (this.$search.classList.contains('is-active')) {
      this.close()
    } else {
      this.open()
    }
  }

  handleClear () {
    this.$input.value = ''
    this.$input.focus()
  }

  close () {
    this.$search.classList.remove('is-active')
  }

  open () {
    this.$search.classList.add('is-active')
    this.$input.focus()
  }
}

export default SearchBlock
