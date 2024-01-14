<template>
	<nav-bar/>
	<main>
		<loading-comp v-if="isLoading"/>
		<error-component v-if="hasError"/>
		<slot></slot>
	</main>
	<footer-component/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LoadingComp from '@/components/LoadingComp.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapGetters } from 'vuex';

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar, FooterComponent, LoadingComp, ErrorComponent
		},
		computed: {
			...mapGetters(['isLoading', 'hasError']) 
		},
	}
</script>

<style lang="scss" scoped>

</style>