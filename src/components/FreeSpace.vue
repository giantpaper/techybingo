<template>
	<Cell text="Free Space" class="free-space" />
</template>
<style lang="scss" scoped>
	.free-space {
		color: var(--color-background);
		background: var(--color-text);
	}
</style>
<script setup>
	import Cell from './Cell.vue'
</script>