<template>
	 <Teleport to="body">
	    <Transition name="modal-wrapper">
			<div v-show="modalActive" class="modal-wrapper">
				<div class="modal-content">
					<button class="button close-button" @click="toggleModal">
						<font-awesome-icon :icon="['fas', 'xmark']" />
					</button>
					<slot></slot>
				</div>
			</div>
		 </Transition>
	 </Teleport>
</template>

<script>
	export default {
		name: 'ModalWindowComponent',
		props: {
			modalActive: {
				type: Boolean,
				default: false
			},
		},
		emits: ['toggleModal'],
		methods: {
			toggleModal() {
				this.$emit('toggleModal');
			}
		},
	}
</script>

<style lang="scss" scoped>
.modal-wrapper {
	position: fixed;
	background-color: rgb(37, 44, 51, 0.6);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: .5rem;
	z-index: 5;
}
.modal-content {
	background: var(--bg-gradient);
	border-radius: 10px;
	padding: .5rem;
	min-width: 30%;
}
.close-button{
	padding: .5rem;
	border-radius: .5rem;
	margin-left: auto;
	display: block;
}
.modal-wrapper-enter-active,
.modal-wrapper-leave-active {
  transition: opacity 0.3s ease-out;
}

.modal-wrapper-enter-from,
.modal-wrapper-leave-to {
  opacity: 0;
}

</style>