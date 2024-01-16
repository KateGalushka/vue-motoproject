<template>
	<main-masterpage>
		<div class="wrapper reviews">
			<div class="reviews-container">
				<div v-for="review in lastReviewsWithImages" :key="review.id" class="review__item">
					<div class="review__item-img">
						<img :src="review.imageUrl" :alt="review.bikeModel">
					</div>
					<div class="review__item-content">
						<h2 class="review__item-title">{{ review.bikeMake }} {{ review.bikeModel }}</h2>
						<div class="review__item-subtitle">
							<p>{{ review.author }}</p>
							<p>{{ review.date }}</p>
						</div>
						<div class="review__item-rating">
							<star-rating-component
								:size="24"
								density="compact"
								readonly
								:model-value="review.rating"
							/>
						</div>
						<div v-if="showFullText[review.id]">
							<p class="review__item-text">{{ review.text }}</p>
							<p class="read-more" @click="readMore(review.id)">
									read less
									<font-awesome-icon :icon="['fas', 'angles-up']" />
								</p> 
						</div>
						<div v-else>
							<p class="review__item-text">
								{{ review.text.slice(0, textMaxLength) }} ...
							</p>
							<p class="read-more" @click="readMore(review.id)">
								read more
								<font-awesome-icon :icon="['fas', 'angles-right']" />
							</p> 
						</div>
						<div v-if="showEditButtonsForUser(review.id)" class="review__item-edit-buttons">
							<button class="button button-edit" @click="toggleEditing(review.id)">
								<font-awesome-icon :icon="['far', 'pen-to-square']" />
								Edit
							</button>
							<button class="button button-edit" @click="onDelete(review.id)">
								<font-awesome-icon :icon="['far', 'trash-can']" />
								Delete
							</button>
							<modal-window-component :modal-active="modalActive[review.id]" @toggle-modal="toggleEditing(review.id)">
								<v-textarea
									v-model="editedReviewText[review.id]"
									variant="solo"
									color="rgb(37, 44, 51)"
									clearable
									auto-grow
									class="mt-4"
								/>
								<div class="reviews__buttons">
									<button class="button submit" @click="onSubmitReview(review.id)">{{ $t('button.submit') }}</button>
									<button class="button submit" @click="toggleEditing(review.id)" >{{ $t('button.cancel') }}</button>
								</div>
							</modal-window-component>

						</div>
					</div>
				</div>
			</div>
		</div>
		
	</main-masterpage>
	
</template>

<script>
import MainMasterpage from '@/masterpages/MainMasterpage.vue';
import StarRatingComponent from '@/components/StarRatingComponent.vue';
import ModalWindowComponent from '@/components/ModalWindowComponent.vue';
import { mapGetters, mapActions } from 'vuex';
import { parseDate} from '../store/helpers/formattingHelper';

	export default {
		name: 'LastReviewsView',

		components: {
			MainMasterpage, StarRatingComponent, ModalWindowComponent
		},
		data() {
			return {
				lastReviews: [],
				textMaxLength: 200,
				showFullText: [],
				modalActive: {},
				editedReviewText: {}
			}
		},
		computed: {
			...mapGetters('reviews', ['getReviewsList']),
			...mapGetters('storage', ['getImagesReferences']),
			...mapGetters('auth', ['getUser']),
			
			lastDozenReviews() {
				return this.lastReviews.slice().sort((a,b)=>{
					const dateA = parseDate(a.date);
					const dateB = parseDate(b.date);
					return dateB - dateA;
					}).splice(0, 12);
			},
			lastReviewsWithImages() {
				return this.lastDozenReviews.map(review => {
					const image = this.getImagesReferences.find((image) => image.name.includes(review.bikeModel));
					return {
						...review,
						imageUrl: image?.url || require('@/assets/images/adv_bike.svg')
					}
				})
			},
			isEng() {
				return this.$i18n.locale == 'en' ? true : false;
			},
			
		},
		async created () {
			await this.loadReviewsList();
			this.lastReviews = await this.getCompletedReviewsList();
			this.lastReviews.forEach(review => {
				this.editedReviewText[review.id] = review.text;
				this.modalActive[review.id] = false;
			});
		},

		methods: {
			...mapActions('reviews', ['loadReviewsList', 'getCompletedReviewsList', 'deleteReview', 'updateReviewText']),

			readMore(reviewId) {
				this.showFullText[reviewId] = !this.showFullText[reviewId];
			},
			showEditButtonsForUser(reviewId) {
				const currentUserReview = this.lastReviews.find(review => (review.id === reviewId) && (review.authorId === this.getUser?.uid));
				return currentUserReview !== undefined;
			},
			async onDelete(reviewId) {
				let msg = this.isEng ? 'Do you really want to delete the review?' : 'Ви дійсно бажаєте видалити відгук?'
				let answer = window.confirm(msg);
				if (answer) {
					await this.deleteReview(reviewId);
					this.$router.go();
				}
			},
			toggleEditing(reviewId) {
				this.modalActive[reviewId] = !this.modalActive[reviewId];
			},
			
			async onSubmitReview(reviewId){
				await this.updateReviewText({
						id: reviewId,
						text: this.editedReviewText[reviewId]
					});
				this.toggleEditing(reviewId);
				this.$router.go();
			}
		},
	}
</script>

<style lang="scss" scoped>
.reviews {
	background-color: var(--bg-color1);
	padding: 2rem;
}

.reviews-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
	max-width: 75%;
	margin: 0 auto;

}
.review__item {
	width: 100%;
	background: var(--bg-gradient);
	color: var(--bg-color1);
	padding: 1rem;
	border-radius: 6px;
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 1.5rem;
}
.review__item-img {
	place-self: center;
	min-height: 170px;
	// max-width: 200px;
	img {
		width: 100%;
		border-radius: 10px;
		margin: 0 auto;
	}
}

.review__item-title {
	font-size: 1.25rem;
	font-weight: 600;
	text-decoration: underline;
	margin-bottom: 1.25rem;

}
.review__item-subtitle{
	display: flex;
	justify-content: space-between;
	gap: 1em;
	margin-bottom: .5em;
	font-weight: bold;
}
.review__item-rating{
	margin-bottom: 1em;
}
.read-more {
	font-size: 0.875rem;
	font-style: italic;
	padding-top: 1.25rem;
	cursor: pointer;
}
.review__item-edit-buttons {
	font-size: 0.875rem;
	text-align: right;
}
.button-edit {
	padding: 0.5rem;
	border-radius: .5rem;
	margin: .5rem .5rem 0;
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

@media (max-width:768px) {
	.review__item {
		grid-template-columns: 1fr;
	}
	.review__item-img {
		max-width: 300px;
		order: 2;
	}
}




</style>