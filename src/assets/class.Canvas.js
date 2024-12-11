export default class Canvas {
	constructor (canvas) {
		this.c = canvas.getContext('2d')

		addEventListener('resize', () => {
			canvas.width = innerWidth
			canvas.height = innerHeight
		})
		this.canvas = canvas
		this.config = {
			bgColor: '#dddddd',
			bgColor__win: '#a20046',
			cols: 5,
			rows: 5,
			gap: 1,
			size: {},
		}

		this.config.size = {
			w: this.#getDimensions('rows'),
			h: this.#getDimensions('cols'),
		}
	}
	rect (x, y, win) {
		let c = this.c
		let d = this.config.size
		c.fillStyle = win ? this.config.bgColor__win : this.config.bgColor
		c.beginPath()
		c.rect(this.#getPositions(x), this.#getPositions(y), d.w, d.h)
		// c.rect((d.w * 0) + 1, 0, d.w, d.h)
		c.fill()
		this.c = c
		return c
	}
	#getPositions (coordinateTimes) {
		return (coordinateTimes * this.config.size.w) + coordinateTimes
	}
	#getDimensions (keyword) {
		let containerWidth = this.canvas.width,
				num = this.config[keyword],
				gap = this.config.gap
		// It works, but dunno why
		// https://www.youtube.com/watch?v=oDrMoFCtE-c
		return (containerWidth / num) - gap
	}
}
