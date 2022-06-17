import CreateComponent from '../containers/CreateComponent.js'

import SearchBlock from '../partials/Header/SearchBlock.js'
import HeaderDesktopSubmenu from '../partials/Header/HeaderDesktopSubmenu.js'
import HeaderMobileMenu from '../partials/Header/HeaderMobileMenu.js'
import HeaderMobileMenuList from '../partials/Header/HeaderMobileMenuList.js'
import HeaderDesktopSubItem from '../partials/Header/HeaderDesktopSubItem.js'

import MainSlider from '../components/MainSlider/MainSlider.js'
import Parallax from '../components/Parrallax/Parallax.js'
import Tabs from '../components/Tabs/Tabs.js'
import MultiSlider from '../components/MultiSlider/MultiSlider.js'
import MobSlider from '../components/MobSlider/MobSlider.js'
import PhotoSlider from '../components/PhotoSlider/PhotoSlider.js'
import SliderWithThumbs from '../components/SliderWithThumbs/SliderWithThumbs.js'
import SingleSlider from '../components/SingleSlider/SingleSlider.js'
import Accordion from '../components/Accordion/Accordion.js'
import InputPassword from '../components/InputPassword/PasswordInput.js'
import Select from '../components/Select/Select.js'
import SortTable from '../components/Orders/SortTable.js'

import SearchClinicPage from '../pages/SearchClinic/SearchClinicPage.js'
import ContactsMap from '../pages/Contacts/ContactsMap.js'

class App {
  constructor () {
    this._init()
      .then(() => {
        // console.log('success')
      })
  }

  async _init () {
    await this.initPartials()
    await this.initComponents()
    await this.initPages()
    await this.sandbox()
  }

  sandbox () {
    // При открытии мобильного меню сварачивать все пункты
    this.headerMobileMenu.on('open', () => {
      this.headerMobileMenuList.closeAll()
    })

    // При закрытии подменю скрывать все подпункты 3его уровня
    this.headerDesktopSubmenu.on('close', () => {
      this.headerDesktopSubItem.closeAll()
    })

    // При переключении табов заново инициализировать слайдеры

    this.tabs.components.forEach(tabComponent => {
      tabComponent.instance.on('change', () => {
        this.multiSlider.reInit()
        this.singleSlider.reInit()
        this.photoSlider.reInit()
      })
    })
  }

  initPartials () {
    this.headerMobileMenuList = new HeaderMobileMenuList()
    this.headerMobileMenu = new HeaderMobileMenu()
    this.headerDesktopSubItem = new HeaderDesktopSubItem()
    this.headerDesktopSubmenu = new HeaderDesktopSubmenu()
    new SearchBlock()
  }

  initComponents () {
    this.tabs = new CreateComponent('[data-tabs]', Tabs)
    this.singleSlider = new CreateComponent('[data-single-slider]', SingleSlider)
    this.multiSlider = new CreateComponent('[data-multi-slider]', MultiSlider)
    this.photoSlider = new CreateComponent('[data-photo-slider]', PhotoSlider)
    new CreateComponent('[data-parallax]', Parallax)
    new CreateComponent('[data-input-password]', InputPassword)
    new CreateComponent('[data-main-slider]', MainSlider)
    new CreateComponent('[data-mob-slider]', MobSlider)
    new CreateComponent('[data-slider-with-thumbs]', SliderWithThumbs)
    new CreateComponent('[data-accordion]', Accordion)
    new CreateComponent('.select', Select)
    new CreateComponent('.at-table', SortTable)
  }

  initPages () {
    new SearchClinicPage()
    new ContactsMap()
  }
}

export default App
