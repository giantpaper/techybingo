export default class Progress {
	constructor(list) {
		this.list = list
	}
	set (newList) {
		let list = newList || this.list
		// Apparently this was running before the list = ref even had a chance to update
		localStorage.setItem('progress', JSON.stringify(list))
		// localStorage.setItem('currentWeek', datetime.getWeekNumber())
	}
	update (num, newList, lis) {
		let list = newList || this.list
		if (this.list !== undefined) {
			setTimeout(() => {
				this.set()
			})
		}
	}
	get () {
		return localStorage.getItem('progress')
	}
	reset () {
		localStorage.removeItem('currentWeek')
		localStorage.removeItem('progress')
		this.list.value = DefaultValues()
		return this.list
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
