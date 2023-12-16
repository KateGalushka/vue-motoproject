<template>
	<div>

	</div>
	<div class="wrapper filters">
		<h2>{{ $t('search.title') }}</h2>
		<div class="filter-container">
			<div class="filter-container__item brand">
				<label for="brand">{{ $t('search.brand') }}</label>
				<v-select v-model="filterObj.brand" :items="getBrandsList" id="brand" :placeholder="$t('search.allBrands')" clearable
					class="mt-2 w-100" variant="solo" clear-icon='mdi-close-circle' color="var(--main-color2)"
					bg-color="grey-lighten-5" density="compact" hide-details="true"/>
				<!-- <option value="">All brands</option>
					<option v-for="(brand, index) in getBrandsList" :key="index" :value="brand">{{brand}}</option> -->

			</div>
			<div class="filter-container__item model">
				<label for="model">{{ $t('search.model') }}</label>
				<v-select v-model="filterObj.model" :items="modelsFilter" id="model" :placeholder="$t('search.allModels')" clearable
					class="mt-2 w-100" variant="solo" clear-icon='mdi-close-circle' color="var(--main-color2)"
					bg-color="grey-lighten-5" density="compact" hide-details="true"/>

				<!-- <select v-model="filterObj.model"  id="model" name="model" >
					<option value="">All models</option>
					<option v-for="(model,index) in modelsFilter" :key="index" :value="model">{{ model }}</option>
				</select> -->
			</div>
			<div class="filter-container__item engine">
				<div>
					<label for="displacementFrom">{{ $t('search.engFrom') }}</label>
					<v-text-field v-model.number.lazy="filterObj.engineFrom" id="displacementFrom" type="number"
						color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" step="100"
						min="0" class="mt-2 mr-2 w-100" density="compact" hide-details="true" />

				</div>
				<div>
					<label for="displacementTo">{{ $t('search.engTo') }}</label>
					<v-text-field v-model.lazy="filterObj.engineTo" id="displacementTo" type="number" color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" step="100"
							min="0" class="mt-2 mr-2 w-100" density="compact" hide-details="true"/>
				</div>
			</div>
			<div class="filter-container__item price">
				<div>
					<label for="price">{{ $t('search.priceMin') }}</label>
					<v-text-field v-model.lazy="filterObj.priceMin" id="price" type="number" min="100" step="100" color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" class="mt-2 mr-2 w-100" density="compact"/>
				</div>
				<div>
					<label for="price">{{ $t('search.priceMax') }}</label>
					<v-text-field v-model.lazy="filterObj.priceMax" id="price" type="number" min="100" step="100" color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" class="mt-2 mr-2 w-100" density="compact" hide-details="true"/>
				</div>
			</div>
			<div class="filter-container__item type">
				<label for="type">{{ $t('search.type') }}</label>
				<div class="type-checkboxes">
					<div v-for="(type, index) in getTypesList" :key="index">
						<input v-model="checkedTypesArr" type="checkbox" :name="type" :value="type">
						<label :for="type">{{ type }}</label>
					</div>
				</div>
			</div>
			<div class="filter-container__buttons">
				<!-- <button class="button filter-button" @click="onFilter(filterData)">Search</button> -->
				<button class="button filter-button" @click="onClearFilters">{{ $t('search.clearFilters') }}</button>

			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'MotorcyclesFilters',

	data() {
		return {
			filterObj: {},
			modelsFilter: [],
			checkedTypesArr: []
		}
	},

	computed: {
		...mapGetters('moto', ['getBrandsList', 'getModelsList', 'getTypesList', 'getModelsListByBrand', 'getBrandByModel', 'getTypeByModel']),

		// checkedTypesArr: {
		// 	get(){
		// 		return this.typesArr;
		// 	},
		// 	set(newVal){
		// 		this.updateCheckedTypesArray(newVal)
		// 	}
		// },

		// filterData(){
		// 	return {
		// 		...this.filterObj,
		// 		filterArr: this.checkedTypesArr
		// 	}
		// }
	},
	watch: {
		'filterObj.brand'(newVal) {
			if (newVal) {
				this.modelsFilter = this.getModelsListByBrand(newVal);
			}
			if (newVal == '') {
				this.modelsFilter = this.getModelsList;
				this.checkedTypesArr.length = 0;
			}
		},
		'filterObj.model'(newVal) {
			if (!this.filterObj.brand && newVal) {
				this.filterObj.brand = this.getBrandByModel(newVal);
			}
			if (newVal) {
				const checkedType = this.getTypeByModel(newVal);
				console.log(checkedType);
				this.checkedTypesArr = [checkedType];
			}
			if (newVal == '') {
				this.checkedTypesArr.length = 0;
			}
		},
		filterObj: {
			handler(newVal) {
				this.updateFilterObj(newVal);
			},
			deep: true
		},

		checkedTypesArr: {
			handler(newVal) {
				this.updateCheckedTypesArray(newVal)
			},
			deep: true
		}


	},
	created() {
		this.modelsFilter = this.getModelsList;
		console.log('modelsList:', this.getModelsList);
	},
	methods: {
		...mapActions('moto', ['updateFilterObj', 'updateCheckedTypesArray', 'onFilter', 'updateListAfterClearFilters']),

		onClearFilters() {
			this.filterObj = {};
			this.checkedTypesArr.length = 0;
			this.modelsFilter = this.getModelsList;
			// this.updateListAfterClearFilters();
		}
	},

}
</script>

<style lang="scss" scoped>
.filters {
	padding: 1.5rem 1.5rem 1.5rem;

	h2
	{
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .75em;
	}
}

.filter-container
{
	display: grid;
	grid-template-columns: repeat(2, 1.25fr) .75fr .75fr;
	gap: 1rem;
}

.filter-container__item
{
	padding: 0 1rem;
	label{
		margin-bottom: 1em;
	}
}


.engine, .price {
	div {
		margin-right: 0.5em;
	}

	// 
}

.brand
{
	grid-column: 1/2;
}

.model
{
	grid-column: 1/2;
}

.engine
{
	grid-column: 2/3;
	grid-row: 1/2;
	display: flex;
	gap: 1rem;
}

.price
{
	grid-column: 2/3;
	display: flex;
	gap: 1rem;
}

.type
{
	grid-column: 3/4;
	grid-row: 1/3;

	h4
	{
		margin-bottom: 8px;
		// text-align: center;
	}

	input[type=checkbox]
	{
		margin-right: 10px;
	}
}

.type-checkboxes
{
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	max-height: 6.5rem;
	gap: 0.5rem;
	margin-top: 1em;
}

.filter-container__buttons
{
	grid-column: 4/5;
	grid-row: 1/3;
	align-self: center;
	margin-left: 1em;
}

.filter-button
{
	padding: .6em 2em;
	margin: 1em;
	border-radius: 8px;
}</style>