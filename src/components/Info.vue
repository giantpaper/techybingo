<template>
	<section id="info">
		<button id="infoBtn" aria-label="Info" @click="toggleInfo('#info')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Pro 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M56 72a40 40 0 1 1 80 0A40 40 0 1 1 56 72zM16 200c0-13.3 10.7-24 24-24l56 0c13.3 0 24 10.7 24 24l0 264 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-240-32 0c-13.3 0-24-10.7-24-24z"/></svg></button>
		<div id="info_content">
			<h2>How to Play</h2>
	
			<ol>
				<li>Check off squares that apply throughout your week. Ex. If either Gmail, Helpscout, Github, etc go down, check off <em>Helpscout/<wbr>Github/<wbr>Shopify/<wbr>Cloudflare/<wbr>Gmail is down</em></li>
				<li>Check off any row, any column or any diagonal and you've got BINGO (see Win Conditions diagrams).</li>
			</ol>
	
			<h2>FYI...</h2>
	
			<ul>
				<li>Phrases do not have to be exact! "Are you available for a call?", "Please call me", etc is the same as <em>Client said "can we get on a call?"</em></li>
				<li>Progress resets every Sunday 12:00am your local time. This means all squares will be randomized, checked off squares with be unchecked, and bingo status reset.</li>
			</ul>
			
			<h2>The Technical Deets</h2>
			
			<ul>
				<li>Progress (squares checked, bingo status, square positions) are all stored via the browser's local storage. So progress won't carry over to other devices.</li>
				<li>It's best played on a large display (like a desktop computer, laptop, giant tablet, etc).</li>
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
			padding: 3rem 5rem;
			visibility: hidden;
			font-size: 1.0625rem;
			li {
				margin-bottom: 1rem;
			}
			ol {
	
			}
		}
		&.open {
			width: 80%;
			#info_content {
				visibility: visible;
			}
		}
	}
</style>
<script setup>
	function toggleInfo(id) {
		document.querySelector(id).classList.toggle('open')
	}
</script>