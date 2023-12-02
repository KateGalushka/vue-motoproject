<template>
	<main-masterpage>
		<div class="home">
			<!-- <img src="../assets/images/versys-mountains.jpg" alt=""> -->
			<div class="home__descr">
				<h1>Two wheels - one passion</h1>
				<p>Almost everything you want to know</p>
				<p>about motorcycles</p>
			</div>
		
		</div>

	</main-masterpage>
 
</template>

<script>
import MainMasterpage from '../masterpages/MainMasterpage.vue'


export default {
	components: {
		MainMasterpage,
	},

}
</script>
<style lang="scss" scoped>
.home{
	min-height: calc(100vh - 8.75rem);
	display: flex;
	align-items: center;
	padding: 2rem;
	background: url("../assets/images/versys-mountains.jpg") right -7em center no-repeat, url("../assets/images/Rectangle hero.png") center center no-repeat;
	background-size: cover;
	color: var(--main-color1);
	
}
.home__descr{
	h1{
		font-size: 3rem;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		font-style: italic;
		line-height: 2.5rem;
		margin-bottom: 2rem;
	}
	p{
		font-size: 1.5rem;
		width: 31.25rem;
		line-height: 2rem;
		text-indent: 2rem;
	}
}

</style>
