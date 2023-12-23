<template>
	<div class="wrapper gallery">
		<h1 class="gallery__title">{{ $t('gallery.title') }}</h1>
		<div class="gallery__container">
			<div v-for="img in gallery" :key="img.id" :class="img.id" class="gallery__item-img">
				<img :src="img.src">
			</div>
			<div v-for="fact in facts" :key="fact.id" :class="fact.id" class="gallery__item-txt">
				<p v-if="isEng">{{ fact.en }} </p>
				<p v-else>{{ fact.ua }} </p>
			</div>
		</div>

	</div>
</template>

<script>
import { images } from '@/store/data/gallery';
import { facts } from '@/store/data/motofacts';

	export default {
		name: 'GalleryComponent',
		data() {
			return {
				gallery: images,
				facts: facts
			}
		},
		computed: {
			isEng() {
				return this.$i18n.locale == 'en'
			},
		},
	}
</script>

<style lang="scss" scoped>
.gallery__title {
	text-align: center;
	font-weight: 600;
	font-size: 2rem;
	padding: 2rem 0 1rem;
}
.gallery__container{
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	justify-content: center;
	// align-items: center;
	// place-items: center;
	gap: 1.25em;
	max-width: 90%;
	margin: 0 auto;
	padding-bottom: 2em;
}

.gallery__item-img {
	max-width: 370px;
	img {
		width: 100%;
		object-fit: cover;
	}
}
.gallery__item-txt {
	max-width: 370px;
	max-height: 370px;
	line-height: 1.5;
	letter-spacing: 1px;
	text-indent: 1.5rem;
	text-align: justify;
	display: flex;
	align-items: center;
	padding: 1rem;
	border: 2px solid var(--main-color1);
}

@mixin set-order($class-name, $class-number) {
  .#{$class-name}#{$class-number} {
    order: $class-number * 2 - 1;
  }
}

@for $i from 1 through 6 {
    @include set-order('image', $i);
    @include set-order('txt', $i);
  }

@media (max-width:768px) {
	.gallery__item-txt{
		font-size: 0.875rem;
	}
}
@media (max-width: 599px) {
	.gallery__container {
		place-items: center;
	}
}

</style>