const linearInterpolation = (x1, y1, x2, y2, x) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1))

class BulletProgress {
  constructor (element, delay = 5000) {
    if (!element) return
    this.init(element, delay)
  }

  init (element, delay) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', '20px')
    canvas.setAttribute('height', '20px')
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.centerX = canvas.width / 2
    this.centerY = canvas.height / 2
    this.delay = delay
    element.appendChild(canvas)
    this.draw()
  }

  draw () {
    const fps = 60
    const interval = 1000 / fps
    let counter = 0
    let now
    let then = Date.now()
    let delta

    const clear = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    const drawDot = () => {
      this.ctx.beginPath()
      this.ctx.arc(this.centerX, this.centerY, 4, 0, 2 * Math.PI)
      this.ctx.fillStyle = '#DB1F26'
      this.ctx.fill()
      this.ctx.lineWidth = 1
      this.ctx.lineJoin = 'round'
      this.ctx.strokeStyle = '#DB1F26'
      this.ctx.stroke()
    }

    const drawProgress = (ms) => {
      const end = linearInterpolation(this.delay, 360, 0, 0, ms)

      this.ctx.beginPath()
      this.ctx.arc(
        this.centerX,
        this.centerY,
        8,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * (270 + end))
      this.ctx.lineWidth = 2
      this.ctx.lineJoin = 'round'
      this.ctx.strokeStyle = '#DB1F26'
      this.ctx.stroke()
    }

    const step = () => {
      this.raf = requestAnimationFrame(step)
      now = Date.now()
      delta = now - then

      if (delta > interval) {
        then = now - (delta % interval)
        counter++
        clear()
        drawDot()
        drawProgress(counter * interval)
    }

    step()
  }

  destroy () {
    cancelAnimationFrame(this.raf)
    this.canvas.remove()
  }
}

export default BulletProgress
