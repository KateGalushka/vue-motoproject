<template>
	<main-masterpage>
		<main>
			<section class="home">
				<home-component/>
			</section>
			<section class="gallery">
				<gallery-component/>
			</section>
		</main>
	</main-masterpage>
 
</template>

<script>
import MainMasterpage from '../masterpages/MainMasterpage.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import GalleryComponent from '@/components/GalleryComponent.vue';

export default {
	components: {
		MainMasterpage, HomeComponent, GalleryComponent
	},
}

</script>

