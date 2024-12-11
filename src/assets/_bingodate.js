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
	week() {
		let sunday = this.date.getDate() - this.date.getDay()
		let saturday = sunday + 6
		return `${sunday} - ${saturday}`
	}
	weekNumber() {
		// https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
		const currentDate =
				(typeof date === 'object') ? date : new Date();
		const januaryFirst =
				new Date(currentDate.getFullYear(), 0, 1);
		const daysToNextMonday =
				(januaryFirst.getDay() === 1) ? 0 :
				(7 - januaryFirst.getDay()) % 7;
		const nextMonday =
				new Date(currentDate.getFullYear(), 0,
				januaryFirst.getDate() + daysToNextMonday);

		return (currentDate < nextMonday) ? 52 :
		(currentDate > nextMonday ? Math.ceil(
		(currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
	}
}
