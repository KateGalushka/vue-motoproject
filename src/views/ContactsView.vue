<template>
	<main-masterpage>
		<div class="wrapper contacts">
			<h1>Contacts</h1>
			<ul>
				<li v-for="icon in icons" :key="icon.name">
					<span class="material-symbols-outlined">{{ icon.name }}</span>
					<div>{{ icon.text }}</div>
				</li>
			</ul>
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
.contacts{
	background-color: var(--bg-color1);
	padding: 1.5rem;
	text-align: center;
	h1{
		color: var(--main-color1);
		font-size: 2rem;
	}
}
.contacts ul {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 400px;
    margin: 1.5rem auto;
  }
  .contacts li {
    list-style-type: none;
    background: var(--bg-color2);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 3px 3px 10px var(--bg-color2);
    cursor: pointer;
    line-height: 1.5em;
  }
</style>
