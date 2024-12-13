<template>
	
	<section class="win_cond">
		<h2>Win Conditions:</h2>
		<figure>
			<canvas width="75" height="75" class="win_row"></canvas>
			<figcaption>Any row</figcaption>
		</figure>
		<figure>
			<canvas width="75" height="75" class="win_col"></canvas>
			<figcaption>Any column</figcaption>
		</figure>
		<figure>
			<canvas width="75" height="75" class="win_diag"></canvas>
			<figcaption>Any diagonal</figcaption>
		</figure>
	</section>
</template>
<style lang="scss" scoped>
	.win_cond {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		h2 {
			width: 100%;
			text-align: center;
		}
		figure {
			width: calc( (100% / 3) - 2rem );
		}
		canvas {
			margin: 0 auto;
			display: block;
			aspect-ratio: 1/1;
			object-fit: contain;
		}
		li {
			list-style: none;
			margin: 0;
			background: #eee;
			width: 100%;
			aspect-ratio: 1/1;
			&.win {
				background: var(--background-win);
			}
		}
		figcaption {
			display: block;
			text-align: center;
		}
	}
</style>
<script setup>
	import { onMounted } from 'vue'
	import { range } from 'mathjs'
	import Canvas from '../assets/_canvas.js'
	
	onMounted(() => {
		document.querySelectorAll('canvas').forEach((canvas, i) => {
			let c = new Canvas(canvas)
			let j = 0
	
			range(0,5).forEach(exampleRow => {
				range(0,5).forEach(exampleCol => {
					let classname = null
					let isDiagonal = [4, 8, 12, 16, 20]
					if ((exampleRow === 0 && i === 0) || (exampleCol === 0 && i === 1) || (isDiagonal.indexOf(j) > -1 && i === 2)) {
						classname = 'win'
					}
					c.rect(exampleCol, exampleRow, classname)
					j++
				})
			})
		})
	})
</script>