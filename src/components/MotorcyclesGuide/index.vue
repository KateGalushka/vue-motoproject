<template>
	<div>
		<motorcycles-filters/>
		<motorcycles-cards-list/>
	</div>
</template>

<script>
	import MotorcyclesFilters from './MotorcyclesFilters.vue';
	import MotorcyclesCardsList from './MotorcyclesCardsList.vue'

	export default {
		name: 'MotorcyclesGuide',

		components: {
			MotorcyclesFilters, MotorcyclesCardsList
		},

	}
</script>

<style lang="scss" scoped>

</style>