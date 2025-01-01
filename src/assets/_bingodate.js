export default class BingoDate {
	constructor () {
		this.currentDate = new Date()

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
		return this.lists.month[this.currentDate.getMonth()]
	}
	day() {
		return this.currentDate.getDate()
	}
	sunday() {
		return this.currentDate.getDate() - this.currentDate.getDay()
	}
	saturday() {
		return this.sunday() + 6
	}
	week() {
		let sunday = this.sunday()
		let sundayMonth = this.thisSunday().getMonth()
		let saturday = this.saturday()
		let saturdayMonthWord = ''
		let sundayMonthWord = this.lists.month[ sundayMonth ]

		// Check if Sunday's month and Saturday's month are the same
		if (sundayMonth !== this.currentDate.getMonth() ) {
			// If not, the Sunday date ends up being a negative number
			// This fixes that
			sunday = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.sunday()).getDate()
			// Get the month for Saturday
			let saturdayMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), saturday).getMonth()
			saturdayMonthWord = this.lists.month[ saturdayMonth ]
		}
		// If they're the same, `saturdayMonthWord` is blank
		return `${sundayMonthWord} ${sunday} - ${saturdayMonthWord} ${saturday}`
	}
	thisSunday() {
		return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.sunday() )
	}
	prevSunday() {
		return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.sunday() - 7)
	}
	nextSunday() {
		return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.sunday() + 7)
	}
	weekNumber() {
		// Based off of
		// https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
		let today = this.currentDate
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
