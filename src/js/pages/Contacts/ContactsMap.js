class ContactsMap {
  constructor () {
    this.mapId = 'contacts-map'
    this.mapCenter = [55.793576, 37.489284]
    this._init([
      {
        coords: [55.793576, 37.489284],
        title: 'Audiotech',
        address: '123060, Москва,mул. Маршала Соколовского, д. 3, 5 этаж',
        country: 'russia',
        city: 'kirov',
        types: ['cochlear', 'traheostomia'],
        phones: [
          {
            tel: '8 (800) 434-45-45',
            raw: '+78004344545'
          },
          {
            tel: '8 (495) 321-21-21',
            raw: '+74953212121'
          }
        ],
        mail: 'info@rnpc.ru',
        site: {
          title: 'info@rnpc.ru',
          link: 'https://rnpc.ru'
        }
      }
    ])
  }

  _init (list) {
    if (document.querySelector(`#${this.mapId}`) && window.ymaps) {
      window.ymaps.ready(() => {
        this.myMap = new window.ymaps.Map(this.mapId, {
          center: this.mapCenter,
          zoom: 13,
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

    const iconLayout = window.ymaps.templateLayoutFactory.createClass(`
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.3636 21L11.2542 22.6641C11.926 23.112 12.8012 23.112 13.473 22.6641L12.3636 21Z" fill="white"/>
        <path d="M12.3636 21C11.2542 22.6641 11.2533 22.6635 11.2533 22.6635L11.2494 22.6609L11.2418 22.6558L11.2188 22.6402C11.2 22.6274 11.1743 22.6099 11.1422 22.5876C11.0781 22.5432 10.9882 22.4801 10.8762 22.3992C10.6526 22.2377 10.3397 22.0046 9.96721 21.708C9.22539 21.1173 8.23105 20.2618 7.22991 19.205C5.30943 17.1779 3 14.0312 3 10.3636C3 7.88025 3.98652 5.49857 5.74255 3.74255C7.49857 1.98652 9.88025 1 12.3636 1C14.847 1 17.2287 1.98652 18.9847 3.74255C20.7407 5.49857 21.7273 7.88024 21.7273 10.3636C21.7273 14.0312 19.4178 17.1779 17.4974 19.205C16.4962 20.2618 15.5019 21.1173 14.7601 21.708C14.3876 22.0046 14.0747 22.2377 13.851 22.3992C13.7391 22.4801 13.6492 22.5432 13.5851 22.5876C13.553 22.6099 13.5273 22.6274 13.5085 22.6402L13.4855 22.6558L13.4779 22.6609L13.4751 22.6627L13.474 22.6635C13.474 22.6635 13.473 22.6641 12.3636 21Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3636 21C12.3636 21 19.7273 16.0909 19.7273 10.3636C19.7273 8.41068 18.9515 6.53771 17.5705 5.15676C16.1896 3.77581 14.3166 3 12.3636 3C10.4107 3 8.53771 3.77581 7.15676 5.15676C5.77581 6.53771 5 8.41068 5 10.3636C5 16.0909 12.3636 21 12.3636 21ZM14.8182 10.3636C14.8182 11.7192 13.7192 12.8182 12.3636 12.8182C11.008 12.8182 9.90909 11.7192 9.90909 10.3636C9.90909 9.00803 11.008 7.90909 12.3636 7.90909C13.7192 7.90909 14.8182 9.00803 14.8182 10.3636Z" fill="#F16822"/>
      </svg>
    `)

    const placemark = new window.ymaps.Placemark(marker.coords, {}, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '',
      balloonLayout: balloonLayout,
      iconContentLayout: iconLayout,
      iconImageSize: [32, 32],
      iconImageOffset: [-15, -32]
    })

    this.myCollection.add(placemark)
    this.myMap.geoObjects.add(this.myCollection)
  }
}

export default ContactsMap
