<template>
	<v-rating
		hover
		:length="5"
		:size="size"
		:model-value="rating"
		active-color="rgb(0, 190, 216)"
		ripple
	/>
</template>

<script>
	export default {
		name: "StarRatingComponent",
		props: {
			size: {
				type: Number,
				default: 32
			},
		},

		data() {
			return {
				rating: null
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>