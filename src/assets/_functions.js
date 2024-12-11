export function weekNumber() {
	// https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
	const currentDate = new Date();
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

export function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
	return array
}

export function checkWeek() {
	return localStorage.getItem('currentWeek')
}