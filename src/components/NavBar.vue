<template>
	<header class="wrapper navbar" :class="{'open': isMenuOpen}">
		<img class="logo-img" src="../assets/images/logoMain2.svg" alt="logo-main">
		<button class="navbar__burger-btn" @click="toggleMenu">
			<span></span>
			<span></span>
			<span></span>
		</button>
		<div class="navbar__menu" >
			<nav class="navbar__menu-links">
				<router-link to="/">
					<font-awesome-icon :icon="['fas', 'house']" />
					{{ $t('nav.home') }}
				</router-link> 
				<router-link :to="{ name: 'guide' }">{{ $t('nav.guide') }}</router-link> 
				<router-link :to="{ name: 'favorites' }">
					<v-badge
						:content="favoritesCount"
						color="rgb(0, 190, 216)"
						bordered
						floating
						offset-x="-5"
						offset-y="10"
					>
						{{ $t('nav.favorites') }} 
					</v-badge>
				</router-link>
				<!-- <router-link :to="{ name: 'favorites' }">{{ $t('nav.gallery') }}</router-link>  -->
				<router-link :to="{ name: 'contacts' }">{{ $t('nav.contacts') }}</router-link> 
			</nav>
			<div class="navbar__user">
				<current-lang-component/>
				<user-profile-component/>
			</div>
		</div>
		
	</header>
</template>

<script>
import { mapGetters } from 'vuex';
import CurrentLangComponent from './CurrentLangComponent.vue';
import UserProfileComponent from './UserProfileComponent.vue';

export default {
    name: 'NavBar',
    components: { CurrentLangComponent, UserProfileComponent },
	 data() {
		return {
			isMenuOpen: false
		}
	 },
	 computed: {
		...mapGetters('favorites', ['getFavoriteList']),

		favoritesCount() {
			return this.getFavoriteList.length 
		} 
	 },
	 methods: {
		toggleMenu() {
			return this.isMenuOpen = this.isMenuOpen? false: true;
		}
	 },
}
</script>

<style lang="scss" scoped>
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
	// padding-bottom: 1em;
}

.logo-img {
	width: 125px;
	border-radius: 10px;
	z-index: 5;
}
.navbar__burger-btn {
	position: relative;
	width: 40px;
	height: 40px;
	margin-right: 1em;
	display: none;
	background-color: transparent;
	border: none;
	outline: none;
	z-index: 5;
	span {
		position: absolute;
		display: block;
		width: 30px;
		height: 4px;
		left: 5px;
		// color: var(--main-color1);
		background-color: var(--main-color1);
		transition: all .4s ease-out;
		&:nth-child(1){
			transform: translateY(-10px);
		}
		&:nth-child(3){
			transform: translateY(10px);
		}
	}
}
.navbar__menu {
	display: flex;
	justify-content: space-between;
	align-items: center;
	// width: 75%;
	z-index: 4;
	gap: clamp(1rem, 2rem, 3rem)
}

a {
	font-weight: bold;
	transition: all .3s ease-in;
	margin: 0 1em;
	&:hover{
		color: var(--main-color2);
		// border-bottom: 2px solid var(--main-color2);
		text-decoration: underline;
	}
	&.router-link-exact-active	{
		color: var(--main-color2);
		text-decoration: underline;
		// border-bottom: 2px solid var(--main-color2);
	}
}
.navbar__menu-links{
	display: inline-flex;
	gap: 1rem;
	line-height: 1.25;
	text-align: center;
	// margin-right: 2em;
}
.navbar__user {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 1rem;
	// margin-left: 2rem;
}

@media (max-width:992px) {
	.navbar__burger-btn {
		display: block;
	}
	.navbar__menu {
		position: absolute;
		top: -25rem;
		right:0;
		height: 25rem;
		width: 100%;
		flex-direction: column;
		align-items: end;
		justify-content: end;
		gap: 1rem;
		background-color: var(--bg-color2);
		color: var(--bg-color1);
		padding: 1rem 4.5rem;
		border-radius: 10px;
		visibility: hidden;
		transition: transform .5s ease-out;
		a {
			padding: .375rem 0;
		}
	}
	.navbar__menu-links{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.navbar__user {
		// flex-direction: row;
	}
	.navbar.open{
		.navbar__menu{
			transform: translateY(25rem);
			opacity: .95;
			visibility: visible;
			font-size: 1.125rem;
		}
		.navbar__burger-btn span {
			background-color: var(--bg-color1);
		}
		.navbar__burger-btn span:nth-child(1){
				transform: translateY(0) rotate(45deg);
			}
		 .navbar__burger-btn span:nth-child(2){
			opacity: 0;
		}
		.navbar__burger-btn span:nth-child(3){
			transform: translateY(0) rotate(-45deg);
		}
	}
	
	.navbar__user {
		padding-right: .5rem;
	}
}
@media (max-width:768px) {
	.logo-img {
		width: 100px;
	}
	.navbar__menu{
		height: 23.75rem;
		a {
			font-size: 1rem;
		}
	}
}

@media (max-width:525px){
	.logo-img {
		width: 75px;
	}
	.navbar__menu,
	.navbar__menu-links,
	.navbar__user {
		align-items: center;
		// justify-content: end;

	}
}



</style>