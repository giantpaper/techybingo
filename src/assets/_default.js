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
	currentMonth: (bingodate.currentDate.getMonth() + 1).toString(),
	currentSunday: (bingodate.sunday()).toString(),
}

function formatFileName(array) {
	array = array.map(v => {
		return v.toString()
	})
	let str = array.join('-')

	if (array[1].length < 2 || array[2].length < 2) {
		let regex = new RegExp('^([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})$')
		let replace = array[2].length < 2 ? "$1-0$2-0$3" : "$1-0$2-$3"
		return str.replace(regex, replace)
	}
	return str
}

const url = `./ready/${formatFileName(boards.thisWeeks)}.txt`

const response = await fetch(url)

const squares = await fetch(url)
		.then(response => response.text())
		.then(data => data.replace(/\n$/, '').split("\n"))
		.catch(err => console.error(err))

if (import.meta.env.VITE_MODE === 'development') {
	console.log(`FILE: ${url}`)
}

const MODE = import.meta.env.VITE_MODE

export default function DefaultValues () {
	let l = []
	let i = 0

	if (MODE === 'production' && response.status === 404 || (MODE === 'development' && squares.length !== 24 && squares[0].match(/^</))) {
		console.error(`RUH RUH: Cannot find ./ready/${formatFileName(boards.thisWeeks)}.txt`, squares)
		return false
	}

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
				disabled: false,
			}
			l.push(newItem)
		}
	})

	// chop off the extras so there's only 25 squares and return everything
	return l.slice(0, 25)
}
