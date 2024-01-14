import { doesBikeMatchOneFilter, doesBikeMatchNumberFilter, doesBikeMatchArrayFilter } from '../helpers/filterHelpers.js'

export default({
	namespaced: true,
	state: {
		motorcyclesList: [],
		brandsList: [],
		modelsList: [],
		typesList: [],
		filterObj: {},
		checkedTypesArray: [],
	},
	getters: {
		getMotorcyclesList: ({ motorcyclesList }) => motorcyclesList,
		getBrandsList: (state) => {
			state.motorcyclesList.map(motorcycle => state.brandsList.push(motorcycle.make));
			return state.brandsList = Array.from(new Set(state.brandsList)).sort();
		},
		getModelsList: (state) => {
			state.motorcyclesList.map(motorcycle => state.modelsList.push(motorcycle.model));
			return state.modelsList = Array.from(new Set(state.modelsList)).sort();
		},
		getTypesList: (state) => {
			state.motorcyclesList.map(motorcycle => state.typesList.push(motorcycle.type));
			return state.typesList = Array.from(new Set(state.typesList)).sort();
		},
		getMotorcycleById: (state) => (bikeId) => state.motorcyclesList.find(motorcycle => motorcycle.id == bikeId),
		getModelsListByBrand: (state) => (brand) => {
			let filteredModels = [];
			if (!brand) return state.getModelsList;
			else {
				state.motorcyclesList.filter(motorcycle => motorcycle.make == brand).map(motorcycle => filteredModels.push(motorcycle.model));
				return filteredModels.sort();
			}
		},
		getBrandByModel: (state) => (model) => {
			return state.motorcyclesList.find(motorcycle => motorcycle.model == model).make
		},
		getTypeByModel: (state) => (model) => {
			return state.motorcyclesList.find(motorcycle => motorcycle.model == model).type
		},
		getFilteredList: ({ motorcyclesList, filterObj, checkedTypesArray }) => {
			let { brand, model, engineFrom, engineTo, priceMin, priceMax } = filterObj;
			let arr = checkedTypesArray;
			// console.log('brand', brand)
			// console.log('model', model)
			// console.log('engine', engineTo)
			// console.log('engine', engineFrom)
			// console.log('priceMin', priceMin)
			// console.log('priceMax', priceMax)
			// console.log('filterArr:', arr)

			if (!brand && !model && !engineFrom && !engineTo && !priceMin && !priceMax && !checkedTypesArray.length) {
				return motorcyclesList.sort((a, b) => a.make.localeCompare(b.make));
			} else {
				return motorcyclesList = motorcyclesList.filter(bike => {
					const brandMatch = doesBikeMatchOneFilter(bike, 'make', brand);
					const modelMatch = doesBikeMatchOneFilter(bike, 'model', model);
					const engineMatch = doesBikeMatchNumberFilter(bike, 'displacement', engineFrom, engineTo);
					const priceMatch = doesBikeMatchNumberFilter(bike, 'price', priceMin, priceMax);
					const typesMatch = doesBikeMatchArrayFilter(bike, 'type', arr);
					return brandMatch && modelMatch && engineMatch && priceMatch && typesMatch
				}).sort((a, b) => a.make.localeCompare(b.make))
			}

		},
	
	},
	mutations: {
		setMotorcyclesList(state, data) {
			state.motorcyclesList = data;
		},
		updateFilterObj(state, filterObjData) {
			state.filterObj = filterObjData;
		},
		updateCheckedTypesArray(state, typesArr) {
			state.checkedTypesArray = typesArr;
		},
	},
	actions: {
		loadMotorcyclesList({ commit }, data) {
			commit('setMotorcyclesList', data);
		},
		updateFilterObj({ commit }, filterObjData) {
			commit('updateFilterObj', filterObjData);
			// console.log('filterObjData: ', filterObjData)
		},
		updateCheckedTypesArray({ commit }, typesArr) {
			commit('updateCheckedTypesArray', typesArr);
			// console.log('typesArr ', typesArr)
		},
		
	},

})