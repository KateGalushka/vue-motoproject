<template>
	<modal-window-component :modal-active="modalActive" @toggle-modal="toggleModal">
		<error-component />
	</modal-window-component>
	<div class="wrapper login">
		<div class="login-container">
			<div class="login__image">
				<img src="../assets/images/bg/loginImg.jpg">
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
						<button 
							:disabled="!isDataValid"
							class="button btn-login"
							@click="loginWithEmailAndPassword(user)"
						>
							{{ $t('button.login') }}
						</button>
						<button 
							:disabled="!isDataValid"
							class="button btn-login"
							@click="registerWithEmailAndPassword(user)"
						>
							{{ $t('button.register') }}
						</button>
				</div>
				<div class="login__buttons">
						<button class="button btn-login-google" @click="onLoginWithGoogle">
							<span>{{ $t('button.withGoogle') }}</span>
						</button>
				</div>
			</div>
		</div>
		<router-link :to="{ name: 'home' }" class="button back">
			<font-awesome-icon :icon="['fas', 'house']" />
			{{ $t('button.backHome') }}
		</router-link>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CurrentLangComponent from '@/components/CurrentLangComponent.vue';
import ModalWindowComponent from '@/components/ModalWindowComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

	export default {
		name: 'LoginPage',
		components: { CurrentLangComponent, ErrorComponent, ModalWindowComponent},

		data() {
			return {
				valid: false,
				show: false,
				user: {
					email: null,
					password: null
				},
			
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

				modalActive: false
			}
		},

		computed: {
			...mapGetters(['hasError']),

			isDataValid() {
				return this.user.email && this.user.password
			},
			
			isEng() {
				return this.$i18n.locale == 'en'? true :false
			},
			errorMsg1() {
				return this.$i18n.locale == 'en' ? "User is already registered - please, login" : "Користувач вже зареєстрований - будь ласка, увійдіть"
			},
			errorMsg2() {
				return this.$i18n.locale == 'en'? "User not found - please, register (sign up)" : "Користувач не знайдений - будь ласка, зареєструйтесь"
			},
			
		},
		watch: {
			hasError(newValue) {
				if (newValue) {
					this.modalActive = true;
				}
			}
		},
		beforeUnmount() {
			this.setError(null);
		},
		methods: {
			...mapActions('auth', ['loginWithGoogle', 'signUpWithWithEmailAndPassword', 'signInWithWithEmailAndPassword']),
			...mapActions(['setError']),

			toggleModal(){
				this.modalActive = !this.modalActive;
			},

			async onLoginWithGoogle() {
				try {
					const success = await this.loginWithGoogle();
					if (success) {
						this.$router.go(-1)
					}
				}
				catch (error) {
					this.setError(error);
				}
			},
			async registerWithEmailAndPassword(user) {
				const {email, password} = user
				try {
					await this.signUpWithWithEmailAndPassword({email, password});
					this.$router.push({
						name: 'home'
					})
				}
				catch (error) {
					if (error =="Firebase: Error (auth/email-already-in-use).") {
						this.setError(this.errorMsg1);
						// alert(this.errorMsg1);
					}
				}
			},

			async loginWithEmailAndPassword(user) {
				const { email, password } = user
				try {
					await this.signInWithWithEmailAndPassword({email, password});
					this.$router.go(-1);
				}
				catch (error) {
					if (error.message == "Firebase: Error (auth/invalid-credential).") {
						this.setError(this.errorMsg2);
						// alert(this.errorMsg2);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login {
	min-height: 85vh;
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
	&[disabled] {
		background-color: rgba(167, 185, 201, 0.5);
	}
}
.btn-login-google {
	background-color: rgba(211, 175, 55, 0.8);
	position: relative;
	display: block;
	& span::before {
		content: url('../assets/images/logo/google-logo.png');
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
	
}
</style>