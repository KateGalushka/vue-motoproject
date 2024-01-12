<template>
	<main-masterpage>
		<div class="card-container">
			<div class="notFound">
				<div class="notFound__title">
					<font-awesome-icon :icon="['fas', 'ban']" beat size="2x" />
					<h3>404 - {{ $t('pageNotFound.notFound') }}</h3>
				</div>
					<p>{{ $t('pageNotFound.possibleReasons') }}:</p>
					<ul>
						<li>{{ $t('pageNotFound.incorrectURL') }};</li>
						<li>{{ $t('pageNotFound.exists') }};</li>
						<li>{{ $t('pageNotFound.unavailable') }}.</li>
					</ul>	
			</div>
			<router-link :to="{ name: 'home' }" class="button back">
					<font-awesome-icon :icon="['fas', 'house']" />
					{{ $t('button.backHome') }}
			</router-link>
		</div>

	</main-masterpage>
</template>

<script>
import MainMasterpage from '@/masterpages/MainMasterpage.vue';
	export default {
		name: 'PageNotFound',
		components: {
			MainMasterpage,
		},
	}
</script>

<style lang="scss" scoped>
.card-container {
	&::after	{
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background-image: var(--bg-img1);
		background-size: cover;
		background-repeat: repeat-y;
		background-attachment: fixed;
		opacity: .3;
	}
}

.notFound {
	background-color: var(--bg-color1);
	margin: 3em;
	padding: 2em;
	border-radius: 10px;
	h3 {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--main-color2);
	}
	p{
		margin-bottom: 0.5rem;
	}
	ul, li {
		list-style: circle;
	}
}
.notFound__title{
	display: flex;
	gap: 2em;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 2em;
}
.back {
	padding: .75rem 2.25rem;
	border-radius: 10px;
	align-self: center;
}
@media (max-width:570px) {
	.card-container {
		padding: 1rem;
	}
	.notFound__title {
		margin-bottom: 1em;
	}
	.notFound {
		margin: 1em;
		h3 {
		font-size: 1.25rem;
		}
	}
	p, li, .back {
		font-size: 0.875rem;
	}
	
}
</style>