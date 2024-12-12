import DefaultValues from "./_default.js"
import BingoDate from './_bingodate.js'

export default class Progress {
	constructor (listValue) {
		if (!this.listValue) {
			this.listValue = listValue
		}
		this.date = new BingoDate

		// Check if a new week
		if (this.ifNewWeek() === true) {
			this.reset()
		}
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
	// Needs to be private so it does not get used outside the Progress class
	// For outside classs use, use .update() instead
	// Or .reset() if all progress needs to be cleared/gameboard needs to change
	#set (newListValue) {
		this.listValue = newListValue || DefaultValues()
		localStorage.setItem('progress', JSON.stringify(this.listValue))
		console.log(this.listValue)
		return this.listValue
	}
	get () {
		return JSON.parse(localStorage.getItem('progress'))
	}


	ifNewWeek (){
		console.log(localStorage.getItem('currentWeek'), this.date.weekNumber())
		if (parseInt(localStorage.getItem('currentWeek')) === this.date.weekNumber()) {
			return false
		}
		else {
			// If it made it this far, it's probably a new week, so updating....
			localStorage.setItem('currentWeek', this.date.weekNumber())
		}
		return true
	}
	update(newListValue) {
		// newListValue/this.listValue might be blank on page load, so grabbing the stored value from localStorage
		this.listValue = this.#set(newListValue.length > 0 ? newListValue : this.get())

		return this.listValue
	}
	reset () {
		localStorage.removeItem('currentWeek')
		localStorage.removeItem('progress')
		this.#set()
		return this.listValue
	}
}
