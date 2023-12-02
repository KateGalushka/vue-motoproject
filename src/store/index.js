import { createStore } from "vuex";
import { doesBikeMatchOneFilter, doesBikeMatchNumberFilter, doesBikeMatchArrayFilter } from './helpers.js'
// import { doesBikeMatchOneFilter, doesBikeMatchNumberFilter } from './helpers.js'

export default createStore({
  state: {
	motorcyclesList:[],
	brandsList:[],
	modelsList: [],
	typesList: [],
	// filterObj: {},
	// typesArray: [],
	filteredList:[]

  },
  getters: {
	  getMotorcyclesList: ({ motorcyclesList }) => motorcyclesList,
	  getBrandsList: (state) => {
		state.motorcyclesList.map(motorcycle => state.brandsList.push(motorcycle.make));
		return state.brandsList = Array.from(new Set(state.brandsList)).sort();
	  },
	  getModelsList: (state)=>{
		  state.motorcyclesList.map(motorcycle => state.modelsList.push(motorcycle.model));
		  return state.modelsList = Array.from(new Set(state.modelsList)).sort();
	  },
	  getTypesList: (state)=> {
		  state.motorcyclesList.map(motorcycle => state.typesList.push(motorcycle.type));
		  return state.typesList = Array.from(new Set(state.typesList)).sort();

	  },
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
	  getFilteredList: ({ filteredList }) => filteredList,
	
  },
  mutations: {
		setMotorcyclesList(state, data){
			state.motorcyclesList = data;
		},
	
	  filterList(state, filterData){
		  let {brand, model, engineFrom, engineTo, priceMin, priceMax, filterArr } = filterData;
		  console.log('brand', brand)
		  console.log('model', model)
		  console.log('engine', engineTo)
		  console.log('engine', engineFrom)
		  console.log('priceMin', priceMin)
		  console.log('priceMax', priceMax)
		  console.log('filterArr:', filterArr )
		  
		  return state.filteredList = state.motorcyclesList.filter(bike => {
			  const brandMatch = doesBikeMatchOneFilter(bike, 'make', brand);
			  const modelMatch = doesBikeMatchOneFilter(bike, 'model', model);
			  const engineMatch = doesBikeMatchNumberFilter(bike, 'displacement', engineFrom, engineTo);
			  const priceMatch = doesBikeMatchNumberFilter(bike, 'price', priceMin, priceMax);
			  const typesMatch = doesBikeMatchArrayFilter(bike, 'type', filterArr);
			  return brandMatch && modelMatch && engineMatch && priceMatch && typesMatch
		  })
	  },
	  updateListAfterClearFilters(state){
		state.filteredList.length = 0;
		  console.log('state.filteredList after clear: ', state.filteredList);
		
	  }
  },
  actions: {
		loadMotorcyclesList({ commit }, data){
			commit('setMotorcyclesList', data);
		},
	 
	  	onFilter({ commit }, filterData){
			console.log('filterData:', filterData)
			commit('filterList', filterData)
	  },
	  updateListAfterClearFilters({commit}){
		  commit('updateListAfterClearFilters')
	  }
  },
  modules: {},
});
