import { range } from 'mathjs'
import { ref } from 'vue'

import Progress from "./_progress.js"

const arraySum = (arr) => {
	return arr.reduce((total, current) => {
		return total + current;
	}, 0);
}

export default class Bingo {
	constructor(cardsValue) {
		this.cardsValue = cardsValue
		this.win = false
		this.rows = [
			range(0, 5), // range(startIndex, lengthOfArray)
			range(5, 10),
			range(10, 15),
			range(15, 20),
			range(20, 25),
		]
		this.cols = [
			range(0, 21, 5), // range(startIndex, lengthOfArray, step)
			range(1, 22, 5),
			range(2, 23, 5),
			range(3, 24, 5),
			range(4, 25, 5),
		]
		this.diag = [
			range(0, 25, 6),
			range(4, 21, 4),
		]
		this.keys = {
			row: [
				'row1',
				'row2',
				'row3',
				'row4',
				'row5',
			],
			col: [
				'col1',
				'col2',
				'col3',
				'col4',
				'col5',
			],
			diag: [
				'diag1',
				'diag2',
			],
		}
		this.progress = new Progress(cardsValue)
		this.listValue = this.progress.update(this.progress.get())
	}
	winCond(keyword) {
		return this[keyword][0]._data
	}
	list() {
		return this.listValue
	}
	classes(i) {
		let classes = []
		// check rows
		range(0,5)._data.forEach(j => {
			if (this.rows[j]._data.indexOf(i) > -1) {
				classes.push(`row${j+1}`)
			}
		})
		// check columns
		range(0,5)._data.forEach(j => {
			if (this.cols[j]._data.indexOf(i) > -1) {
				classes.push(`col${j+1}`)
			}
		})
		// check diagonals
		range(0,2)._data.forEach(j => {
			if (this.diag[j]._data.indexOf(i) > -1) {
				classes.push(`diag${j+1}`)
			}
		})

		return classes.join(' ')
	}
	#check (rol, singular, h) {
		let sum = []
		rol._data.forEach(i => {
			// add up all crossed out items
			let card = this.listValue[i]
			sum.push(card.checked ? 1 : 0)
		})
		if ( arraySum(sum) > 4 ) {
			let classname = `${singular}${h+1}`
			setTimeout(() => {
				// Wait for dom to load
				document.querySelectorAll(`.${classname}`).forEach(cell => {
					cell.classList.add('bingo')
				})
			})
			this.win = true
		}
	}
	check(singular, plural, item) {
		// rol = row + col
		this[plural].forEach((rol, h) => {
			// check each cell
			if ( (item !== null && rol._data.indexOf(item.id) > -1) ||  item === null) {
				// was the clicked card in one of these cells?
				this.#check (rol, singular, h)
			}
		})
	}
	ifWin(listValue, i, event) {
		if (event === 'clicked') {
			this.listValue = this.progress.update(listValue)
		}
		// check each row
		this.check('row', 'rows', listValue[i] || null)
		this.check('col', 'cols', listValue[i] || null)
		this.check('diag', 'diag', listValue[i] || null)

		return this.win
	}
}
