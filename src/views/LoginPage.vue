<template>
	<div class="wrapper login">
		<div class="login-container">
			<div class="login__image">
				<img src="../assets/images/loginImg.png">
			</div>
			<div class="login__form">
				<div class="login__lang">
					<current-lang-component/>
				</div>
				<h4>{{ $t('login.title') }}</h4>
				<div class="login__form-inputs">
					<v-form v-model="valid" >
	    				<v-text-field
							v-model="user.email"
							:rules="emailRules"
							:label="$t('login.email')"
							type="email"
							append-icon="mdi-email"
							variant="outlined"
							clearable
							hide-details="auto"
							required
							class="mb-4"
						/>	
						<v-text-field
							v-model="user.password"
							:rules="passwordRules"
							:label="$t('login.password')"
							variant="outlined"
							:append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							:hint='isEng? "Enter your password (minimum 6 characters)" : "Введіть пароль (мін. 6 символів)" '
							clearable
							hide-details="auto"
							required
							class="mb-4"
							@click:append="show = !show"
						></v-text-field>
	 			 	</v-form>
				</div>
				<div class="login__buttons">
						<button class="button btn-login">{{ $t('button.login') }}</button>
						<button class="button btn-login">{{ $t('button.register') }}</button>
				</div>
				<div class="login__buttons">
						<button class="button btn-login-google" @click="onLoginWithGoogle">
							<span>{{ $t('button.withGoogle') }}</span>
						</button>
				</div>
			</div>
		</div>
		<router-link :to="{ name: 'home' }" class="button back">
			<!-- <span class="material-symbols-outlined">backspace</span> -->
			{{ $t('button.backHome') }}
		</router-link>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrentLangComponent from '@/components/CurrentLangComponent.vue';

	export default {
		name: 'LoginPage',
		components: { CurrentLangComponent},

		data() {
			return {
				valid: false,
				show: false,
				user: {},
			
				emailRules: [
					value => {
						if (value) return true;
						return this.isEng? 'E-mail is requred.' : "Обов'язкове поле";
					},
						value => {
							if (/.+@.+\..+/.test(value)) return true;
							return this.isEng? 'E-mail must be valid.' : 'Невірний формат електронної пошти';
						},
				],

				passwordRules: [
					value => {
						if (value) return true;
						return this.isEng? 'Password is required.' : "Обов'язкове поле";
					},
					value => {
						if (value?.length >= 6) return true;
						return this.isEng? 'Password must be 6 characters at least.' : "Пароль повинен складатися з мінім. 6 символів ";
					},
				],
			}
		},

		computed: {
			isEng() {
				return this.$i18n.locale == 'en'? true :false;
			}
		},
		methods: {
			...mapActions('auth', ['loginWithGoogle']),

			async onLoginWithGoogle() {
				try {
					await this.loginWithGoogle();
						this.$router.push({
							name: 'home'
						})
				}
				catch (error) {
					alert(error.message);
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.login {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2em;
}
.login-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: .5em;
	margin-bottom: 2em;
}
.login__image {
	max-width: clamp(200px, 90%, 500px);
	max-height: 500px;
	margin-right: -3em;
	flex: 1 1 50%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: -10% 50%;
	}
}
.login__form {
	background: var(--bg-gradient);
	flex: 1 1 50%;
	max-width: clamp(200px, 90%, 500px);
	z-index: 3;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
	border-radius: 3em 0 0 3em;
	padding: 1.75em;
	h4 {
		font-size: 1.5rem;
		font-family: var(--font-first);
		font-style: normal;
		font-weight: 600;
	}
}

.login__form-inputs{ 
	color: var(--bg-color1);
	width: 100%;
}
.login__lang {
	align-self: flex-end;
	margin-bottom: 1em;
}
.login__buttons {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: .75em

}
.btn-login, .btn-login-google, .back {
	padding: .75rem 2.25rem;
	border-radius: 10px;
}
.btn-login-google {
	background-color: rgba(211, 175, 55, 0.8);
	position: relative;
	display: block;
	& span::before {
		content: url('../assets/images/google-logo.png');
		position: absolute;
		top: 50%;
		left: 10px;
		transform: translateY(-50%);
	}
}

@media (max-width:790px) {
	.login__image {
		margin-right: 0;
		margin-bottom: -3em;
		img {
			border-radius: 3em 3em 0 0;
			height: auto;
		}
	}
	.login__form {
		border-radius: 3em;
		padding: 1.5em;
	}
}
@media (max-width:425px) {
	.login {
		font-size: 0.875rem;
		h4 {
			font-size: 1rem;
		}
	}
	.login-form {
		
	}

}
</style>