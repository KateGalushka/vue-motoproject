<template>
	<nav-bar/>
	<slot></slot>
	<footer-component/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue';

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar, FooterComponent
		},
	}
</script>

<style lang="scss" scoped>

</style>