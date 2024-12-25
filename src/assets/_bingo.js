import { range } from 'mathjs'
import { ref } from 'vue'
import { arraySum } from './_functions.js'

import Progress from "./_progress.js"

export default class Bingo {
	constructor(cardsValue) {
		this.cardsValue = cardsValue
		this.win = false

		// All the win patterns
		// An array is created for each cell that needs to be checked
		this.patterns = {
			rows: [
				range(0, 5), // range(startIndex, lengthOfArray)
				range(5, 10),
				range(10, 15),
				range(15, 20),
				range(20, 25),
			],
			cols: [
				range(0, 21, 5), // range(startIndex, lengthOfArray, step)
				range(1, 22, 5),
				range(2, 23, 5),
				range(3, 24, 5),
				range(4, 25, 5),
			],
			diag: [
				range(0, 25, 6),
				range(4, 21, 4),
			],
			fourCorners: [
				[0, 4, 20, 24,]
			],
		}
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
			fourCorners: [
				'corners',
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
	// Check win
	ifWin(listValue, i, event) {
		if (event === 'clicked') {
			this.listValue = this.progress.update(listValue)
		}
		Object.keys(this.patterns).forEach(key => {
			this.patterns[key].forEach(line => {
				let tally = {}
				let array = []
				if (line._data !== undefined) {
					array = line._data
				}
				else {
					array = line
				}
				// console.log(array)
				array.forEach(sqr => {
					// Add ALL square stats to the tally list
					tally[sqr] = listValue[sqr].checked
				})
				// Check if all required squares were checked
				if (Object.values(tally).find(v => v === false) !== false ) {
					// If so then BINGO

					Object.keys(tally).forEach(sqr => {
						document.querySelectorAll('.board > li')[sqr].classList.add('bingo')
					})
				}
			})
		})

		return this.win
	}
}
