<template>
	<section id="info">
		<button id="infoBtn" aria-label="Info" @click="toggleInfo('#info')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Pro 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M56 72a40 40 0 1 1 80 0A40 40 0 1 1 56 72zM16 200c0-13.3 10.7-24 24-24l56 0c13.3 0 24 10.7 24 24l0 264 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-240-32 0c-13.3 0-24-10.7-24-24z"/></svg></button>
		<div id="info_content">
			<h2>How to Play</h2>

			<ol>
				<li>Check off squares that apply throughout your week. Ex. If either Gmail, Helpscout, Github, etc go down, check off <em>Helpscout/<wbr>Github/<wbr>Shopify/<wbr>Cloudflare/<wbr>Gmail is down</em></li>
				<li>Once you've filled up any row, and column, any diagonal, etc (see Win Conditions) with checked items, you've got BINGO.</li>
			</ol>

			<h2>FAQs</h2>

			<h3>FYI...</h3>

			<ul class="faq">
				<li><strong>Is "Are you available for a call?" or "Please call me" the same as <em>Client said "can we get on a call?"</em></strong>—Yes it is! Phrases don't need to be exact.</li>
				<li><strong>How often is progress reset?</strong>—Every Sunday 12:00am your local time. This means all squares will be randomized, checked off squares with be unchecked, and bingo status reset.</li>
			</ul>

			<h3>The Technical Deets</h3>

			<ul class="tech_deets">
				<li><strong>How is progress saved?</strong>—Squares checked, bingo status, and square positions are all stored via the browser's local storage. So (for now) progress won't carry over to other browsers.</li>
			</ul>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	button#infoBtn {
		appearance: none;
		box-sizing: content-box;
		cursor: pointer;
		background: inherit;
		border: none;
		width: 0.75rem;
		padding: 0.75rem;
		aspect-ratio: 1/3;
		text-align: center;
		transform: translateY(-50%);
		position: absolute;
			top: 50vh;
			right: 100%;
		svg {
			fill: white;
			max-height: 100%;
			width: auto;
		}
	}
	h2 {
		margin-top: 2rem;
		padding-bottom: 0.5rem;
		padding-left: var(--ts-spacing-x);
		margin-left: calc(var(--ts-spacing-x) * -1);
	}
	#info {
		background: var(--vt-c-black);
		transition: width 0.3s;
		color: var(--vt-c-white);
		width: 0;
		will-change: width;
		min-height: 100vh;
		max-width: 100vh;
		z-index: 10;
		position: fixed;
			top: 0;
			right: 0;
			z-index: 10;

		#info_content {
			visibility: hidden;
			font-size: 1rem;
			line-height: 160%;
			overflow-y: auto;
			max-height: 100vh;
			padding: calc(var(--ts-spacing-x) * 0.5) calc(var(--ts-spacing-y) * 0.5);
			@media (min-width: 768px) {
				padding: var(--ts-spacing-x) var(--ts-spacing-y);
			}
			li {
				margin-bottom: 1rem;
			}
		}
		&.open {
			width: 90%;
			max-width: 900px;
			@media (min-width: 768px) {
				width: 80%;
			}
			#info_content {
				visibility: visible;
			}
		}
	}
	ol {
		list-style: none;
		counter-reset: i;
		li {
			counter-increment: i;
			&::before {
				content: counter(i);
				background: var(--color-background);
				display: flex;
				align-items: center;
				justify-content: center;
				color: var(--color-text);
				margin-left: -1.75rem;
				margin-right: 0.5rem;
				margin-top: 0.125rem;
				font-weight: 900;
				font-size: 0.65rem;
				text-align: center;
				width: 1.125rem;
				line-height: 1rem;
				aspect-ratio: 1/1;
				border-radius: 100%;
				float: left;
			}
		}
	}
	ul {
		&[class] {
			list-style: none;
			li {
				&:before {
					content: '';
					display: block;
					width: 1rem;
					aspect-ratio: 1/1;
					background: currentcolor;
					margin-left: -1.75rem;
					margin-top: 0.25rem;
					float: left;
				}
			}
		}
		&.faq {
			li {
				&:before {
					mask: url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3C!--!Font%20Awesome%20Pro%206.7.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license%20(Commercial%20License)%20Copyright%202025%20Fonticons,%20Inc.--%3E%3Cpath%20d=%22M256%20512A256%20256%200%201%200%20256%200a256%20256%200%201%200%200%20512zM168%20184c0-30.9%2025.1-56%2056-56l56.9%200c34.9%200%2063.1%2028.3%2063.1%2063.1c0%2022.6-12.1%2043.5-31.7%2054.8L280%20264.4l0%2023.6-48%200%200-24%200-13.5%200-13.9%2012.1-6.9%2044.3-25.4c4.7-2.7%207.6-7.7%207.6-13.1c0-8.4-6.8-15.1-15.1-15.1L224%20176c-4.4%200-8%203.6-8%208l0%206.5-48%200%200-6.5zm64%20184l0-48%2048%200%200%2048-48%200z%22/%3E%3C/svg%3E');
				}
			}
		}
		&.tech_deets {
			li {
				&:before {
					mask: url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3C!--!Font%20Awesome%20Pro%206.7.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license%20(Commercial%20License)%20Copyright%202025%20Fonticons,%20Inc.--%3E%3Cpath%20d=%22M200%200L312%200l17.2%2078.4c15.8%206.5%2030.6%2015.1%2044%2025.4l76.5-24.4%2056%2097-59.4%2054.1c1.1%208.3%201.7%2016.8%201.7%2025.4s-.6%2017.1-1.7%2025.4l59.4%2054.1-56%2097-76.5-24.4c-13.4%2010.3-28.2%2018.9-44%2025.4L312%20512l-112%200-17.2-78.4c-15.8-6.5-30.6-15.1-44-25.4L62.3%20432.5l-56-97%2059.4-54.1C64.6%20273.1%2064%20264.6%2064%20256s.6-17.1%201.7-25.4L6.3%20176.5l56-97%2076.5%2024.4c13.4-10.3%2028.2-18.9%2044-25.4L200%200zm56%20336a80%2080%200%201%200%200-160%2080%2080%200%201%200%200%20160z%22/%3E%3C/svg%3E');
				}
			}
		}
	}
</style>
<script setup>
	function toggleInfo(id) {
		document.querySelector(id).classList.toggle('open')
		document.querySelector('body').classList.toggle('menu_open')
	}
</script>
