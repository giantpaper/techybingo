<template>
	<main>
		<Table />
	</main>
</template>
<style lang="scss" scoped>
	main {
		padding: 1rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: center;
		align-items: center;
	}
</style>
<script setup>
	import Table from "./components/Table.vue"
</script>
