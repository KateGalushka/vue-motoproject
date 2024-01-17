<template>
	<div class="wrapper">
		<router-view />
	</div>
  
</template>

<script>
import { mapActions } from 'vuex';
import { moto } from './store/data/moto';

export default {
	components: {
	},
	async created() {
		this.$i18n.locale = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE;
		const self = this;
		window.addEventListener('storage', function () {
			if (self.$i18n.locale !== this.localStorage.getItem('lastLocale')) {
				self.$i18n.locale = this.localStorage.getItem('lastLocale');
				self.$router.go();
			}
		});
		this.loadMotorcyclesList(moto);
		//load images from storage
		await this.fetchImagesUrlsFromStorage();
	},
	methods: {
		...mapActions('moto', ['loadMotorcyclesList']),
		...mapActions('storage', ['fetchImagesUrlsFromStorage']),
	},
}

</script>

<style lang="scss">


</style>
