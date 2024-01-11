<template>
	<main-masterpage>
		<div class="wrapper">
			<h1 class="favor-title">{{ $t('favorites.title') }}</h1>
		
			<div class="card-container">	
				<div v-if="isFavoriteListEmpty" class="nothingFound">
					{{ $t('favorites.nothing') }}
				</div>
				<template v-else>
					<card-component v-for="moto in getFavoriteListCompleted" :key="moto.id" :motorcycle="moto">
							<template #additionalButton="{ bikeId }">
								<button @click="removeBikeFromFavorites(bikeId)">
									<span class="material-symbols-outlined tooltip" :data-tooltip="$t('card.tooltip2')">
										heart_minus
									</span>
								</button>
							</template>
					</card-component>

				</template>

				<router-link :to="{ name: 'guide' }" class="button back">
					<font-awesome-icon :icon="['fas', 'backward-step']" style="margin-right: 0.5rem;"/>
					{{ $t('button.back') }}
				</router-link>
			</div>
		
		</div>
	</main-masterpage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MainMasterpage from '../masterpages/MainMasterpage.vue'
import CardComponent from '@/components/MotorcyclesGuide/CardComponent.vue';


export default {
	name: 'FavoriteListView',
	
	components: {
		MainMasterpage, CardComponent
	},
	
	computed: {
		...mapGetters('auth', ['getUser']),
		...mapGetters('favorites', ['getFavoriteList', 'getFavoriteListCompleted']),

		isFavoriteListEmpty() {
			return !this.getFavoriteList.length;
		},
		myUserId() {
			return this.getUser.uid
		},

	},
	async created() {
		// await this.fetchImagesUrlsFromStorage();
	},
	async mounted() {
		await this.loadUserFavoriteBikes(this.myUserId);
		// console.log('favorite list from state: ', this.getFavoriteList)
	},

	methods: {
		...mapActions('users', ['loadUserById', 'loadUserFavoriteBikes','removeUserFavoriteBike']),
		// ...mapActions('favorites', ['setFavoriteList']),
		...mapActions('storage', ['fetchImagesUrlsFromStorage']),

		removeBikeFromFavorites(bikeId) {
			this.removeUserFavoriteBike({
				userId: this.myUserId,
				bikeId: bikeId
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	&::after
	{
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background-image: var(--bg-img2);
		background-size: 25% 25%;
		background-repeat: repeat;
		background-attachment: fixed;
		opacity: .2;
	}
}
.favor-title{
	font-size: 2rem;
	background-color: var(--bg-color1);
	// color: var(--bg-color1);
	line-height: 2rem;
	padding: 1rem 2rem;
}

.material-symbols-outlined{
	position: relative;
	font-size: 2rem;
//   font-variation-settings: 'OPSZ' 32;
}

@media (hover:hover){
	.tooltip:hover::after{
		content: attr(data-tooltip);
		position: absolute;
		top:-100%;
		left: -100%;
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

.back{
		padding: 1rem 2rem;
		border-radius: 10px;
		margin: 0 auto;
		align-self: center;
	}
</style>