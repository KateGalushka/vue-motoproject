<template>
	<div class="card">
		<div class="card__img">
			<img :src="imageUrl" :alt="motorcycle.model">
		</div>
		<div class="card__title"> 
			<img :src="logoUrl" class="card__title-logo" :alt="motorcycle.make">
			<h3>
				{{motorcycle.make}} {{ motorcycle.model }}
			</h3>

		</div>
		<div class="card__reviews">
			<star-rating-component
				:size="20"
				half-increments
				readonly
				:model-value="overallRating"
			/>
			<span v-if="overallRating">{{ overallRating.toFixed(2) }}/5</span>
			<router-link 
				:to="{
					name: 'bike-reviews',
					params: {
						bikeId: motorcycle.id
					}
				}"
				class="review-link">
					<span>{{ reviewsCount }} {{ $t('card.reviews') }}</span>
			</router-link>
		</div>
		<div class="card__descr">
			<font-awesome-icon :icon="['fas', 'bolt']" />
			<span>{{ motorcycle.displacement }}</span>
		</div>
		<div class="card__descr">
			<font-awesome-icon :icon="['fas', 'bolt']" />
			<span>{{ motorcycle.power }}</span>
		</div>
		<div class="card__moto-type">
			<font-awesome-icon :icon="['fas', 'motorcycle']" class="icon"/>
			{{ $t('card.type')}}: <span>{{ motorcycle.type }}</span>
		</div>
		<div class="card__price">
			<span>€{{ motorcycle.price}}</span>
			<a :href="motorcycle.link" target="_blank">
				<img class="auto-ria" src="../../assets/images/logo/autoRia-logo.png" alt="autoRia-link">
			</a>
		</div>
		
		<div class="card__buttons">
			<button class="button button-details" @click="goToDetails(motorcycle.id)">{{ $t('card.details') }}</button>
			<slot name="additionalButton" :bike-id="motorcycle.id"></slot>
		</div>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import StarRatingComponent from '../StarRatingComponent.vue';

	export default {
		name: 'CardComponent',

		components: {
			StarRatingComponent,
		},

		props: {
			motorcycle: {
				type: Object,
				required: true
			},
		},
		emits: ['goToDetails'],

		computed: {
			...mapGetters('storage', ['getImagesReferences']),
			...mapGetters('reviews', ['getReviewsListByBikeId']),

			logoUrl(){
				return require(`@/assets/images/logo/make/${this.motorcycle.make.toLowerCase()}.svg`)
			},
			imageUrl() {
				const image = this.getImagesReferences.find((image) => image.name.includes(this.motorcycle.model))
				return image? image.url : require('@/assets/images/adv_bike.svg')
			},
			currentReviewsList(){
				return this.getReviewsListByBikeId(this.motorcycle.id);
			},
			reviewsCount() {
				return this.currentReviewsList.length;
			},
			overallRating(){
				let reviewsWithRating = [];
				this.currentReviewsList.forEach(review => {
					if (review.rating) {
						reviewsWithRating.push(review);
					}
				})
				return (reviewsWithRating.reduce((acc, item) => {
					return acc + item.rating }, 0)) / reviewsWithRating.length;
			}
		},
		
	
		methods: {
			goToDetails(id) {
				this.$emit('goToDetails', id)
			}
		},
	}
</script>

<style lang="scss" scoped>
.card{
	background-color: var(--bg-color1);
	width: clamp(298px, 18.65rem, 25%);
	border-radius: 0.625rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	&:hover {
		outline: 4px solid var(--main-color2);
	}
}
.card__img{
	height: calc(45% - 2rem);
	max-width: 100%;
	border-radius: 0.625rem;
	background: var(--bg-gradient);
	margin-bottom: .75rem;
	transition: all .5s ease-in;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.625rem;
	}
	&:hover{
		transform: scale(1.1);
		border-radius: 10px;
	}
}

.card__reviews,
.card__price,
.card__buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 1.25rem;

}
.card__title {
	display: grid;
	grid-template-columns: auto auto;
	justify-content: center;
	align-items: center;
	gap: 1.25rem;
	h3{
		overflow: hidden;
		font-size: 1.25rem;
		font-weight: 600;
		text-align: center;
	}
	.card__title-logo {
		display: block;
		width: 35px;
	}
}
.card__reviews {
	margin-bottom: 1em;
	font-size: 0.75rem;
	color: var(--main-color2);
}


.card__descr span{
	margin-left: 1em;
}
.card__moto-type{
	margin-bottom: 1em;
	.icon {
		margin-right: .5em;
	}
	span{
		color: var(--main-color2);
		font-style: italic;
		font-size: 1.125rem;
	}
}
.card__price{
	font-size: 1.25rem;
	font-weight: 600;
	.auto-ria {
		width: 4em;
	}
}

.button-details{
	padding: .5em 1.5em;
	border-radius: 10px;
	// margin: 0 auto;
}

</style>