<template>
	<ul class="table">
		<li v-for="(item, i) in list" :class="bingo.classes(i)" :ref="li => (liList[i] = li)">
			<div class="free-space checked" v-if="i===12">
				Free Space
			</div>
			<label v-else :class="{ checked: item.checked, }">
				<input type="checkbox" v-model="item.checked" @click="ifWin(list, liList, i)" />
				{{ item.label }}
			</label>
		</li>
	</ul>
</template>
<style lang="scss" scoped>
	.table {
		border-top: 2px var(--color-text) solid;
		border-left: 2px var(--color-text) solid;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin: 0 auto;
		width: 100%;
		max-width: 700px;
		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
	}
	li {
		border-right: 2px var(--color-text) solid;
		border-bottom: 2px var(--color-text) solid;
		&.bingo {
			background: #a20046;
			.checked {
				color: white;
			}
		}
	}
	.free-space,
	label {
		aspect-ratio: 1/1;
		display: flex;
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
</style>
<script setup>
import { ref } from "vue"
import DefaultValues from "../assets/_default.js"
// import { updateProgress, getProgress, setProgress } from "../assets/_progress.js"
import Bingo from "../assets/_bingo.js"

const list = ref([]) // progress
const liList = ref({}) // list of <li>

const bingo = new Bingo(list.value)

list.value = bingo.list()

bingo.ifWin([], liList)

function ifWin(list, liList, i) {
	// Apparently this was running before the list = ref even had a chance to update
	setTimeout(() => {
		bingo.ifWin(list, liList, i)
		list.value = bingo.list()
	})
}


</script>
