export default class BingoDate {
	constructor () {
		this.date = new Date()

		this.lists = {
			month: [
				`Jan.`,
				`Feb.`,
				`Mar.`,
				`Apr.`,
				`May`,
				`June`,
				`July`,
				`Aug.`,
				`Sept.`,
				`Oct.`,
				`Nov.`,
				`Dec.`,
			]
		}
	}
	month() {
		return this.lists.month[this.date.getMonth()]
	}
	day() {
		return this.date.getDate()
	}
	sunday() {
		return this.date.getDate() - this.date.getDay()
	}
	saturday() {
		return this.sunday() + 6
	}
	week() {
		let sunday = this.sunday()
		let saturday = this.saturday()
		return `${sunday} - ${saturday}`
	}
	weekNumber() {
		// Based off of
		// https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
		let today = this.date
		let januaryFirst = new Date(today.getFullYear(), 0, 1)

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
		// Just in case the week start needs to be some other day than Sunday
		let weekStart = 0
		let daysBeforeFirstWeekStart = januaryFirst.getDay() - weekStart
		let firstWeekStart = new Date(januaryFirst.getFullYear(), 0, (daysBeforeFirstWeekStart * -1) + 1)

		let today_unixEpoch = today.getTime()
		let firstWeekStart_unixEpoch = firstWeekStart.getTime()

		let millisecondsinAWeek = 1000 * 60 * 60 * 24 * 7

		return Math.floor( ((today_unixEpoch - firstWeekStart_unixEpoch) / millisecondsinAWeek) + 1)
	}
}
