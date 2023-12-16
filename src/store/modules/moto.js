import { doesBikeMatchOneFilter, doesBikeMatchNumberFilter, doesBikeMatchArrayFilter } from '../helpers.js'

export default({
	namespaced: true,
	state: {
		motorcyclesList: [],
		brandsList: [],
		modelsList: [],
		typesList: [],
		filterObj: {},
		checkedTypesArray: [],
		favoriteList: [22,1]

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
				return motorcyclesList;
			} else {
				return motorcyclesList = motorcyclesList.filter(bike => {
					const brandMatch = doesBikeMatchOneFilter(bike, 'make', brand);
					const modelMatch = doesBikeMatchOneFilter(bike, 'model', model);
					const engineMatch = doesBikeMatchNumberFilter(bike, 'displacement', engineFrom, engineTo);
					const priceMatch = doesBikeMatchNumberFilter(bike, 'price', priceMin, priceMax);
					const typesMatch = doesBikeMatchArrayFilter(bike, 'type', arr);
					return brandMatch && modelMatch && engineMatch && priceMatch && typesMatch
				})
			}

		},
		getFavoriteList: ({ favoriteList }) => favoriteList,
		getFavoriteListCompleted: (state, getters) => {
			let favorites = [];
			state.favoriteList.forEach(id => favorites.push(getters.getMotorcycleById(id)));
			return favorites;
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
		addToFavorites(state, motorcycleId) {
			state.favoriteList.push(motorcycleId);
		},
		removeFromFavorites(state, motorcycleId){
			state.favoriteList = state.favoriteList.filter(id => id !== motorcycleId);
			console.log('after remove ', state.favoriteList)
		}

		//   filterList(state, filterData){
		// 	  let {brand, model, engineFrom, engineTo, priceMin, priceMax, filterArr } = filterData;
		// 	  console.log('brand', brand)
		// 	  console.log('model', model)
		// 	  console.log('engine', engineTo)
		// 	  console.log('engine', engineFrom)
		// 	  console.log('priceMin', priceMin)
		// 	  console.log('priceMax', priceMax)
		// 	  console.log('filterArr:', filterArr )
		// 	  if (!brand && !model && !engineFrom && !engineTo && !priceMin && !priceMax && !filterArr.length) {
		// 		return 
		// 	  }

		// 	  return state.filteredList = state.motorcyclesList.filter(bike => {
		// 		  const brandMatch = doesBikeMatchOneFilter(bike, 'make', brand);
		// 		  const modelMatch = doesBikeMatchOneFilter(bike, 'model', model);
		// 		  const engineMatch = doesBikeMatchNumberFilter(bike, 'displacement', engineFrom, engineTo);
		// 		  const priceMatch = doesBikeMatchNumberFilter(bike, 'price', priceMin, priceMax);
		// 		  const typesMatch = doesBikeMatchArrayFilter(bike, 'type', filterArr);
		// 		  return brandMatch && modelMatch && engineMatch && priceMatch && typesMatch
		// 	  })
		//   },
		//   updateListAfterClearFilters(state){
		// 	state.filteredList.length = 0;
		// 	  console.log('state.filteredList after clear: ', state.filteredList);

		//   }
	},
	actions: {
		loadMotorcyclesList({ commit }, data) {
			commit('setMotorcyclesList', data);
		},
		updateFilterObj({ commit }, filterObjData) {
			commit('updateFilterObj', filterObjData);
			console.log('filterObjData: ', filterObjData)
		},
		updateCheckedTypesArray({ commit }, typesArr) {
			commit('updateCheckedTypesArray', typesArr);
			console.log('typesArr ', typesArr)
		},
		toggleIsFavorite({ commit, dispatch, getters }, motorcycleId) {
			const isIncludedInFavorList = getters.getFavoriteList.find(id => id == motorcycleId);
			if (!isIncludedInFavorList) {
				commit('addToFavorites', motorcycleId)
			} else {
				dispatch('removeFromFavorites', motorcycleId)
			}
		},
		removeFromFavorites({ commit }, motorcycleId){
			commit('removeFromFavorites', motorcycleId)
		}

		//   	onFilter({ commit }, filterData){
		// 		console.log('filterData:', filterData)
		// 		commit('filterList', filterData)
		//   },
		//   updateListAfterClearFilters({commit}){
		// 	  commit('updateListAfterClearFilters')
		//   }
	},




})