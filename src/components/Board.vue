<template>
	<h1>Week of <span>{{ bingodate.month() + " "+ bingodate.week() }}</span></h1>
	<ul class="table">
		<li v-for="(item, i) in list" :class="bingo.classes(i)" :ref="li => (liList[i] = li)">
			<div class="free-space checked" v-if="item.label===`Free Space`">
				FREE SPACE
			</div>
			<label v-else :class="{ checked: item.checked, }">
				<input type="checkbox" v-model="item.checked" @click="ifWin(list, i, 'clicked')" v-if="disabled===false" />
				<span v-html="item.label"></span>
			</label>
		</li>
	</ul>
	<WinCond />
	<Info />
</template>
<style lang="scss" scoped>
	.table {
		border-top: 2px var(--color-text) solid;
		border-left: 2px var(--color-text) solid;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin: 0 auto;
		width: 100%;
		max-width: 710px;
		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
		li {
			border-right: 2px var(--color-text) solid;
			border-bottom: 2px var(--color-text) solid;
			transition: background 0.2s;
			&.bingo {
				background: var(--background-win);
				.checked {
					color: white;
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
		cursor: pointer;
	}
	.free-space {
		background: rgba(0,0,0,0.125) !important;
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

const list = ref([]) // progress
const liList = ref([])
const disabled = ref(false)

const bingo = new Bingo(list.value)
const bingodate = new BingoDate()

list.value = bingo.list()

ifWin(list.value)

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
		if (bingo.win === true) {
			// Disable board if bingo is reached
			document.querySelectorAll(`.table > li`).forEach(li => {
				disabled.value = true
				li.parentNode.classList.add('disabled')
			})
		}
	})
}


</script>
