<template>
	<main-masterpage>
		<motorcycle-details/>
	</main-masterpage>
</template>

<script>
import MainMasterpage from '../masterpages/MainMasterpage.vue';
import MotorcycleDetails from '@/components/MotorcyclesGuide/MotorcycleDetails.vue';

	export default {
		name: 'DetailsView',
		components: {
			MainMasterpage, MotorcycleDetails
		},
	}
</script>

<style lang="scss" scoped>

</style>