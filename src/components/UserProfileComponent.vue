<template>
	<div v-if="getUser" class="user-profile">
		<span>{{ getUser.displayName }}</span>
		<img :src="imgSrc">
		<button class="button login-btn" @click="onLogout">
			<span class="material-symbols-outlined">logout</span>
				<!-- <span>{{ $t('nav.logout') }}</span> -->
		</button>
	</div>
	<div v-else>
		<button class="button login-btn" @click="loginWithGoogle">
			<!-- <span class="material-symbols-outlined">login</span> -->
				<span>{{ $t('nav.login') }}</span>
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'UserProfileComponent',

		computed: {
		...mapGetters('auth', ['getUser']),
		imgSrc(){
			return this.getUser.photoURL? this.getUser.photoURL : '../assets/images/user.jpg'
		}
	},
	methods: {
		...mapActions('auth', ['loginWithGoogle', 'logout']),

		onLogout() {
			this.logout()
			this.$router.push({
				name: 'home',
			})
		},
	},

	}
</script>

<style lang="scss" scoped>
.user-profile {
	display: flex;
	justify-content:flex-end;
	align-items: flex-end; 
	gap: 0.5em;
	img{
		border-radius: 5px;
		width: 2.25rem;
	}
}
.login-btn {
	padding:  0.5rem 0.75rem;
	border-radius: 5px;
}
.material-symbols-outlined{
	font-size: 16px;
}

@media (max-width:768px) {
	.user-profile, .login-btn {
		font-size: 1rem;
	}
}
</style>