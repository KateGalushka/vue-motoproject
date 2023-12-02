<template>
	<div>
	
	</div>
	<div class="wrapper filters">
		<h2>Search catalog</h2>
		<div class="filter-container">
			<div class="filter-container__item brand">
				<label for="brand">Brand</label>
				<select v-model="filterObj.brand" id="brand" name="brand" >
					<option value="">All brands</option>
					<option v-for="(brand, index) in getBrandsList" :key="index" :value="brand">{{brand}}</option>
				</select>
			</div>
			<div class="filter-container__item model">
				<label for="model">Model</label>
				<select v-model="filterObj.model"  id="model" name="model" >
					<option value="">All models</option>
					<option v-for="(model,index) in modelsFilter" :key="index" :value="model">{{ model }}</option>
				</select>
			</div>
			<div class="filter-container__item engine">
				<div>
					<label for="displacementFrom">Engine from (ccm)</label>
					<input v-model.lazy="filterObj.engineFrom" id="displacementFrom" type="number" >
				</div>
				<div>
					<label for="displacementTo">Engine to (ccm)</label>
					<input v-model.lazy="filterObj.engineTo" id="displacementTo" type="number" >
				</div>
			</div>
			<div class="filter-container__item price">
				<div>
					<label for="price">Price min (€)</label>
					<input v-model.lazy="filterObj.priceMin" id="price" type="number" min="100" step="100">
				</div>
				<div>
					<label for="price">Price max (€)</label>
					<input v-model.lazy="filterObj.priceMax" id="price" type="number" min="100" step="100">
				</div>
			</div>
			<div class="filter-container__item type">
				<h4>Type</h4>
				<div class="type-checkboxes">
					<div v-for="(type, index) in getTypesList" :key="index">
						<input v-model="checkedTypesArr" type="checkbox" :name="type" :value="type">
						<label for="Sport">{{type}}</label>
					</div>
				</div>
			</div>
			<div class="filter-container__buttons">
				<button class="button filter-button" @click="onFilter(filterData)">Search</button>
				<button class="button filter-button" @click="onClearFilters">Clear filters</button>
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
		...mapGetters(['getBrandsList', 'getModelsList', 'getTypesList', 'getModelsListByBrand', 'getBrandByModel', 'getTypeByModel']),
		
		filterData(){
			return {
				...this.filterObj,
				filterArr: this.checkedTypesArr
			}
		}
	},
	watch: {
		'filterObj.brand'(newVal) {
			if (newVal) {
				this.modelsFilter = this.getModelsListByBrand(newVal);
			} 
			if(newVal ==''){
				this.modelsFilter = this.getModelsList;
			}
		},
		'filterObj.model'(newVal){
			if (!this.filterObj.brand && newVal){
				this.filterObj.brand = this.getBrandByModel(newVal);
			}
			if (newVal){
				const checkedType = this.getTypeByModel(newVal);
				console.log(checkedType);
				this.checkedTypesArr = [checkedType];
			}
							
		},
				
	},
	created () {
		this.modelsFilter = this.getModelsList;
		console.log('modelsList:', this.getModelsList);
		
	},
	methods: {
		...mapActions(['onFilter', 'updateListAfterClearFilters']),

		onClearFilters() {
			this.filterObj = {};
			this.checkedTypesArr.length = 0;
			this.modelsFilter = this.getModelsList;
			this.updateListAfterClearFilters();
		}
	},
	
}
</script>

<style lang="scss" scoped>
.filters{
	padding: 1.5rem 1.5rem 1.5rem;
	h2{
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .75em;
	}
}
.filter-container {
	display:grid;
	grid-template-columns: repeat(2, 1.25fr) .75fr .75fr;
	gap: 1rem;
}
.filter-container__item{
	padding: 1rem 1rem 0;
}
.model, .brand, .engine, .price {
	select, input{
		width: 100%;
		display: inline-block;
		margin-top: 0.5rem;
		color: var(--bg-color1);
		padding: 0.2rem;
	}
}
.brand{
	grid-column: 1/2;
}
.model{
	grid-column: 1/2;
}
.engine{
	grid-column: 2/3;
	grid-row: 1/2;
	display: flex;
	gap: 1rem;
}
.price{
	grid-column: 2/3;
	display: flex;
	gap: 1rem;
}
.type{
	grid-column: 3/4;
	grid-row: 1/3;
	h4{
		margin-bottom: 8px;
		// text-align: center;
	}
	input[type=checkbox]{
		margin-right: 10px;
	}
}
.type-checkboxes{
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	max-height: 6.5rem;
	gap: 0.5rem;
}
.filter-container__buttons{
	grid-column: 4/5;
	grid-row: 1/3;
	align-self: center;
	margin-left: 1em;
}
.filter-button{
	padding: .6em 2em;
	margin: 1em;
	border-radius: 8px;
}
</style>