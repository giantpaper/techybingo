import DefaultValues from "./_default.js"

export default class Progress {
	constructor (listValue) {
		if (!this.listValue) {
			this.listValue = listValue
		}
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
	// Needs to be private so it does not get used outside the Progress class
	// For outside classs use, use .update() instead
	// Or .reset() if all progress needs to be cleared/gameboard needs to change
	#set (newListValue) {
		this.listValue = newListValue || DefaultValues()
		localStorage.setItem('progress', JSON.stringify(this.listValue))
		return this.listValue
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	get () {
		return JSON.parse(localStorage.getItem('progress'))
	}
	update(newListValue) {
		// newListValue/this.listValue might be blank on page load, so grabbing the stored value from localStorage
		this.listValue = this.#set(newListValue.length > 0 ? newListValue : this.get())

		return this.listValue
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	reset () {
		localStorage.removeItem('currentWeek')
		localStorage.removeItem('progress')
		this.#set()
		return this.listValue
	}
}
