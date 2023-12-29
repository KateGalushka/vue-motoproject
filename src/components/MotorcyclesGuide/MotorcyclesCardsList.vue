<template>
	<div class="card-container">
		<div v-if="showNothingFound" class="nothingFound">
			{{ $t('list.nothingFound') }}
		</div>
		
		<card-component
			v-for="moto in displayedCards"
			:key="moto.id"
			:motorcycle="moto"
		>
			<template #additionalButton="{bikeId}">
				<button @click="toggleIsFavorite(bikeId)">
					<span 
						class="material-symbols-outlined tooltip" 
						:class="{addedToFavorites: isAdded(bikeId)}" 
						:data-tooltip="$t('card.tooltip1')">
						favorite
					</span>
				</button>
			</template>
		</card-component>
	</div>
		<pagination-component
			v-model="currentPage"
			:total-items="totalItems"
			:items-per-page="itemsPerPage"
			:max-pages-shown="pagesShown"
			@page-clicked="handlePageChange"
		/> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardComponent from './CardComponent.vue';
import PaginationComponent from '../PaginationComponent.vue';

export default {
	name: 'MotorcyclesCardsList',
	components: {
		CardComponent, PaginationComponent
	},
	data() {
		return {
			currentPage: 1,
			itemsPerPage: 8,
		}
	},

	computed: {
		...mapGetters('moto', ['getMotorcyclesList', 'getFilteredList', ]),
		...mapGetters('favorites', ['getFavoriteList']),

		showNothingFound() {
			return !this.getFilteredList.length;
		},
		totalItems() {
			return this.getFilteredList.length;
		},
		pagesShown(){
			return Math.ceil(this.getFilteredList.length / this.itemsPerPage) || 1;
		},
		displayedCards(){
			const startIndex = (this.currentPage * this.itemsPerPage) -this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			// console.log(this.getFilteredList.slice(startIndex, endIndex))
			return this.getFilteredList.slice(startIndex, endIndex); 
		},
		
	},
	async created() {
		await this.fetchImagesUrlsFromStorage();
	},

	methods: {
		...mapActions('favorites', ['toggleIsFavorite']),
		...mapActions('storage', ['fetchImagesUrlsFromStorage']),

		isAdded(bikeId){
			return this.getFavoriteList.some(id => id == bikeId);
		},
		handlePageChange(page) {
			this.currentPage = page;
		}
		
	},
}
</script>

<style lang="scss" scoped>
.card-container {
	&::after
	{
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background-image: var(--bg-img1);
		background-size: cover;
		background-repeat: repeat-y;
		background-attachment: fixed;
		opacity: .3;
	}
}

.nothingFound
{
	font-size: 1.5rem;
	min-width: 50%;
	background-color: var(--bg-color1);
	text-align: center;
	margin: 3em;
	padding: 2em;
	border-radius: 10px;
	place-self: start;
}
.material-symbols-outlined{
	position: relative;
	transition: all .4s ease;
	font-size: 1.75rem;
//   font-variation-settings: 'OPSZ' 32;
}

.addedToFavorites{
	font-variation-settings: 'FILL' 1;
	color: var(--main-color2);
}

@media (hover:hover){
	.tooltip:hover::after{
		content: attr(data-tooltip);
		position: absolute;
		top:-150%;
		left: -110%;
		font-size: 0.625rem;
		font-family: var(--font-first);
		display: block;
		padding: 0.5em;
		width: 9em;
		background-color: var(--main-color2);
		color: var(--bg-color1);
		border-radius: 5px;
		text-wrap: wrap;
	}
	.material-symbols-outlined{
		&:hover{
			font-variation-settings: 'FILL' 1, 'wght' 600;
			color: var(--main-color2);
  		}
	}
	
	

}




</style>