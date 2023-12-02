<template>
	<nav-bar/>
	<slot></slot>
</template>

<script>
import NavBar from '../components/NavBar.vue'

	export default {
		name: 'MainMasterpage',
		components: {
			NavBar,
		},
	}
</script>

<style lang="scss" scoped>

</style>