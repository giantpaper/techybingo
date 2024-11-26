export default function DefaultValues () {
	let l = []
	let i = 0
	let items = [
		`Joked about how long your "commute" is`,
		`Used an emoji in an email`,
		`Said "lol" and meant it`,
		`Call interrupted by pet or family member`,
		`Took a coffee break (or 2...or...3)`,
		`Client is a no-show for a call`,
		`Sent a gif to coworker(s)`,
		`Created a workday playlist`,
		`Did household chores on your lunchbreak`,
		`Said or heard "Sorry, I was on mute"`,
		`Said or heard "Can everyone see my screen?"`,
		`Internet is having issues so you book it to a coffee shop`,
		`Get asked to help with household chores during work`,
		`Forgot to attach a file to an email`,
		`Sudden power outage`,
		`Used the pomodoro technique`,
		`Said or heard "It's Fri-yay!"`,
		`Said or heard "Does this need a quote?"`,
		`You/Someone forgets what day it is.`,
		`Forgot to update your Slack status from 'away' to 'active' after lunch`,
		`Needed to restart after computer glitches/crashes`,
		`Got up to refill your waterbottle`,
		`Sent a meme to coworker(s)`
	]

	items.splice(12, 0, `Free Space`)

	items.forEach(item => {
		let newItem = { id: i++, label: item, checked: item === `Free Space` ? true : false, }
		l.push(newItem)
	})

	return l
}
