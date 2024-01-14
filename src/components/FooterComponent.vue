<template>
	<footer class="wrapper footer">
		<div class="footer-container">
			<img class="footer__logo" src="../assets/images/logo/logo-main.svg" alt="logo-main">
			<p>©2023 MotoHub by Kate Galushka</p>
			<router-link :to="{ name: 'contacts' }" class="footer__router">{{ $t('nav.contacts') }}</router-link> 
			<div>
				<a href="#" class="footer__links">
					<img src="../assets/images/logo/facebook.svg" alt="facebook">
				</a>
				<a href="#" class="footer__links">
					<img src="../assets/images/logo/instagram.svg" alt="instagram">
				</a>
				<a href="http://t.me/katuxa_galushka" class="footer__links">
					<img src="../assets/images/logo/telegram.png" alt="telegram">
				</a>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "FooterComponent"
	}
</script>

<style lang="scss" scoped>
.footer-container {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content:  space-around;
	gap: 1em;
	padding: 1.5em;
}
.footer__logo {
	width: 4.5rem;
}
.footer__links {
	padding: 0.25rem;
	margin: 0.5em;	
	img {
		width: 25px;
		height: 25px;
	}
}

</style>