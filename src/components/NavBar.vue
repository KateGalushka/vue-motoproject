<template>
	<div class="wrapper navbar">
		<img class="logo-img" src="../assets/images/logoMain2.svg" alt="logo-main">
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link :to="{ name: 'guide' }">Motorcycles Guide</router-link> |
			<router-link :to="{ name: 'guide' }">Motorcycles Guide</router-link> |
			<router-link :to="{ name: 'contacts' }">Contacts</router-link> |
		</nav>

	</div>
</template>

<script>
export default {
	name: 'NavBar'
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