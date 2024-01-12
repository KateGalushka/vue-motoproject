<template>
	<nav-bar/>
	<loading-comp v-if="isLoading"/>
	<slot></slot>
	<footer-component/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LoadingComp from '@/components/LoadingComp.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapGetters } from 'vuex';

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar, FooterComponent, LoadingComp
		},
		computed: {
			...mapGetters(['isLoading']) 
		},
	}
</script>

<style lang="scss" scoped>

</style>