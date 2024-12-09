import DefaultValues from "./_default.js"

export default class Progress {
	constructor(listValue) {
		if (!this.listValue) {
			this.listValue = listValue
		}
	}
	set (newListValue) {
		this.listValue = newListValue || DefaultValues()
		localStorage.setItem('progress', JSON.stringify(this.listValue))
		this.listValue = newListValue
		return this.listValue
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	get () {
		return JSON.parse(localStorage.getItem('progress'))
	}
	update(newListValue) {
		let listValue = this.get()

		if (listValue === undefined) {
			if (newListValue !== undefined) {
				listValue = newListValue
			}
			else {
				listValue = DefaultValues()
			}
		}
		this.set(listValue)

		return this.listValue
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	reset () {
		localStorage.removeItem('currentWeek')
		localStorage.removeItem('progress')
		this.set()
		return this.listValue
	}
}
//
// export function startProgress (list) {
// 	return new Progress(list)
// }
// export function resetProgress(list) {
// 	let progress = startProgress(list)
// 	return progress.reset()
// }
// export function getProgress(list) {
// 	let progress = startProgress(list)
// 	return progress.get()
// }
// export function setProgress(list) {
// 	let progress = startProgress(list)
// 	return progress.set()
// }
// export function updateProgress(list, i, lis) {
// 	let progress = startProgress(list)
// 	return progress.update(i)
// }
