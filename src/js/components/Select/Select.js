class Select {
  constructor ($element) {
    this.$element = $element
    this._init()
  }

  _init () {
    this.$select = this.$element.querySelector('select')
    this.event = new Event('change')

    this.$selectSelected = document.createElement('div')
    this.$selectSelected.classList.add('select__selected')
    this.$selectSelected.innerHTML = this.$select.options[this.$select.selectedIndex].innerHTML
    this.$element.appendChild(this.$selectSelected)

    this.$selectItems = document.createElement('div')
    this.$selectItems.classList.add('select__items')

    Array.from(this.$select.options).forEach(($option, index) => {
      const $item = document.createElement('div')
      $item.innerHTML = $option.innerHTML
      $item.addEventListener('click', () => {
        this.makeChoice(index)
      })
      this.$selectItems.appendChild($item)
    })

    this.$element.appendChild(this.$selectItems)

    this.$selectSelected.addEventListener('click', () => {
      if (this.$element.classList.contains('is-opened')) {
        this.close()
      } else {
        this.open()
      }
    })

    document.addEventListener('click', (event) => {
      if (event.target !== this.$selectSelected && event.target.parentElement !== this.$selectItems) {
        this.close()
      }
    })
  }

  close () {
    this.$element.classList.remove('is-opened')
  }

  open () {
    this.$element.classList.add('is-opened')
  }

  makeChoice (index) {
    Array.from(this.$selectItems.children).forEach($item => {
      $item.classList.remove('is-selected')
    })
    this.$selectItems.children[index].classList.add('is-selected')
    this.$selectSelected.innerHTML = this.$select.options[index].innerHTML
    this.$select.selectedIndex = index
    this.$select.dispatchEvent(this.event)
    this.close()
  }
}

export default Select
