import { checkWeek, shuffle } from "./_functions.js"
import { ref } from 'vue'
import Progress from "./_progress.js"

import BingoDate from './_bingodate.js'

let bingodate = new BingoDate()

const version = `v2`

let prevObj = bingodate.prevSunday()
let thisObj = bingodate.thisSunday()
let nextObj = bingodate.nextSunday()

const boards = {
	prevWeeks: [prevObj.getFullYear(), prevObj.getMonth() + 1, prevObj.getDate()],
	thisWeeks: [thisObj.getFullYear(), thisObj.getMonth() + 1, thisObj.getDate()],
	nextWeeks: [nextObj.getFullYear(), nextObj.getMonth() + 1, nextObj.getDate()],
	currentMonth: (bingodate.date.getMonth() + 1).toString(),
	currentSunday: (bingodate.sunday()).toString(),
}

function formatFileName(array) {
	array = array.map(v => {
		return v.toString()
	})
	return array.join('')
}

const squares = await fetch(`./ready/${formatFileName(boards.thisWeeks)}.txt`)
		.then(response => response.text())
		.then(data => data.replace(/\n$/, '').split("\n"))

		// .replace() -- removes blank space from EOF
		// .split() -- turn into array

export default function DefaultValues () {
	let l = []
	let i = 0

	// Randomize dat array
	shuffle(squares)

	// Add obligatory free space if not added already
	if (squares.indexOf(`Free Space`) < 0) {
		squares.splice(12, 0, `Free Space`)
	}

	squares.forEach(square => {
		// Ignore blank lines
		if (square !== '') {
			// Make sure free space is always checked
			let newItem = {
				id: i++,
				label: square,
				checked: square === `Free Space` ? true : false,
				bingo: false,
			}
			l.push(newItem)
		}
	})

	// chop off the extras so there's only 25 squares and return everything
	return l.slice(0, 25)
}
