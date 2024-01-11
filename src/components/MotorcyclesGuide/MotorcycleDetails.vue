<template>
	<div class="wrapper details">
		<div class="details__title">
			<img :src="logoUrl" class="details__title-logo" :alt="getBike.make">
			<h2>{{ getBike.make }} {{ getBike.model }}</h2>
		</div>
		<div class="details-container">
			<div class="details__img">
				<img :src="imageUrl" class="details__img-image" :alt="getBike.model">
			</div>
			<div class="details__spec">
				<h3 class="details__spec-title">{{ $t('details.specs') }}</h3>
				<ul class="details__spec-list">
					<li>
						<span class="list-item type">{{ $t('card.type') }}: </span>
						<span>{{ getBike.type }}</span>
					</li>
					<li>
						<span class="list-item engine">{{ $t('details.displacement') }}: </span>
						<span>{{ getBike.displacement }}</span>
					</li>
					<li>
						<span class="list-item engine">{{ $t('details.engine') }}: </span>
						<span>{{ getBike.engine }}</span>
					</li>
					<li>
						<span class="list-item power">{{ $t('details.power') }}: </span>
						<span>{{ getBike.power }}</span>
					</li>
					<li>
						<span class="list-item power">{{ $t('details.torque') }}: </span>
						<span>{{ getBike.torque }}</span>
					</li>
					<li>
						<span class="list-item gear">{{ $t('details.gearbox') }}: </span>
						<span>{{ getBike.gearbox }}</span>
					</li>
					<li>
						<span class="list-item info">{{ $t('details.weight') }}: </span>
						<span>{{ getBike.total_weight }}</span>
					</li>
					<li>
						<span class="list-item type">{{ $t('details.seat') }}: </span>
						<span>{{ getBike.seat_height }}</span>
					</li>
					<li>
						<span class="list-item type">{{ $t('details.ground') }}: </span>
						<span>{{ getBike.ground_clearance }}</span>
					</li>
					<li>
						<span class="list-item fuel">{{ $t('details.fuelCap') }}: </span>
						<span>{{ getBike.fuel_capacity }}</span>
					</li>
					<li>
						<span class="list-item fuel">{{ $t('details.fuelConsump') }}: </span>
						<span>{{ getBike.fuel_consumption }}</span>
					</li>
				</ul>
				<div class="links">
					<router-link :to="{ name: 'guide' }" class="button back">{{ $t('button.back')}}</router-link>

					<button v-if="getUser" class="button favor" @click="toggleIsFavorite(bikeId)" >
						<span v-if="isAdded(bikeId)" class="material-symbols-outlined">heart_minus</span>
						<span v-else class="material-symbols-outlined">favorite</span>
						{{ btnFavorTitle }}
					</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default {
	name: 'MotorcycleDetails',

	computed: {
		...mapGetters('moto', ['getMotorcycleById']),
		...mapGetters('favorites', ['getFavoriteList']),
		...mapGetters('auth', ['getUser']),
		...mapGetters('storage', ['getImagesReferences']),

		bikeId() {
			return this.$route.params.bikeId;
		},
		getBike() {
			return this.getMotorcycleById(this.bikeId);
		},
		logoUrl() {
			let brand = this.getBike.make;
			return require(`@/assets/images/logo/${brand.toLowerCase()}.svg`)
		},
		imageUrl() {
			const image = this.getImagesReferences.find((image) => image.name.includes(this.getBike.model))
			return image ? image.url : require('@/assets/images/adv_bike.svg')
		},
		
		btnFavorTitle(){
			const isAdded = this.isAdded(this.bikeId);
			const title = isAdded? 'button.removeFromFav': 'button.addToFav'
			return this.$t(title)
		}
	},
	methods: {
		...mapActions('favorites', ['toggleIsFavorite']),

		isAdded(bikeId) {
			return this.getFavoriteList.some(id => id == bikeId);
		}, 
	},
}
</script>

<style lang="scss" scoped>
.details {
	background-color: var(--bg-color1);
	padding: 2rem;
}
.details__title {
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
	.details__title-logo {
		width: 100px;
		
	}
}
.details-container {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
}

.details__img {
	flex: 1 1 calc(50% - 3rem);
	// align-self: center;
	max-width: 50%;
	background: var(--bg-gradient);
	border-radius: 3rem 0  3rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.details__img-image
	{
		width: 95%;
		object-fit: cover;
		border-radius: 3rem 0  3rem 0;
	}
	
}

.details__spec
{
	background: var(--bg-gradient);
	color: var(--bg-color1);
	flex: 1 1 50%;
	padding: 1.75em;
	border-radius: 3rem 0  3rem 0;
	
	
}

.details__spec-title {
	font-size: 1.5rem;
	margin-bottom: 1em;
	font-weight: 600;

	&::after
	{
		content: "";
		display: block;
		height: 2px;
		width: 8em;
		margin-top: 0.5rem;
		background-color: var(--bg-color1);
	}
}

.details__spec-list
{
	display: grid;
	grid-template-columns: repeat(2, auto-fit);
	gap: .5rem;
	justify-content: center;
	align-items: center;
	margin-bottom: 2em;
	li{
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: .5rem;
		padding: .5rem;
		&:nth-child(odd){
			background-color: rgba(188, 188, 188, 0.4);
		}
	}
}

.list-item {
	display: inline-block;
	min-width: 12.5em;
	
	&.type::before, &.info::before
	{
		content: url('../../assets/images/1/list-info-33.png');
		display: inline-block;
		margin-right: 7px;
	}

	&.engine::before
	{
		content: url('../../assets/images/1/list-info-44.png');
		display: inline-block;
		margin-right: 7px;
	}

	&.power::before
	{
		content: url('../../assets/images/1/list-info-55.png');
		display: inline-block;
		margin-right: 7px;
	}

	&.gear::before
	{
		content: url('../../assets/images/1/list-gears.png');
		display: inline-block;
		margin-right: 7px;
	}

	&.fuel::before
	{
		content: url('../../assets/images/1/list-fuell.png');
		display: inline-block;
		margin-right: 7px;
	}
}
.links{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	gap: 1em;
}
.back{
		padding: .75rem 1rem;
		border-radius: 10px;
	}

.favor{
	border-radius: 10px;
	position: relative;
	padding: 0.75rem 1rem 0.75rem 2.75rem;
}
.material-symbols-outlined{
	position: absolute;
	top: 50%;
	left: 5%;
	transform: translateY(-50%);
}

@media (max-width:800px) {
	.details{
		padding: 1.25rem;
	}
	.details__title{
		h2 {
			font-size: 1.5rem;
			text-align: center;
		}
		.details__title-logo {
			width: 70px;
		}
	}
	
	.details-container {
		font-size: 0.875rem;
		justify-content: center;
	}
	.details__img{
		max-width: 75%;
	} 
	.details__spec-title {
		font-size: 1.25rem;
		text-align: center;
		&::after	{
			content: "";
			display: block;
			height: 2px;
			width: 8em;
			margin: 0.5rem auto;
	}
	}
		
	.details__spec{
		flex-basis: 100%;
		max-width: 100%;
	}
	.details__spec-list{
		gap: 0;
	}
}
@media (max-width:425px) {
	.details__title .details__title-logo{
		width: 50px;
	}
	.details-container {
		font-size: 0.75rem;
	}
}


</style>