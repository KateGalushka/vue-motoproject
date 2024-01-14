<template>
	<div class="error-container">
		<div class="error__content">
			<h3 >Something went wrong...</h3>
			<font-awesome-icon :icon="['fas', 'bug']" flip size="2x" style="animation-duration:3s;"/>
			<h2>{{ hasError }}</h2>

		</div>
		<router-link :to="{ name: 'home' }" class="button back">
			<font-awesome-icon :icon="['fas', 'house']" />
			{{ $t('button.backHome') }}
		</router-link>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
		name: 'ErrorComponent',
		
		computed: {
			...mapGetters(['hasError']) 
		},
	}
</script>

<style lang="scss" scoped>

.error-container {
	max-width: 80em;
	min-height: 100%;
	margin: 0 auto .25em;
	border-radius: 10px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1.5em;
	gap: 1em;
	&::after
	{
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background-image: var(--bg-img2);
		background-size: 25% 25%;
		background-repeat: repeat;
		background-attachment: fixed;
		opacity: .2;
	}
	h3 {
		margin-bottom: 1em;
	}
	h2 {
		margin-top: 1em;
	}
}
.error__content {
	font-size: 1.5rem;
	min-width: 40%;
	background-color: var(--bg-color1);
	text-align: center;
	padding: 1em;
	border-radius: 10px;

}
.back{
	padding: .75rem 1rem;
	border-radius: 10px;
}


</style>