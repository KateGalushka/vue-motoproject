<template>
	<main-masterpage>
		<div class="wrapper reviews">
			<h2>{{ getBike.make }} {{ getBike.model }} - reviews</h2>
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
						<p class="review__item-text">{{ review.text }}</p>
					</div>
					<div v-if="getUser">
						<div class="reviews__input">
							<v-textarea
								v-model="review.text"
								:label="$t('reviews.write')"
								variant="solo"
								color="rgb(37, 44, 51)"
								clearable
								auto-grow
							/>
							<div class="reviews__buttons">
								<button class="button submit" @click="onSubmitReview(review.text)">Submit</button>
								<router-link :to="{name:'guide'}" class="button submit">Cancel</router-link>
							</div>
						</div>
					</div>
					<div v-else class="review__item">
						<p>{{ $t('reviews.addReview') }}</p>
						<router-link :to="{name: 'login'}" class="button review-login">{{ $t('button.login') }}</router-link>

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
import { mapGetters, mapActions } from 'vuex';
import { maskEmail } from '@/store/helpers/formattingHelper';

	export default {
		name: 'ReviewsView',
		components: {
			MainMasterpage,
		},
		props: {
			bikeId: {
				required: true
			},
		},
		data() {
			return {
				completedReviews: [],
				review: {
					author: null,
					date: null,
					bikeId: null,
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
			imageUrl() {
				const image = this.getImagesReferences.find((image) => image.name.includes(this.getBike.model))
				return image ? image.url : require('@/assets/images/adv_bike.svg')
			},
			isReviewsListEmpty(){
				return !this.completedReviews.length;
			}
			
		},
		async created () {
			await this.loadReviewsListByMotorcycleId(this.bikeId);
			console.log('2mounted - list', this.loadReviewsListByMotorcycleId(this.bikeId));
			await this.getCompletedReviewsList();
			
		},
		
		methods: {
			...mapActions('reviews', ['loadReviewsList', 'loadReviewsListByMotorcycleId', 'addReview']),
			...mapActions('users', ['loadUserById']),

			async getCompletedReviewsList() {
				this.completedReviews = await Promise.all(
					 this.getReviewsList.map(async (review) => {
						let userName;
						try{
							const currentUser = await this.loadUserById(review.author);
							if (currentUser) {
								userName = currentUser.name || maskEmail(currentUser.email);
							}
						} catch(error) {
							console.error('Error loading user:', error);
						}
						return {
							id: review.id,
							date: new Date(review.date.seconds * 1000).toLocaleDateString(),
							text: review.text,
							author: userName
						};
					})
				)
				return this.completedReviews;
			},
			async onSubmitReview(text) {
				try{
					await this.addReview({
						author: this.getUser.uid,
						date: new Date(),
						bikeId: parseInt(this.bikeId),
						text: text
					});
					
				} catch(error) {
					console.error("Error submitting review", error)
				} finally {
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
	h2	{
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 1em;
		color: var(--main-color2);
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
.review__item-title{
	display: flex;
	justify-content: space-between;
	gap: 1em;
	margin-bottom: 1em;
	font-weight: bold;

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
.review-login{
	padding:  0.5rem 0.75rem;
	border-radius: 5px;
	display: inline-block;
	margin: 0.5rem 0;
}
.reviews__buttons {
	display: flex;
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