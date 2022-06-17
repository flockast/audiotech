import ChangeView from './ChangeView.js'
import Filters from './Filters.js'

class SearchClinicPage {
  constructor () {
    this._init()
  }

  _init () {
    new ChangeView()
    new Filters()
  }
}

export default SearchClinicPage
