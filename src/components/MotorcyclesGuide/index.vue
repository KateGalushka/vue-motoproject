<template>
	<div>
		<!-- <router-view/> -->
		<motorcycles-filters/>
		<motorcycles-cards-list/>
	</div>
</template>

<script>

	import { mapActions } from 'vuex';
	import { moto } from '../../store/data/moto';
	import MotorcyclesFilters from './MotorcyclesFilters.vue';
	import MotorcyclesCardsList from './MotorcyclesCardsList.vue'

	export default {
		name: 'MotorcyclesGuide',

		components: {
			MotorcyclesFilters, MotorcyclesCardsList
		},

		created() {
				this.loadMotorcyclesList(moto);
		},
		methods: {
			...mapActions('moto', ['loadMotorcyclesList']),
		},
	}
</script>

<style lang="scss" scoped>

</style>