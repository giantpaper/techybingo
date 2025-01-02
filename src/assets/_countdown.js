import BingoDate from './_bingodate.js'

export default class Countdown {
	get () {
		this.bingodate = new BingoDate()
		this.today = Date.now()
		this.nextSunday = this.bingodate.nextSunday().getTime()
		this.timeRemaining = this.nextSunday - this.today
		
		this.timers = {
			d: Math.floor(this.timeRemaining / (1000 * 60 * 60 * 24)),
			h: Math.floor((this.timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			m: Math.floor((this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
			s: Math.floor((this.timeRemaining % (1000 * 60)) / 1000),
		}
		
		return [
			this.numberCase('d'),
			this.numberCase('h'),
			this.numberCase('m'),
			this.numberCase('s'),
		].join(' ')
	}
	numberCase(keyword) {
		let inflections = {
			s: [
				'second',
				'seconds',
			],
			m: [
				'minute',
				'minutes',
			],
			h: [
				'hour',
				'hours',
			],
			d: [
				'day',
				'days',
			],
		}
		let inflection
		let value = this.timers[keyword]
		if (value === 1) {
			inflection = inflections[keyword][0]
		}
		else if (value === 0) {
			inflection = ''
			value = ''
		}
		else {
			inflection = inflections[keyword][1]
		}
		return `${value} ${inflection}`
	}
}


// const resetWhen = {
// 	today: Date.now(),
// 	nextSunday: bingodate.nextSunday().getTime(),
// 	timeRemaining: this.nextSunday - this.today,
// 
// 	countdowns: {
// 		days: Math.floor(this.timeRemaining / (1000 * 60 * 60 * 24)),
// 		hours: Math.floor((this.timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
// 		minutes: Math.floor((this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
// 		seconds: Math.floor((this.timeRemaining % (1000 * 60)) / 1000),
// 	},
// 	inflections: {
// 		s: [
// 			'second',
// 			'seconds',
// 		],
// 		m: [
// 			'minute',
// 			'minutes',
// 		],
// 		h: [
// 			'hour',
// 			'hours',
// 		],
// 		d: [
// 			'day',
// 			'days',
// 		],
// 	},
// 	// numberCase (keyword) {
// 	// 	let count =
// 	// }
// 
// 	// console.log(days, `${Math.floor(days)} days ${Math.floor(hours)} hours ${minutes} minutes`)
// }