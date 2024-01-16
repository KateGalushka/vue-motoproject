<template>
	<main-masterpage>
		<div class="wrapper reviews">
			<div class="reviews__title">
				<img :src="logoUrl" class="reviews__title-logo" :alt="getBike.make">
				<h2>{{ getBike.make }} {{ getBike.model }} - reviews</h2>
			</div>
			<div class="reviews-container">
				<div class="reviews__text">
					<div v-if="isReviewsListEmpty" class="review__item">
						{{ $t('reviews.noReviews') }}
					</div>
					<div v-for="review in completedReviews" :key="review.id" class="review__item">
						<div class="review__item-title">
							<p>{{ review.author}}</p>
							<p>{{ review.date}}</p>
						</div>
						<div class="review__item-rating">
							<star-rating-component
								:size="24"
								density="compact"
								readonly
								:model-value="review.rating"
								/>
						</div>
						<p class="review__item-text">{{ review.text }}</p>
					</div>
					<div v-if="getUser">
						<div class="reviews__input">
							<div class="review__item-editable">
								<h3>{{ $t('reviews.rate') }} {{ getBike.make }} {{ getBike.model }}:</h3>
								<star-rating-component
									v-model="reviewObj.rating"
									:size="32"
								/>
							</div>
							<v-textarea
								v-model="reviewObj.text"
								:label="$t('reviews.write')"
								variant="solo"
								color="rgb(37, 44, 51)"
								clearable
								auto-grow
							/>
							<div class="reviews__buttons">
								<button class="button submit" @click="onSubmitReview">{{ $t('button.submit') }}</button>
								<router-link :to="{name:'guide'}" class="button submit">{{ $t('button.cancel') }}</router-link>
							</div>
						</div>
					</div>
					<div v-else class="review__item">
						<p>{{ $t('reviews.addReview') }}</p>
						<div class="reviews__buttons">
							<router-link :to="{name: 'login'}" class="button review-login">{{ $t('button.login') }}</router-link>
							<router-link :to="{ name: 'guide' }" class="button review-back">{{ $t('button.back') }}</router-link>
						</div>
					</div>

				</div>
				<div class="reviews__img">
					<img :src="imageUrl" :alt="getBike.model">
				</div>
			</div>
		</div>

	</main-masterpage>
</template>

<script>
import MainMasterpage from '@/masterpages/MainMasterpage.vue';
import StarRatingComponent from '@/components/StarRatingComponent.vue';
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'ReviewsView',
		components: {
			MainMasterpage, StarRatingComponent
		},
		props: {
			bikeId: {
				type: [Number, String],
				required: true
			},
		},
		data() {
			return {
				completedReviews: [],
				reviewObj: {
					author: null,
					date: null,
					bikeId: null,
					rating: null,
					text: ''
				}
			}
		},
		computed: {
			...mapGetters('moto', ['getMotorcycleById']),
			...mapGetters('storage', ['getImagesReferences']),
			...mapGetters('reviews', ['getReviewsList']),
			...mapGetters('auth', ['getUser']),

			getBike() {
				return this.getMotorcycleById(this.bikeId);
			},
			logoUrl() {
				let brand = this.getBike.make;
				return require(`@/assets/images/logo/make/${brand.toLowerCase()}.svg`);
			},
			imageUrl() {
				const image = this.getImagesReferences.find((image) => image.name.includes(this.getBike.model));
				return image ? image.url : require('@/assets/images/adv_bike.svg')
			},
			isReviewsListEmpty(){
				return !this.completedReviews.length;
			}
		},

		async created () {
			await this.loadReviewsListByMotorcycleId(this.bikeId);
			this.completedReviews = await this.getCompletedReviewsList();
		},
		
		methods: {
			...mapActions('reviews', ['loadReviewsListByMotorcycleId', 'getCompletedReviewsList', 'addReview']),
			...mapActions(['setError']),

			async onSubmitReview() {
				try{
					await this.addReview({
						author: this.getUser.uid,
						date: new Date(),
						bikeId: parseInt(this.bikeId),
						rating: this.reviewObj.rating,
						text: this.reviewObj.text
					});
				} catch(error) {
					// console.error("Error submitting review", error);
					this.setError(error);
				} 
				finally {
					this.$router.go();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.reviews {
	background-color: var(--bg-color1);
	padding: 2rem;
}
.reviews__title {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1em;
	margin-bottom: 1em;
	h2	{
		font-size: 2rem;
		font-weight: 600;
		color: var(--main-color2);
	}
	.reviews__title-logo {
		width: 75px;
	}
}
.reviews-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
}
.reviews__text {
	width: clamp(250px, 80%, 500px);
	display: flex;
	flex-flow: column wrap;
	gap: 1rem;

}
.review__item {
	background: var(--bg-gradient);
	color: var(--bg-color1);
	padding: 1rem;
	border-radius: 6px;
}
.review__item-editable {
		// background: var(--bg-color2);
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-size: 1.25rem;
		font-weight: 600;
	}

.review__item-title{
	display: flex;
	justify-content: space-between;
	gap: 1em;
	margin-bottom: .5em;
	font-weight: bold;
}
.review__item-rating{
	margin-bottom: 1em;
}
.reviews__input {
	text-area {
		width: 100%;
	}
}

.reviews__img {
	max-width: clamp(250px, 90%, 325px);
	img {
		width: 100%;
		border-radius: 10px;
	}
}
.review-login, .review-back{
	padding:  0.5rem 0.75rem;
	border-radius: 5px;
	margin-top: 0.75rem;
}
 
.reviews__buttons {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
}
.submit {
	padding: .5rem 1.5rem;
	border-radius: .5rem;
}

@media (max-width: 920px) {
	.reviews__img {
		order: -1;
	}
}
@media (max-width:768px) {
	.reviews {
		h2 {
			font-size: 1.5rem;
			text-align: center;
		}
		p, div {
			font-size: 0.875rem;
		}
	}
	.reviews-container {
		gap: 1rem;
	}	
	.reviews__buttons {
		justify-content: center;
	}
	
}

</style>