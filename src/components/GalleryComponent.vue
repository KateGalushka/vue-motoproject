<template>
	<div class="wrapper gallery">
		<h1 class="gallery__title">Gallery</h1>
		<div class="gallery__container">
			<div class="gallery__item" v-for="img in gallery" :key="img.id">
				<img :src="img.src">
			</div>
			

		</div>

	</div>
</template>

<script>
import { images } from '@/store/data/gallery';

	export default {
		name: 'GalleryComponent',
		data() {
			return {
				gallery: images
			}
		},
	}
</script>

<style lang="scss" scoped>
.gallery__title {
	text-align: center;
	font-weight: 600;
	font-size: 2rem;
	padding: 2rem;
}
.gallery__container{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap:1rem;
	max-width: 90%;
	margin: 0 auto;
	padding-bottom: 3rem;
}
.gallery__item {
	img {
		max-width: 370px;
		object-fit: cover;
	}
}

</style>