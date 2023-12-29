<template>
	<main-masterpage>
		<div class="wrapper reviews">
			<h2>{{ getBike.make }} {{ getBike.model }} - reviews</h2>
			<div class="reviews-container">
				<div class="reviews__text">
					<div class="review__item">
						<p>userName</p>
						<p>data</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus temporibus mollitia veniam, saepe repellendus provident.</p>
					</div>
					<div class="review__item">
						<p>userName</p>
						<p>data</p>
						<p>userReview</p>
					</div>
					<div class="review__item">
						<p>userName</p>
						<p>data</p>
						<p>userReview</p>
					</div>
					<div class="reviews__input">
						<v-textarea
							label="Your review about the model"
							variant="solo"
							color="rgb(37, 44, 51)"
							clearable
							auto-grow
						/>
						<div class="reviews__buttons">
							<button class="button submit">Submit</button>
							<router-link :to="{name:'guide'}" class="button submit">Cancel</router-link>
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
import { mapGetters } from 'vuex';

	export default {
		name: 'ReviewsView',
		components: {
			MainMasterpage,
		},
		props: {
			bikeId: {
				type: Number,
				required: true
			},
		},
		computed: {
			...mapGetters('moto', ['getMotorcycleById']),
			...mapGetters('storage', ['getImagesReferences']),

			getBike() {
				return this.getMotorcycleById(this.bikeId);
			},
			imageUrl() {
			const image = this.getImagesReferences.find((image) => image.name.includes(this.getBike.model))
			return image ? image.url : require('@/assets/images/adv_bike.svg')
			},
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
	max-width: clamp(250px, 80%, 500px);
	display: flex;
	flex-flow: column wrap;
	gap: 1rem;

}
.review__item {
	background: var(--bg-gradient);
	color: var(--bg-color1);
	padding: 1rem;
	border-radius: 10px;

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