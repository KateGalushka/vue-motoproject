<template>
	<main-masterpage>
		<div class="wrapper contacts">
			<h1>{{ $t('contacts.title') }}</h1>
			<transition-group name="contact" tag="ul" appear>
				<li v-for="icon in icons" :key="icon.name">
					<span class="material-symbols-outlined">{{ icon.name }}</span>
					<div v-if="isEng">{{ icon.textEn }}</div>
					<div v-else>{{ icon.textUa }}</div>
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
				{ name: 'alternate_email', textEn: 'by email', textUa: 'е-мейлом' },
				{ name: 'call', textEn: 'by phone', textUa: 'по телефону' },
				{ name: 'local_post_office', textEn: 'by post', textUa: 'поштою' },
				{ name: 'local_fire_department', textEn: 'by smoke signal', textUa: 'сигнальним багаттям' },
			]
		}
	},
	computed: {
		isEng() {
			return this.$i18n.locale == 'en' ? true : false;
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

@media (max-width: 768px) {
	.contacts h1 {
		font-size: 1.5rem;
	}
	.contacts ul {
		max-width: 24em;
	}
	.contacts li {
		font-size: 1rem;
		padding: 1.5rem;
	}
}
@media (max-width: 500px) {
	.contacts ul {
		max-width: 20em;
	}
	.contacts li {
		font-size: .75rem;
		padding: 1rem .5rem;
	}
}
</style>
