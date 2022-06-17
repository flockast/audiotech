class ClinicsMap {
  constructor (list) {
    this.mapId = 'clinics-map'
    this.mapCenter = [56.838011, 60.597465]
    this._init(list)
  }

  _init (list) {
    if (document.querySelector(`#${this.mapId}`) && window.ymaps) {
      window.ymaps.ready(() => {
        this.myMap = new window.ymaps.Map(this.mapId, {
          center: this.mapCenter,
          zoom: 5,
          controls: ['zoomControl'],
          search: false
        })

        this.myMap.behaviors.disable('scrollZoom')
        this.myCollection = new window.ymaps.GeoObjectCollection()
        this.render(list)
      })
    }
  }

  render (list) {
    this.myCollection.removeAll()

    list.forEach(marker => {
      this.buildPlacemark(marker)
    })
  }

  buildPlacemark (marker) {
    const balloonLayout = window.ymaps.templateLayoutFactory.createClass(
      `
      <div class="map-balloon">
        <div class="map-balloon__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.243 17.657a1 1 0 001.414-1.415L13.414 12l4.243-4.243a1 1 0 00-1.414-1.414L12 10.586 7.757 6.343a1 1 0 10-1.414 1.414L10.586 12l-4.243 4.243a1 1 0 101.414 1.414L12 13.414l4.243 4.243z" fill="#314147"/></svg>
        </div>
        <div class="map-balloon__title">${marker.title}</div>
        <div class="map-balloon__info">${marker.address}</div>
        <div class="map-balloon__info">
          ${
            marker.phones.map(phone => {
              return `<a href="tel:${phone.raw}">${phone.tel}</a>`
            }).join('<br>')
          }
        </div>
        <div class="map-balloon__info">
          <a href="mailto:${marker.mail}">${marker.mail}</a><br>
          <a href="${marker.site.link}" target="_blank">${marker.site.title}</a>
        </div>
      </div>
      `,
      {
        build: function () {
          this.constructor.superclass.build.call(this)
          const $map = this.getParentElement()
          const $balloon = $map.querySelector('.map-balloon')
          const $close = $balloon.querySelector('.map-balloon__close')
          $close.addEventListener('click', event => {
            event.preventDefault()
            this.events.fire('userclose')
          })
        }
      }
    )

    const placemark = new window.ymaps.Placemark(marker.coords, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../../images/content/icons/icon-map-pin.svg',
      balloonLayout: balloonLayout
    })

    this.myCollection.add(placemark)
    this.myMap.geoObjects.add(this.myCollection)
  }
}

export default ClinicsMap
