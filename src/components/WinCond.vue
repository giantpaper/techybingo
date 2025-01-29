<template>

	<section class="win_cond flex flex-wrap gap-4 max-w-full justify-between">
		<h2>Win Conditions:</h2>
		<figure>
			<img src="@/assets/win_row.svg" width="75" height="75" alt="" class="win_row" />
			<figcaption>Any row</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_col.svg" width="75" height="75" alt="" class="win_col" />
			<figcaption>Any column</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_diag.svg" width="75" height="75" alt="" class="win_diag" />
			<figcaption>Any diagonal</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_fourcorners.svg" width="75" height="75" alt="" class="win_fourcorners" />
			<figcaption>Four Corners</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_outeredge.svg" width="75" height="75" alt="" class="win_outeredge" />
			<figcaption>Outer Edge</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_blackout.svg" width="75" height="75" alt="" class="win_blackout" />
			<figcaption>Blackout</figcaption>
		</figure>
	</section>
</template>
<style lang="scss" scoped>
	.win_cond {
		width: 105ch;
		background: var(--ts-color-lightgray);
		padding: calc(var(--ts-spacing-y) * 0.5) calc(var(--ts-spacing-x) * 0.5);
		@media (min-width: 768px) {
			padding: var(--ts-spacing-y) var(--ts-spacing-x);
		}
		figure {
			width: calc( (100% / 3) - 1rem );
			@media (min-width: 768px) {
				width: calc( (100% / 6) - 2rem );
			}
		}
		img {
			margin: 0 auto;
			display: block;
			width: 100%;
			aspect-ratio: 1/1;
			height: auto;
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
			margin-top: 0.25rem;
			display: block;
			text-align: center;
		}
	}
</style>
