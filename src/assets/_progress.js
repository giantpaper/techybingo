import DefaultValues from "./_default.js"

export default class Progress {
	constructor(listValue) {
		this.listValue = listValue

		this.update(listValue)
	}
	set (newList) {
		let listValue = newList || DefaultValues()
		// Apparently this was running before the list = ref even had a chance to update
		localStorage.setItem('progress', JSON.stringify(listValue))

		this.listValue = listValue
		return listValue
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	update (num, newListValue, lis) {
		if (newListValue !== undefined) {
			setTimeout(() => {
				this.set(newListValue || this.listValue)
			})
		}
		return this.listValue
	}
	get () {
		return localStorage.getItem('progress')
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
