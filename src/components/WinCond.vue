<template>

	<section class="win_cond">
		<h2>Win Conditions:</h2>
		<figure>
			<img src="@/assets/win_row.svg" width="100" height="100" alt="" class="win_row" />
			<figcaption>Any row</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_col.svg" width="100" height="100" alt="" class="win_col" />
			<figcaption>Any column</figcaption>
		</figure>
		<figure>
			<img src="@/assets/win_diag.svg" width="100" height="100" alt="" class="win_diag" />
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
		figure {
			width: calc( (100% / 3) - 2rem );
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
			display: block;
			text-align: center;
		}
	}
</style>