<template>
	<div class="wrapper details">
		<h2>{{ getBike.make }} - model {{ getBike.model }}</h2>
		<div class="details-container">
			<div class="details__img">
				<img :src="getBike.imgSrc" :alt="getBike.model">
			</div>
			<div class="details__spec">
				<h3 class="details__spec-title">Specifications</h3>
				<ul class="details__spec-list">
					<li>
						<span class="list-item type">Type: </span>
						<span>{{ getBike.type }}</span>
					</li>
					<li>
						<span class="list-item engine">Displacement: </span>
						<span>{{ getBike.displacement }}</span>
					</li>
					<li>
						<span class="list-item engine">Engine: </span>
						<span>{{ getBike.engine }}</span>
					</li>
					<li>
						<span class="list-item power">Power: </span>
						<span>{{ getBike.power }}</span>
					</li>
					<li>
						<span class="list-item power">Torque: </span>
						<span>{{ getBike.torque }}</span>
					</li>
					<li>
						<span class="list-item gear">Gearbox: </span>
						<span>{{ getBike.gearbox }}</span>
					</li>
					<li>
						<span class="list-item info">Weight: </span>
						<span>{{ getBike.total_weight }}</span>
					</li>
					<li>
						<span class="list-item type">Seat height: </span>
						<span>{{ getBike.seat_height }}</span>
					</li>
					<li>
						<span class="list-item type">Ground clearance: </span>
						<span>{{ getBike.ground_clearance }}</span>
					</li>
					<li>
						<span class="list-item fuel">Fuel capacity: </span>
						<span>{{ getBike.fuel_capacity }}</span>
					</li>
					<li>
						<span class="list-item fuel">Fuel consumption: </span>
						<span>{{ getBike.fuel_consumption }}</span>
					</li>
				</ul>
				<div class="links">
					<router-link :to="{ name: 'guide' }" class="button back">Back to catalog</router-link>

					<button @click="addToFavorites(getBike.id)" class="button favor">
						<span class="material-symbols-outlined">favorite</span>Add to favorites
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

		bikeId() {
			return this.$route.params.bikeId;
		},
		getBike() {
			return this.getMotorcycleById(this.bikeId);
		}
	},
	methods: {
		...mapActions('moto', ['addToFavorites']) 
	},
}
</script>

<style lang="scss" scoped>
.details {
	background-color: var(--bg-color1);
	padding: 2rem;
	h2	{
		font-size: 2rem;
		margin-bottom: 1em;
		color: var(--main-color2);
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
	img
	{
		width: 100%;
		object-fit: cover;
		border-radius: 3rem 0  3rem 0;
	}
}

.details__spec
{
	background: var(--bg-gradient);
	color: var(--bg-color1);
	flex: 1 1 50%;
	padding: 3em 2em 2em;
	border-radius: 3rem 0  3rem 0;
}

.details__spec-title
{
	font-size: 1.5rem;
	margin-bottom: 1em;
	font-family: var(--font-second);
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
	margin-bottom: 3em;
	li{
		display: flex;
		justify-content: space-between;
		gap: .5rem;
		padding: 0.4rem 0;
		&:nth-child(odd){
			background-color: rgba(188, 188, 188, 0.4);

		}
	}
}

.list-item
{
	&.type::before
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

	&.info::before
	{
		content: url('../../assets/images/1/list-info-11.png');
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
}
.back{
		padding: .75rem 1.5rem;
		border-radius: 10px;
	}

.favor{
	border-radius: 10px;
	position: relative;
	padding: 0.75rem 1.5rem 0.75rem 2.75rem;
}
.material-symbols-outlined{
	position: absolute;
	top: 50%;
	left: 1.25rem;
	transform: translateY(-50%);
}

</style>