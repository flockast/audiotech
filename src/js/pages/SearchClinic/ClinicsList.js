class ClinicsList {
  constructor (list) {
    this.initialSelector = '[data-clinic-list]'
    this._init(list)
  }

  _init (list) {
    this.$tag = document.querySelector(this.initialSelector)
    if (this.$tag) {
      this.$table = document.createElement('div')
      this.$table.classList.add('table-list')
      this.$tag.appendChild(this.$table)
      this.render(list)
    }
  }

  render (list) {
    this.$table.innerHTML = list.map(item => {
      return `
      <div class="table-list__tr">
        <div class="table-list__td">
          <div class="text-body-bold">${item.title}</div>
        </div>
        <div class="table-list__td">${item.address}</div>
        <div class="table-list__td">
          ${
            item.phones.map(phone => {
              return `<a href="tel:${phone.raw}">${phone.tel}</a>`
            }).join('<br>')
          }
        </div>
        <div class="table-list__td">
          <a href="mailto:${item.mail}">${item.mail}</a><br>
          <a href="${item.site.link}" target="_blank">${item.site.title}</a>
        </div>
      </div>
      `
    }).join('')
  }
}

export default ClinicsList
