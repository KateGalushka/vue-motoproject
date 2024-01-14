<template>
	<nav-bar/>
	<main>
		<loading-comp v-if="isLoading"/>
		<error-component v-else-if="hasError">
			<template #button>
				<button class="button back" @click="goBackHome">
					<font-awesome-icon :icon="['fas', 'house']" />
					{{ $t('button.backHome') }}
				</button>
			</template>
		</error-component>
		<template v-if="!hasError">
			<slot></slot>

		</template>
	</main>
	<footer-component/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LoadingComp from '@/components/LoadingComp.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar, FooterComponent, LoadingComp, ErrorComponent
		},
		computed: {
			...mapGetters(['isLoading', 'hasError']) 
		},
		methods: {
			...mapActions(['setError']),

			goBackHome() {
				this.$router.push({
					name: 'home'
				});
				this.setError(null);
			}
		},

		
	}
</script>

<style lang="scss" scoped>
.back{
	padding: .75rem 1rem;
	border-radius: 10px;
}

</style>