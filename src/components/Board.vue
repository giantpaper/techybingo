<template>
	<h1>Week of <span>{{ bingodate.month() + " "+ bingodate.week() }}</span></h1>
	<ul class="board">
		<li v-for="(item, i) in list" :class="bingo.classes(i)" :ref="li => (liList[i] = li)">
			<div class="free-space checked" v-if="item.label===`Free Space`">
				FREE SPACE
			</div>
			<label v-else :class="{ checked: item.checked, }">
				<input type="checkbox" v-model="item.checked" @click="ifWin(list, i, 'clicked')" v-if="disabled===false" />
				<span v-html="displayLabel(item.label)"></span>
			</label>
		</li>
	</ul>
	<WinCond />
	<Info />

	<Footer />
</template>
<style lang="scss" scoped>
	.board {
		border-top: 3px var(--color-border) solid;
		border-left: 3px var(--color-border) solid;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin: 0 auto;
		width: 105ch;
		aspect-ratio: 1/1;
		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
		li {
			border-right: 3px var(--color-border) solid;
			border-bottom: 3px var(--color-border) solid;
			transition: background 0.2s;
			&.bingo {
				.checked {
					color: white;
				}
				label {
					background: var(--background-win) !important;
					span em {
						color: var(--vt-c-white);
					}
				}
			}
		}
	}
	.free-space,
	label {
		aspect-ratio: 1/1;
		display: flex;
		font-size: calc(14rem / 16);
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 1rem;
		position: relative;
		font-weight: 800;
		&::before,
		&::after {
			width: 0;
			height: 0;
			background: var(--color-text);
			content: '';
			display: block;
			position: absolute;
			transform: rotate(45deg);
			z-index: 5;
			transition: width 0.15s, 0.1s height 0.15s;
		}
		&::after {
			transform: rotate(-45deg);
		}
		&.checked {
			&::before,
			&::after {
				width: 1px;
				height: 110%;
			}
		}
		input[type="checkbox"] {
			appearance: none;
		}
	}
	label {
		background: var(--background-box);
	}
	.free-space {
		background: rgba(0,0,0,0.0625) !important;
	}
	.bingo {
		background: var(--background-win);
		.free-space {
			span em {
				color: var(--vt-c-white);
			}
		}
	}
	.table.disabled label {
		cursor: default;
	}
</style>
<script setup>
import { ref } from "vue"
import DefaultValues from "../assets/_default.js"
// import { updateProgress, getProgress, setProgress } from "../assets/_progress.js"
import Bingo from "../assets/_bingo.js"
import BingoDate from "../assets/_bingodate.js"
import { range } from 'mathjs'

import Info from './Info.vue'
import WinCond from './WinCond.vue'
import Footer from './Footer.vue'

const list = ref([]) // progress
const liList = ref([])
const disabled = ref(false)

const bingo = new Bingo(list.value)
const bingodate = new BingoDate()

list.value = bingo.list()

ifWin(list.value)

function displayLabel (item) {
	let label = item.replace(/([^A-z\s0-9\$\#\^\@,\.\*\-→<>\?\!\/\s\n"'\(\)&;])/g, `<i>$1</i>`)

	label = label.replace(/"([^"]+)"/g, `“$1”`)
	label = label.replace(/'([^']+)'/g, `‘$1’`)
	label = label.replace(/'s/g, `‘s`)

	// Fixes obscenely-long text not breaking
	label = label.replace(/([^<])\/([^>])/g, "$1/<wbr>$2")

	// Makes arrows look sexier
	label = label.replace(/->/g, "→")

	return label
}

const date = new Date()

function getExampleWin(keyword, i) {
	return bingo.winCond(keyword).includes(i)
}
function ifWin(list, i, event) {
	// Apparently this was running before the list = ref even had a chance to update
	// For some reason, setTimeout() works and onMounted() doesn't. I dunno why
	setTimeout(() => {
		let win = bingo.ifWin(list, i, event)
		list.value = bingo.list()
	})
}


</script>
