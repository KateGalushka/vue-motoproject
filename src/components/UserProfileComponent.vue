<template>
	<div v-if="getUser" class="user-profile">
		<span>{{ getUser.displayName ?? getUser.email }}</span>
		<img :src="imgSrc">
		<!-- <img src="./../assets/images/user.png"> -->
		<button class="button login-btn" @click="onLogout">
			<font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
			<!-- <span class="material-symbols-outlined">logout</span> -->
				<!-- <span>{{ $t('nav.logout') }}</span> -->
		</button>
	</div>
	<div v-else>
		<button class="button login-btn" @click="onLogin">
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
			return this.getUser.photoURL ?? require('./../assets/images/logo/user.png')
		}
	},
	methods: {
		...mapActions('auth', ['logout']),

		onLogin() {
			this.$router.push({
				name: 'login'
			})

		},

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
	padding:  0.4rem 0.75rem;
	border-radius: 5px;
}

@media (max-width:768px) {
	.user-profile, .login-btn {
		font-size: 1rem;
	}
}
</style>