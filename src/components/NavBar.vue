<template>
	<header class="wrapper navbar">
		<img class="logo-img" src="../assets/images/logoMain2.svg" alt="logo-main">
		<nav>
			<router-link to="/">{{ $t('nav.home') }}</router-link> |
			<router-link :to="{ name: 'guide' }">{{ $t('nav.guide') }}</router-link> |
			<router-link :to="{ name: 'favorites' }">{{ $t('nav.favorites') }}</router-link> |
			<router-link :to="{ name: 'contacts' }">{{ $t('nav.contacts') }}</router-link> |
		</nav>
		<current-lang-component/>
	</header>
</template>

<script>
import CurrentLangComponent from './CurrentLangComponent.vue';

export default {
    name: 'NavBar',
    components: { CurrentLangComponent }
}
</script>

<style lang="scss" scoped>
.navbar
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .75em;
}

.logo-img {
	width: 150px;
}

a {
	font-weight: bold;
	transition: all .3s ease-in;
	&:hover{
		color: var(--main-color2);
	}
	&.router-link-exact-active	{
		color: var(--main-color2);
	}
}</style>