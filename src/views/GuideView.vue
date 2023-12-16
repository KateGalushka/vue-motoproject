<template>
	<div>
		<main-masterpage>
			<motorcycles-guide/>
		</main-masterpage>
	</div>
</template>

<script>
import MainMasterpage from '../masterpages/MainMasterpage.vue'
import MotorcyclesGuide from '../components/MotorcyclesGuide'

	export default {
		
		components: {
			MainMasterpage, MotorcyclesGuide,
		},
		
	}
</script>

<style lang="scss" scoped>

</style>