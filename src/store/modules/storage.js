import {storage} from '@/firebase-config';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export default {
	namespaced: true,
	state: () => ({
		imagesReferences: [],
		
		loading: false,
		error: null,
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getImagesReferences: (state) => state.imagesReferences
		
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
		setImagesReferences(state, array) {
			state.imagesReferences = array;
		}
	},
	actions: {
		async fetchImagesUrlsFromStorage({ commit }) {
			commit('setLoading', true);
			commit('setError', null)
			try {
				const folderRef = ref(storage, 'motoImages');
				const folderList = await listAll(folderRef);
				// Extract image names and fetch download URLs for each image
				const imageUrls = await Promise.all(
					folderList.items.map(async (item) => {
						const url = await getDownloadURL(item);
						return { name: item.name, url };
					})
				);
				commit('setImagesReferences', imageUrls);
				// console.log(imageUrls)

			} catch (error) {
				console.error('Error fetching image names:', error);
				commit('setError', error)
			} finally {
				commit('setLoading', false)
			}
		},
	}
}