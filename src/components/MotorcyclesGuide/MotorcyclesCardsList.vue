<template>
	<div class="card-container">
		<card-component 
			v-for="moto in motorcyclesListToShow"
			:key="moto.id"
			:motorcycle="moto"
		/>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import CardComponent from './CardComponent.vue';

	export default {
		name: 'MotorcyclesCardsList',
		components: {
			CardComponent,
		},
		
		computed: {
			...mapGetters(['getMotorcyclesList', 'getFilteredList']),
			
			motorcyclesListToShow(){
				return this.getFilteredList.length? this.getFilteredList : this.getMotorcyclesList
			}
		},
	}
</script>

<style lang="scss" scoped>
.card-container{
	display: flex;
	flex-wrap: wrap;
	gap:1.25rem;
	margin: 0 auto;
	padding: 1rem 0;
	justify-content: center;
	position: relative;
	
	&::after{
		content:'';
		position: absolute;
		z-index: -1;
		inset: 0;
		background-image: var(--bg-img);
		background-size: contain;
		background-repeat: repeat;
		background-attachment: fixed;
		opacity: .3;
	}
}

</style>