<template>
	<div class="wrapper pagination">
		<vue-awesome-paginate
			v-model="currentPage"
			:total-items="totalItems"
			:items-per-page="itemsPerPage"
			:max-pages-shown="maxPagesShown"
			:hide-prev-next-when-ends="true"
			@click="onClickHandler"
		/>
	</div>
</template>

<script>
	export default {
		name: 'PaginationComponent',
		props: {
			totalItems: {
				type: Number,
				required: true
			},
			itemsPerPage: {
				type: Number,
				required: true
			},
			maxPagesShown: {
				type: Number,
				required: true
			},
		},
		emits:['page-clicked'],

		data() {
			return {
				currentPage: 1
			}
		},
		methods: {
			onClickHandler(page) {
				this.currentPage = page;
				this.$emit('page-clicked', page);
			}
		},
	
	}
</script>

<style lang="scss" scoped>
	// @import url('../assets/styles/_myPagination.scss');
.pagination {
	display: flex;
	justify-content: center;
	padding: .75rem;
}

:deep(.pagination-container) {
	display: flex;
	column-gap: 10px;
}

:deep(.paginate-buttons) {
	height: 40px;
	width: 40px;
	border-radius: 10px;
	cursor: pointer;
	background-color: var(--bg-color1);
	border: 1px solid var(--bg-color1);
	color: var(--main-color1);
	&:hover {
		background-color: var(--main-color1);
		color: var(--bg-color1);
	}
}

:deep(.active-page) {
	background-color: var(--main-color2);
	border: 1px solid var(--main-color2);
	color: white;
	&:hover {
		background-color: var(--main-color1);
		border: 1px solid var(--bg-color1);
	}
}
@media (max-width:768px) {
	:deep(.pagination-container) {
		column-gap: 8px;
	}
	:deep(.paginate-buttons) {
		height: 30px;
		width: 30px;
		font-size: 0.875rem;
	}

}

</style>