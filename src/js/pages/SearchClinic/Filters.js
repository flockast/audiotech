import mockClinics from '../../data/clinics.js'

import ClinicsList from './ClinicsList.js'
import ClinicsMap from './ClinicsMap.js'

const clinics = window.arClicnics || mockClinics

class Filters {
  constructor () {
    this.filterClinicCitySelector = '.js-filter-clinic-city'
    this.filterClinicTypeSelector = '.js-filter-clinic-type'

    this.allClinics = [...clinics]
    this.currentClinics = [...clinics]

    this._init()
  }

  _init () {
    this.$cityFilter = document.querySelector(this.filterClinicCitySelector)
    this.$typeFilter = document.querySelector(this.filterClinicTypeSelector)

    if (this.$cityFilter) {
      this.$cityFilter.addEventListener('change', () => {
        this.filter()
      })
    }

    if (this.$typeFilter) {
      this.$typeFilter.addEventListener('change', () => {
        this.filter()
      })
    }

    this.clinicsMap = new ClinicsMap(this.currentClinics)
    this.clinicsList = new ClinicsList(this.currentClinics)
  }

  filter () {
    const city = this.$cityFilter.value
    const type = this.$typeFilter.value

    this.currentClinics = this.allClinics.filter((clinic) => {
      if (city === 'russia') {
        return true
      } else {
        return clinic.city === city
      }
    })

    this.currentClinics = this.currentClinics.filter((clinic) => {
      if (type === 'all') {
        return true
      } else {
        return clinic.types.includes(type)
      }
    })

    this.render()
  }

  render () {
    this.clinicsList.render(this.currentClinics)
    this.clinicsMap.render(this.currentClinics)
  }
}

export default Filters
