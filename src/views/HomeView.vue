<template>
	<main-masterpage>
		<main>
			<section class="home">
				<!-- <img src="../assets/images/versys-mountains.jpg" alt=""> -->
				<div class="home__descr">
					<transition name="title" appear>
						<h1>Two wheels - one passion</h1>
					</transition>
					<transition name="descr" appear>
						<div>
							<p>Almost everything you want to know</p>
							<p>about motorcycles</p>
						</div>
					</transition>
			</div>
			</section>
			<section class="about">

			</section>
		</main>
		

	</main-masterpage>
 
</template>

<script>
import MainMasterpage from '../masterpages/MainMasterpage.vue'


export default {
	components: {
		MainMasterpage,
	},
	data() {
		return {
			
		}
	},
	
}
</script>

<style lang="scss" scoped>
.home{
	min-height: calc(100vh - 8.75em);
	display: flex;
	align-items: center;
	padding: 2rem;
	background: var(--bg-img-main) right -7em center no-repeat, var(--bg-grad-main) center center no-repeat;
	background-size: cover;
	color: var(--main-color1);
	border-radius: 10px;
}
.home__descr{
	h1{
		font-size: 3rem;
		font-weight: 600;
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

</style>
