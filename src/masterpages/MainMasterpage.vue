<template>
	<nav-bar/>
	<main>
		<loading-comp v-if="isLoading"/>
		<modal-window-component :modal-active="modalActive" @toggle-modal="toggleModal">
			<error-component>
				<template #button>
					<button class="button back" @click="goBackHome">
						<font-awesome-icon :icon="['fas', 'house']" />
						{{ $t('button.backHome') }}
					</button>
				</template>
			</error-component>
		</modal-window-component>
		<slot></slot>

	</main>
	<footer-component/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LoadingComp from '@/components/LoadingComp.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import ModalWindowComponent from '@/components/ModalWindowComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar, FooterComponent, LoadingComp, ErrorComponent, ModalWindowComponent
		},
		data() {
			return {
				modalActive: false
			}
		},
		computed: {
			...mapGetters(['isLoading', 'hasError']) 
		},
		watch: {
			hasError(newValue) {
				if (newValue) {
					this.modalActive = true;
				}
			}
		},
		methods: {
			...mapActions(['setError']),

			goBackHome() {
				this.$router.push({
					name: 'home'
				});
				this.setError(null);
			},
			toggleModal() {
				this.modalActive = !this.modalActive;
			},
		},

		
	}
</script>

<style lang="scss" scoped>
.back{
	padding: .75rem 1rem;
	border-radius: 10px;
}

</style>