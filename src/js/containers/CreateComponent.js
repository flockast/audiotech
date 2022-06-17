class CreateComponent {
  constructor (selector, ComponentClass) {
    this.ComponentClass = ComponentClass || class {}
    this.selector = selector
    this.components = []
    this._init()
  }

  _init () {
    const elements = Array.from(document.querySelectorAll(this.selector))
    if (elements.length > 0) {
      elements.forEach(element => {
        const instance = new this.ComponentClass(element, this.selector) || {}
        this._addComponent(element, instance)
      })
    }
  }

  _addComponent (element, instance) {
    this.components.push({
      element,
      instance
    })
  }

  _destroyAllComponents () {
    this.components.forEach(item => {
      if (typeof item.instance.destroy === 'function') {
        item.instance.destroy()
      }
    })

    this.components = []
  }

  _destroyOneComponent (id) {
    if (this.components[id]) {
      if (typeof this.components[id].component.destroy === 'function') {
        this.components[id].component.destroy()
      }

      this.components.splice(id, 1)
    }
  }

  initAgain () {
    const elements = document.querySelectorAll(this.selector)
    if (elements.length > 0) {
      elements.forEach(element => {
        const findElement = [...this.components].find(component => component.element.isEqualNode(element))
        if (!findElement) {
          const instance = new this.ComponentClass(element, this.selector) || {}
          this._addComponent(element, instance)
        }
      })
    }
  }

  destroy (id = null) {
    if (id === null) {
      this._destroyAllComponents()
    } else {
      this._destroyOneComponent(id)
    }
  }

  reInit (id = null) {
    this.destroy(id)
    this.initAgain()
  }
}

export default CreateComponent
