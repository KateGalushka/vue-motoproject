<template>
	<div class="wrapper loading">
		<font-awesome-icon :icon="['fas', 'spinner']" size="4x" spin-pulse spin-reverse class="icon" />
	</div>
</template>

<script>
export default {
	name: 'LoadingComp',
}
</script>

<style lang="scss" scoped>
.loading {
	min-height: 4em;
	z-index: 10;
	background: var(--bg-gradient);
	.icon	{
		display: block;
		margin: 0 auto;
	}
}

</style>