<template>
	<div class="wrapper main">
		<div class="home">
			<div class="home__descr">
				<transition name="title" appear>
					<div class="home__descr-title">
						<h1>{{ $t('homepage.mainTitle1') }}</h1>
						<h2>{{ $t('homepage.mainTitle2') }}</h2>
					</div>
				</transition>
				<transition name="descr" appear>
					<div>
						<p>{{ $t('homepage.mainText') }}</p>
					</div>
				</transition>
			</div>
					
			<swiper 
				:slides-per-view="1"
				:space-between="20"
				:speed="800"
				:modules="modules"
				:pagination="{
					clickable: true,
					dynamicBullets: true,
				}" 
				:loop="true"
				:centered-slides="true"
				:autoplay="{
					delay: 3500,
					disableOnInteraction: true,
					// pauseOnMouseEnter: true
				}"
				:effect="'fade'"
				class="mySwiper"
			>
				<swiper-slide v-for="(slide, index) in swiperSlides" :key="index" class="mySwiper__slide">
					<div class="mySwyper__slide-picture">
						<img :src="slide.imgSrc">
					</div>
				</swiper-slide>
				
			</swiper>
		</div>
					
	</div>
</template>

<script>

	import { Swiper, SwiperSlide } from 'swiper/vue';
	import 'swiper/scss';
	import 'swiper/scss/pagination';
	import 'swiper/scss/effect-fade';
	import 'swiper/scss/autoplay';
	import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

export default {
	name: 'HomeComponent',
	components: {
		Swiper, SwiperSlide
	},
	data() {
		return {
			modules: [Pagination, EffectFade, Autoplay],
			swiperSlides: [
				{ imgSrc: require("@/assets/images/main1.jpg") },
				{ imgSrc: require("@/assets/images/main2.jpg") },
				{ imgSrc: require("@/assets/images/main3.jpg") },
				{ imgSrc: require("@/assets/images/main4.jpg") },
				{ imgSrc: require("@/assets/images/main5.jpg") },
				{ imgSrc: require("@/assets/images/main6.jpg") },
				// { imgSrc: require("@/assets/images/main7.jpg") },
			]
		}
	},
}
</script>

<style lang="scss" scoped>
	@import url('@/assets/styles/_mySwiper.scss');

.home{
	min-height: calc(100vh - 8.75em);
	position: relative;
	display: flex;
	align-items: center;
	padding: 1.75rem;
	// background: var(--bg-img-main) right -7em center no-repeat, var(--bg-grad-main) center center no-repeat;
	// background-size: cover;
	color: #fff;
	border-radius: 10px;
	margin-bottom: .5em;
}
.home__descr{
	position: absolute;
	z-index: 3;
	text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);
	margin-left: 1em;
	h1, h2{
		font-size: 2.5rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 2px;
		
	}
	p{
		font-size: 1.25rem;
		width: 31.25rem;
		line-height: 2rem;
		text-indent: 2rem;
		background-color: rgba(37, 44, 51, 0.7);
		padding: 1rem;
		border-radius: 10px;
	}
}
.home__descr-title {
	margin-bottom: 2em;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	h2 {
		align-self: flex-end;
	}

}
.title-enter-from{
	opacity:0;
	transform: translateX(-100%);
}
.title-enter-active{
	transition: all 0.5s ease;
}
.descr-enter-from{
	opacity:0;
	transform: translateX(-100%);
}
.descr-enter-active{
	transition: all 1s ease;
}

@media (max-width:992px) {
	.home {
		padding: 1rem;
	}
	.home__descr{
		h1,h2 {
			font-size: 2rem;
		}
		p {
			font-size: 1rem;
			line-height: 1.5rem;
			width: 25rem;
		}
	}
}
@media (max-width:768px) {
	.home {
		justify-content: center;
		align-items: flex-end;
	}
	.home__descr{
		margin-left: 0;
		margin-bottom: 2em;
		padding: 0 2rem;
		text-align: center;
		p {
			text-indent: 0;
			width: auto;
		}
	}
	.home__descr-title {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 1em;
	}

}
@media (max-width:570px) {
	.home__descr {
		h1, h2 {
			font-size: 1.75rem;
		}
		p {
			font-size: 0.875rem;
			padding: 0.5rem;
		}
	}
}
@media (max-width:515px) {
	.home__descr-title {
		flex-direction: column;
		h1 {
			align-self: flex-start;
		}
		h2 {
			align-self: flex-end;
		}
	}
}

</style>