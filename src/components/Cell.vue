<template>
	<label class="cell" v-html="text">
	</label>
</template>
<style lang="scss" scoped>

</style>
<script setup>
	defineProps({
		text: {
			type: String,
			required: true,
		},
	})
</script>
