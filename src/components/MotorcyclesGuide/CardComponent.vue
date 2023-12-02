<template>
	<div class="card">
		<img class="card__img" :src="isImage" alt="{{motorcycle.model}}">
		<h3>
			{{motorcycle.make}} {{ motorcycle.model }}
		</h3>
		<div class="card__descr">
			<p>{{ motorcycle.displacement }}</p>
			<p>{{ motorcycle.power }}</p>
		</div>
		<div class="card__moto-type">
			Type: <span>{{ motorcycle.type }}</span>
		</div>
		<div class="card__price">
			€{{ motorcycle.price}}
		</div>
		
		<button class="button button-details">Details</button>

	</div>
</template>

<script>
	export default {
		name: 'CardComponent',
		props: {
			motorcycle: {
				type: Object,
				required: true
			},
		},
		computed: {
			isImage() {
				return this.motorcycle.imgSrc? this.motorcycle.imgSrc : require('@/assets/images/adv_bike.svg')
			}
		},
	}
</script>

<style lang="scss" scoped>
.card{
	background-color: var(--bg-color1);
	color: var(--main-color1);
	width: clamp(298px, 18.65rem, 25%);
	border-radius: 0.625rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	h3{
		text-align: center;
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1.25rem;
	}
}
.card__img{
	width: 100%;
	height: calc(45% - 2rem);
	object-fit: cover;
	background: var(--bg-gradient);
	margin-bottom: 1.25rem;
	transition: all .5s ease-in;
	&:hover{
		transform: scale(1.1);
		border: 3px solid var(--main-color2);
		border-radius: 10px;
	}
}
.card__descr{
	text-align: left;
	margin-bottom: 1rem;
	p::before{
		content:'';
		display: inline-block;
		width: 1.25rem;
		height: 1.25rem;
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(211, 175, 55)"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>') center no-repeat;
		margin-right: .625rem; 
	}
}
.card__price{
	font-size: 1.5rem;
	font-weight: 600;
	text-align: center;
	margin-bottom: 1.25rem;
}
.card__moto-type{
	font-size: 1.125rem;
	margin-bottom: 1.25rem;
	// text-align: center;
	span{
		color: var(--main-color2);
		font-style: italic;
		font-size: 1.25rem;
	}
}
.button-details{
	padding: .5em 2em;
	border-radius: 10px;
	display: block;
	margin: 0 auto;
}




</style>