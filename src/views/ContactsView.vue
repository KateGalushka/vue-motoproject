<template>
	<main-masterpage>
		<div class="wrapper contacts">
			<h1>Contacts</h1>
			<transition-group name="contact" tag="ul" appear>
				<li v-for="icon in icons" :key="icon.name">
					<span class="material-symbols-outlined">{{ icon.name }}</span>
					<div>{{ icon.text }}</div>
				</li>
			</transition-group>
			
		</div>
	</main-masterpage>
</template>

<script>
import MainMasterpage from '@/masterpages/MainMasterpage.vue';

export default {
	name: 'ContactsView',
	components: {
		MainMasterpage,
	},
	data() {
		return {
			icons: [
				{ name: 'alternate_email', text: 'by email' },
				{ name: 'call', text: 'by phone' },
				{ name: 'local_post_office', text: 'by post' },
				{ name: 'local_fire_department', text: 'by smoke signal' },
			]
		}
	},
}
</script>

<style lang="scss" scoped>
.contacts {
	background-color: var(--bg-color1);
	padding: 1.5rem;
	text-align: center;
	h1	{
		font-size: 2rem;
	}
}

.contacts ul {
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1.5em;
	max-width: 30em;
	margin: 1.5em auto;
}

.contacts li{ 
	list-style-type: none;
	background: var(--bg-color2);
	color: var(--bg-color1);
	font-size: 1.25rem;
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 3px 3px 10px var(--bg-color2);
	cursor: pointer;
	line-height: 1.5em;
	transition: all .4s ease-in;
	&:hover{
		background: var(--main-color2);
		transform: scale(.98);
	}
}
.contact-enter-from{
	opacity:0;
	transform: scale(0.5);
}
.contact-enter-active{
	transition: all .4s ease-in;
}

</style>
