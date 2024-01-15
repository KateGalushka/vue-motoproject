<template>
	<div class="wrapper filters">
		<h2>{{ $t('search.title') }}</h2>
		<div class="filter-container">
			<div class="filter-container__item brand">
				<label for="brand">{{ $t('search.brand') }}</label>
				<v-select
					id="brand"
					v-model="filterObj.brand"
					:items="getBrandsList"
					:placeholder="$t('search.allBrands')"
					clearable
					class="mt-2 w-100" variant="solo" clear-icon='mdi-close-circle' color="var(--main-color2)"
					bg-color="grey-lighten-5"
					density="compact"
					hide-details
				/>
				<!-- <option value="">All brands</option>
					<option v-for="(brand, index) in getBrandsList" :key="index" :value="brand">{{brand}}</option> -->
			</div>
			<div class="filter-container__item model">
				<label for="model">{{ $t('search.model') }}</label>
				<v-select
					id="model"
					v-model="filterObj.model"
					:items="modelsFilter"
					:placeholder="$t('search.allModels')"
					clearable
					class="mt-2 w-100" variant="solo" clear-icon='mdi-close-circle' color="var(--main-color2)"
					bg-color="grey-lighten-5"
					density="compact"
					hide-details
					
				/>
				<!-- <select v-model="filterObj.model"  id="model" name="model" >
					<option value="">All models</option>
					<option v-for="(model,index) in modelsFilter" :key="index" :value="model">{{ model }}</option>
				</select> -->
			</div>
			<div class="filter-container__item engine">
				<div>
					<label for="displacementFrom">{{ $t('search.engFrom') }}</label>
					<v-text-field
						id="displacementFrom"
						v-model.number.lazy="filterObj.engineFrom"
						type="number"
						color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" step="100"
						min="0" class="mt-2 mr-2 w-100"
						density="compact"
						hide-details
					/>
				</div>
				<div>
					<label for="displacementTo">{{ $t('search.engTo') }}</label>
					<v-text-field
						id="displacementTo"
						v-model.number.lazy="filterObj.engineTo"
						type="number"
						color="var(--main-color2)" bg-color="grey-lighten-5" variant="solo" step="100"
						min="0" class="mt-2 mr-2 w-100"
						density="compact"
						hide-details
					/>
				</div>
			</div>
			<div class="filter-container__item price">
				<div>
					<label for="price">{{ $t('search.priceMin') }}</label>
					<v-text-field
						id="price"
						v-model.lazy="filterObj.priceMin"
						type="number" min="100" step="100" color="var(--main-color2)" bg-color="grey-lighten-5"  class="mt-2 mr-2 w-100" 
						variant="solo"
						density="compact"
						hide-details
					/>
				</div>
				<div>
					<label for="price">{{ $t('search.priceMax') }}</label>
					<v-text-field
					id="price"
						v-model.lazy="filterObj.priceMax"
						type="number" min="100" step="100" color="var(--main-color2)" bg-color="grey-lighten-5"  class="mt-2 mr-2 w-100"
						variant="solo"
						density="compact"
						hide-details/>
				</div>
			</div>
			<div class="filter-container__item type">
				<h5 for="type">{{ $t('search.type') }}</h5>
				<div class="type-checkboxes">
					<v-checkbox
						v-for="(type, index) in getTypesList"
						:key="index" 
						v-model="checkedTypesArr"
						:value="type"
						multiple
						density="compact"
						hide-details
					>
						<template #label>
	          			<span class="checkbox-label">{{type}}</span>
	        			</template>
					</v-checkbox>
					<!-- <div v-for="(type, index) in getTypesList" :key="index">
						<input v-model="checkedTypesArr" type="checkbox" :name="type" :value="type" :id="type">
						<label :for="type">{{ type }}</label>
					</div> -->
				</div>
			</div>
			<div class="filter-container__buttons">
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
		// console.log('modelsList:', this.getModelsList);
	},
	methods: {
		...mapActions('moto', ['updateFilterObj', 'updateCheckedTypesArray', 'updateListAfterClearFilters']),

		onClearFilters() {
			this.filterObj = {};
			this.checkedTypesArr.length = 0;
			this.modelsFilter = this.getModelsList;
			// this.updateListAfterClearFilters();
			this.updateFilterObj({});
			this.updateCheckedTypesArray([]);
		}
	},

}
</script>

<style lang="scss" scoped>
.filters {
	padding: 1.5rem 0 1.5rem 1.5rem;
	h2	{
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .75em;
	}
}
.filter-container {
	display: grid;
	grid-template-columns: repeat(2, 1.25fr) 1fr;
	gap: 1rem 1.5rem;
	align-items: end;
}

.brand {
	grid-column: 1/2;
}

.model {
	grid-column: 1/2;
}

.engine, .price {
	grid-column: 2/3;
	display: flex;
	gap: 1rem;
}
.engine {
	grid-row: 1/2;
}

.price {
	grid-row: 2/3;
}

.type {
	grid-column: 3/4;
	grid-row: 1/3;
	justify-self: center;
}

.type-checkboxes {
	display: grid;
	grid-template-columns: repeat(2, minmax(140px, 1fr));
	column-gap: .75rem;
}

.filter-container__buttons {
	grid-column:1/5;
	place-self: center;
}

.filter-button {
	padding: .6em 1em;
	border-radius: 8px;
}

@media (max-width:992px) {
	.filter-container {
		grid-template-columns: 1fr 1fr;
		padding-right: 1rem;
	}

	.type {
		grid-column: 1/3;
		grid-row: 3/4;
		// justify-self: start;
	}
	.type-checkboxes {
		grid-template-columns: repeat(4, 1fr);
	}
	.filter-container__buttons {
		grid-column: 1/3;
		grid-row: 4/4;
	}
	
}
@media (max-width:768px) {
	h2 {
		font-size: 1rem;
	}
	.filter-container {
		font-size: 0.875rem;
	}
	.checkbox-label {
		font-size: 0.875rem;
	}
}
@media (max-width: 610px) {
	.type-checkboxes {
		grid-template-columns: repeat(3, 1fr);
	}
}


@media (max-width:600px){
	.filter-container {
		grid-template-columns: minmax(90%, 1fr);
	}
	
	.engine, .price, .type, .filter-container__buttons {
		grid-column: auto;
		grid-row: auto;
		place-self: center;
	}
}
@media (max-width:425px){
	.type-checkboxes {
			grid-template-columns: repeat(2, 1fr);
		}

}

</style>