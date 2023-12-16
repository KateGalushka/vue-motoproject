<template>
	<div class="wrapper">
		<router-view />
	</div>
  
</template>

<script>

export default {
	components: {
	},
	created() {
		this.$i18n.locale = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE;
		const self = this;
		window.addEventListener('storage', function () {
			if (self.$i18n.locale !== this.localStorage.getItem('lastLocale')) {
				self.$i18n.locale = this.localStorage.getItem('lastLocale');
				self.$router.go()
			}
		})
	},
}

</script>

<style lang="scss">


</style>
