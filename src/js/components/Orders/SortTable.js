import Tablesort from 'tablesort'

export default class SortTable {
  constructor ($element) {
    this.$element = $element
    this._init()
  }

  _init () {
    this.$table = this.$element.querySelector('table')
    this.$tbody = this.$table.querySelector('tbody')
    this.table = new Tablesort(this.$table)
    this.initHoverElement()
  }

  initHoverElement () {
    const $hover = document.createElement('div')
    $hover.classList.add('table-hover')
    this.$element.appendChild($hover)

    const $trs = Array.from(this.$tbody.querySelectorAll('tr'))

    $trs.forEach($tr => {
      $tr.addEventListener('mouseenter', (event) => {
        const offsetTop = event.target.getBoundingClientRect().top + window.scrollY
        $hover.classList.add('is-active')
        $hover.style.top = `${offsetTop}px`
      })
    })

    this.$tbody.addEventListener('mouseleave', () => {
      $hover.classList.remove('is-active')
    })
  }
}
