<template>
	<ul class="table">
		<li v-for="(item, i) in list">
			<div class="free-space checked" v-if="item.label === `Free Space`">
				Free Space
			</div>
			<label v-else :class="{ checked: item.checked }">
				<input type="checkbox" v-model="item.checked" @click="updateProgress(list)" />
				{{ item.label }}
			</label>
		</li>
	</ul>
	<button v-if="MODE==='development'" @click="resetProgress">Reset</button>
</template>
<style lang="scss" scoped>
	.table {
		border-top: 2px var(--color-text) solid;
		border-left: 2px var(--color-text) solid;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin: 0 auto;
		width: 100%;
		max-width: 675px;
		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
	}
	li {
		border-right: 2px var(--color-text) solid;
		border-bottom: 2px var(--color-text) solid;
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
			background: #fdfdfd;
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
		background: #ededed !important;
	}
	button {
		padding: 1rem 2rem;
		border: 2px var(--color-text) solid;
		background: #fff;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.302);
		&:hover {
			transform: translate(-2px, -2px);
			box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.302);
		}
	}
</style>
<script setup>
import { ref } from "vue"
import DefaultValues from "../assets/_default.js"

const MODE = import.meta.env.VITE_MODE
const list = ref([])

const updateProgress = (list) => {
	if (list !== undefined) {
		setTimeout(() => {
			// Apparently this was running before the list = ref even had a chance to update
			localStorage.setItem('progress', JSON.stringify(list))
		})
	}
}
const getProgress = () => {
	return localStorage.getItem('progress')
}
const resetProgress = () => {
	localStorage.removeItem('progress')
	list.value = DefaultValues()
}

if (getProgress() === undefined || getProgress() === null) {
	list.value = DefaultValues()
	updateProgress(list.value)
}
else {
	list.value = JSON.parse( getProgress() )
}

</script>
