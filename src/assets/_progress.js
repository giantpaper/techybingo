import DefaultValues from "./_default.js"
import BingoDate from './_bingodate.js'
import { onMounted } from 'vue'

export default class Progress {
	constructor (listValue) {
		if (!this.listValue) {
			this.listValue = listValue
		}
		this.date = new BingoDate

		// Check if a new week
		if (this.ifNewWeek() === true) {
			this.#reset()
		}

		// ONLY FOR DEBUGGING PURPOSES!!!
		// This resets everyone's bingo progress by clearing out the localStorage
		// --- Keep the conditional intact to make sure it doesn't run in production
		// --- Comment out when not in use
		// -------------------------------------------------------------------------
		// if (import.meta.env.VITE_MODE === 'development') { this.#reset() }
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
	// Needs to be private so it does not get used outside the Progress class
	// For outside classs use, use .update() instead
	// Or .#reset() if all progress needs to be cleared/gameboard needs to change
	#set (newListValue) {
		this.listValue = newListValue || DefaultValues()
		localStorage.setItem('progress', JSON.stringify(this.listValue))
		return this.listValue
	}
	get () {
		return JSON.parse(localStorage.getItem('progress'))
	}

	ifNewWeek (){
		if (parseInt(localStorage.getItem('currentWeek')) === this.date.weekNumber()) {
			return false
		}
		else {
			localStorage.setItem('currentWeek', this.date.weekNumber())
			return true
		}
	}
	update(newListValue) {
		// newListValue/this.listValue might be blank on page load, so grabbing the stored value from localStorage
		this.listValue = this.#set(newListValue.length > 0 ? newListValue : this.get())

		return this.listValue
	}
	#reset () {
		localStorage.removeItem('currentWeek')
		localStorage.removeItem('progress')
		// Automatically set the current week number after resetting
		localStorage.setItem('currentWeek', this.date.weekNumber())
		this.#set()
		return this.listValue
	}
}
