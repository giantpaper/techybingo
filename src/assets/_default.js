import { checkWeek, shuffle } from "./_functions.js"
import { ref } from 'vue'
import Progress from "./_progress.js"

const squares = await fetch(`./squares.txt`)
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
