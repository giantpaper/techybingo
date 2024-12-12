import { checkWeek, shuffle } from "./_functions.js"
import { ref } from 'vue'
import Progress from "./_progress.js"

const squares = await fetch(`/src/squares.txt`)
		.then(response => response.text())
		.then(data => {
			return data.split("\n")
		})

const items = ref(squares)

// const items = ref([
// 	`Bikers at the Moose Lodge`,
// 	`Got up to refill your water`,
// 	`"axe me a high question"`,
// 	`Another fire on WatchDuty`,
// 	`Saw a spider`,
// 	`Cat battle outside`,
// 	`Sonic boom outside`,
// 	`Saw a raccoon`,
// 	`Healer in Marvel Rivals doesn't know how to heal`,
// 	`References The Good Place`,
// 	`Sudden power outage`,
// ])

export default function DefaultValues () {
	let l = []
	let i = 0

	// Randomize dat array
	shuffle(items.value)

	// Add obligatory free space
	items.value.splice(12, 0, `Free Space`)

	// chop off the extras so there's only 25 squares
	items.value = items.value.slice(0, 25)

	items.value.forEach(item => {
		// Fixes obscenely-long text not breaking
		item = item.replace(/\//g, "/<wbr>")
		// Make sure free space is always checked
		let newItem = { id: i++, label: item, checked: item === `Free Space` ? true : false, bingo: false, }
		l.push(newItem)
	})

	return l
}
