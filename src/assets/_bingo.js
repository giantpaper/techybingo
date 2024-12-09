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
		this.listValue = this.progress.update()

		// ONLY FOR DEBUGGING PURPOSES!!!
		// This resets bingo progress by clearing out the localStorage
		// --- Keep the conditional intact to make sure it doesn't run in production
		// --- Comment out when not in use
		// if (import.meta.env.VITE_MODE === 'development') { this.progress.reset() }
	}
	list() {
		return this.listValue
	}
	classes(i) {
		let classes = []
		// check columns
		if (this.rows[0]._data.indexOf(i) > -1) {
			classes.push('row1')
		}
		else if (this.rows[1]._data.indexOf(i) > -1) {
			classes.push('row2')
		}
		else if (this.rows[2]._data.indexOf(i) > -1) {
			classes.push('row3')
		}
		else if (this.rows[3]._data.indexOf(i) > -1) {
			classes.push('row4')
		}
		else if (this.rows[4]._data.indexOf(i) > -1) {
			classes.push('row5')
		}
		// check columns
		if (this.cols[0]._data.indexOf(i) > -1) {
			classes.push('col1')
		}
		else if (this.cols[1]._data.indexOf(i) > -1) {
			classes.push('col2')
		}
		else if (this.cols[2]._data.indexOf(i) > -1) {
			classes.push('col3')
		}
		else if (this.cols[3]._data.indexOf(i) > -1) {
			classes.push('col4')
		}
		else if (this.cols[4]._data.indexOf(i) > -1) {
			classes.push('col5')
		}
		// check diagonals
		if (this.diag[0]._data.indexOf(i) > -1) {
			classes.push('diag1')
		}
		if (this.diag[1]._data.indexOf(i) > -1) {
			classes.push('diag2')
		}

		return classes.join(' ')
	}
	check(singular, plural, item, lis) {
		// rol = row + col
		this[plural].forEach((rol, h) => {
			// check each cell
			if (typeof item === 'object' && rol._data.indexOf(item.id) > -1) {
				// was the clicked card in one of these cells?
				let sum = []
				rol._data.forEach(i => {
					// add up all crossed out items
					let card = this.listValue[i]
					sum.push(card.checked ? 1 : 0)
				})
				if ( arraySum(sum) > 4 ) {
					let classname = `${singular}${h+1}`
					document.querySelectorAll(`.${classname}`).forEach(cell => {
						cell.classList.add('bingo')
					})
				}
			}
			else {
				let sum = []
				rol._data.forEach(i => {
					// add up all crossed out items
					let card = this.listValue[i]
					sum.push(card.checked ? 1 : 0)
				})
				if ( arraySum(sum) > 4 ) {
					let classname = `${singular}${h+1}`
					document.querySelectorAll(`.${classname}`).forEach(cell => {
						cell.classList.add('bingo')
					})
				}
			}
		})
	}
	ifWin(listValue, liList, i, update) {
		if (update === true) {
			this.listValue = this.progress.update(listValue)
		}
		// check each row
		this.check('row', 'rows', listValue[i], liList)
		this.check('col', 'cols', listValue[i], liList)
		this.check('diag', 'diag', listValue[i], liList)
	}
}
