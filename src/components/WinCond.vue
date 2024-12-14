<template>

	<section class="win_cond">
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
			<img src="@/assets/win_blackout.svg" width="75" height="75" alt="" class="win_diag" />
			<figcaption>Blackout</figcaption>
		</figure>
	</section>
</template>
<style lang="scss" scoped>
	.win_cond {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		width: 60ch;
		justify-content: space-between;
		figure {
			width: calc( (100% / 4) - 2rem );
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