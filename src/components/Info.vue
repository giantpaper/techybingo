<template>
	<section id="info">
		<button id="infoBtn" aria-label="Info" @click="toggleInfo('#info')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Pro 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M56 72a40 40 0 1 1 80 0A40 40 0 1 1 56 72zM16 200c0-13.3 10.7-24 24-24l56 0c13.3 0 24 10.7 24 24l0 264 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-240-32 0c-13.3 0-24-10.7-24-24z"/></svg></button>
		<div id="info_content">
			<h2>How to Play</h2>

			<ol>
				<li>Check off squares that apply throughout your week. Ex. If either Gmail, Helpscout, Github, etc go down, check off <em>Helpscout/<wbr>Github/<wbr>Shopify/<wbr>Cloudflare/<wbr>Gmail is down</em></li>
				<li>Once you've filled up any row, and column, any diagonal (see Win Conditions) with checked items, you've got BINGO.</li>
			</ol>

			<h2>FAQs</h2>

			<h3>FYI...</h3>

			<ul>
				<li><strong>Is "Are you available for a call?" or "Please call me" the same as <em>Client said "can we get on a call?"</em></strong>—Yes it is! Phrases don't need to be exact.</li>
				<li><strong>How often is progress reset?</strong>—Every Sunday 12:00am your local time. This means all squares will be randomized, checked off squares with be unchecked, and bingo status reset.</li>
			</ul>

			<h3>The Technical Deets</h3>

			<ul>
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
			padding: var(--ts-spacing-x) var(--ts-spacing-y);
			overflow-y: auto;
			max-height: 100vh;
			li {
				margin-bottom: 1rem;
			}
		}
		&.open {
			width: 80%;
			max-width: 900px;
			#info_content {
				visibility: visible;
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
