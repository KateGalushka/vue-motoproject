import {storage} from '@/firebase-config';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export default {
	namespaced: true,
	state: () => ({
		imagesReferences: [],
	}),
	getters: {
		getImagesReferences: (state) => state.imagesReferences
	},
	mutations: {
		setImagesReferences(state, array) {
			state.imagesReferences = array;
		}
	},
	actions: {
		async fetchImagesUrlsFromStorage({ commit }) {
			commit('setLoading', true, { root:true });
			commit('setError', null, { root: true });
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
				commit('setError', error, { root: true });
			} finally {
				commit('setLoading', false, { root: true });
			}
		},
	}
}