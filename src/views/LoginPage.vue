<template>
	<div class="wrapper login">
		<div class="login-container">
			<div class="login__image">
				<img src="../assets/images/loginImg.png">
			</div>
			<div class="login__form">
				<h4>Login</h4>
				<div class="login__form-inputs">
					<v-form v-model="valid" >
	    				<v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							type="email"
							append-icon="mdi-email"
							variant="outlined"
							clearable
							hide-details="auto"
							required
							class="mb-4"
						/>	
						<v-text-field
							v-model="password"
							:rules="passwordRules"
							label="Password"
							variant="outlined"
							:append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							hint="Enter your password (minimum 6 characters)"
							clearable
							hide-details="auto"
							required
							class="mb-4"
							@click:append="show = !show"
						></v-text-field>
	 			 	</v-form>
				</div>
				<div class="login__buttons">
						<button class="button btn-login">Login</button>
						<button class="button btn-login">Register</button>
				</div>
				<div class="login__buttons">
						<button class="button btn-login-google">
							<span>Login with Google</span>
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
	export default {
		name: 'LoginPage',
		data() {
			return {
				valid: false,
				show: false,
			
				emailRules: [
					value => {
						if (value) return true

						return 'E-mail is requred.'
					},
						value => {
							if (/.+@.+\..+/.test(value)) return true

							return 'E-mail must be valid.'
						},
				],

				passwordRules: [
					value => {
						if (value) return true

						return 'Password is required.'
					},
					value => {
						if (value?.length >= 6) return true

						return 'Password must be 6 characters at least.'
					},
			],
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
	// max-width: 75vw;
	margin-bottom: 2em;
	
}
.login__image {
	max-width: 500px;
	max-height: 500px;
	margin-right: -3em;
	flex: 1 1 400px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: -10% 50%;
		
	}
}
.login__form {
	background: var(--bg-gradient);
	flex: 1 2 50%;
	max-width: 500px;
	z-index: 3;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
	border-radius: 3em 0 0 3em;
	padding: 2em;
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

}
</style>