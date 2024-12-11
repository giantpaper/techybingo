import { checkWeek, shuffle, weekNumber } from "./_functions.js"
import { ref } from 'vue'
import Progress from "./_progress.js"

const items = ref([
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
	`Sent a meme to coworker(s)`,
	`Client said "can we get on a call?"`,
	`Someone says 'good morning!' to everyone`,
	`Said or heard "Can you email that to everyone?" on a call`,
	`Said or heard "Hey guys, I have to jump on another call"`,
	`Said or heard "I think there's lag"`,
	`*sound of someone typing on a call...possibly with a hammer*`,
	`Said or heard "Can you email that to me?" on a call`,
	`You/Someone uses a custom background on a call`,
	`Helpscout/Github/Shopify/Cloudflare is down`,
])

export default function DefaultValues () {
	let l = []
	let i = 0

	let date = new BingoDate

	console.log(date.checkWeek())

	// Randomize dat array
	shuffle(items.value)

	// Add obligatory free space
	items.value.splice(12, 0, `Free Space`)

	// chop off the extras so there's only 25 squares
	items.value = items.value.slice(0, 25)

	items.value.forEach(item => {
		// Make sure free space is always checked
		let newItem = { id: i++, label: item, checked: item === `Free Space` ? true : false, bingo: false, }
		l.push(newItem)
	})

	return l
}
