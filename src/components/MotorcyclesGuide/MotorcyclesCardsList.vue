<template>
	<div class="card-container">
		<div v-if="showNothingFound" class="nothingFound">
			{{ $t('list.nothingFound') }}
		</div>
		
		<card-component
			v-for="moto in displayedCards"
			:key="moto.id"
			:motorcycle="moto"
			@go-to-reviews="handleGoToReviews"
			@go-to-details="handleGoToDetails"
		>
			<template v-if="getUser" #additionalButton="{bikeId}">
				<button @click="onToggleIsFavorite(bikeId)">
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
			currentPage: null,
			itemsPerPage: 8,
			pagesShown: 8
		}
	},

	computed: {
		...mapGetters('moto', ['getMotorcyclesList', 'getFilteredList']),
		...mapGetters('auth', ['getUser']),
		...mapGetters('favorites', ['getFavoriteList']),

		showNothingFound() {
			return !this.getFilteredList.length;
		},
		totalItems() {
			return this.getFilteredList.length;
		},
		displayedCards(){
			const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			return this.getFilteredList.slice(startIndex, endIndex); 
		},
		myUserId() {
			return this.getUser?.uid
		}
	},
	
	async created() {
		await this.loadReviewsList();
		this.currentPage = this.$route.query.page || 1;
	},
	mounted() {
		window.addEventListener('resize', this.handleWindowResize);
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	},
	
	methods: {
		...mapActions('favorites', ['setFavoriteList', 'toggleIsFavorite']),
		...mapActions('users', ['loadUserFavoriteBikes', 'updateUserFavoriteBikes']),
		...mapActions('reviews', ['loadReviewsList']),

		handlePageChange(page) {
			this.currentPage = page;
			this.$router.push({ 
				name: 'guide',
				query: { page: page }
			});
		},
		handleGoToDetails(motorcycleId) {
			this.$router.push({
				name: 'bike-details',
				params: {
					bikeId: motorcycleId
				},
				query: { page: this.currentPage }
			})
		},
		handleGoToReviews(motorcycleId) {
			this.$router.push({
				name: 'bike-reviews',
				params: {
					bikeId: motorcycleId
				},
				query: { page: this.currentPage }
			})
		},
		isAdded(bikeId){
			return this.getFavoriteList.some(id => id == bikeId);
		},
		onToggleIsFavorite(bikeId){
			this.toggleIsFavorite({
				userId: this.myUserId,
				bikeId: parseInt(bikeId)
			})
		},
		handleWindowResize() {
			this.itemsPerPage = window.innerWidth < 768 ? 6 : 8;
			this.pagesShown = window.innerWidth < 768 ? 4 : 8;
		},
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

.material-symbols-outlined{
	position: relative;
	transition: all .4s ease;
	font-size: 1.75rem;
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