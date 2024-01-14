<template>
	<div class="langToggle">
		<span
			 class="english"
			:class="{'active': isEngToggled}"
			@click="toggleEnglish()">
			En
		</span>
		<span
			 class="ukr"
			:class="{ 'active': isUkrToggled }"
			@click="toggleUkr()">
			Ua
		</span>
	</div>
</template>

<script>
	export default {
		name: 'CurrentLangComponent',
		data() {
			return {
				isEngToggled: false,
				isUkrToggled: false,
			}
		},
		computed: {
			currentLanguage() {
				return this.$i18n.locale == 'ua'? 'Укр' : 'Eng'
			}
		},
		methods: {
			toggleEnglish() {
				this.$i18n.locale = 'en';
				this.isEngToggled = true;
				this.isUkrToggled = false;
				localStorage.setItem('lastLocale', 'en');
			},
			toggleUkr() {
				this.$i18n.locale = 'ua';
				this.isUkrToggled = true;
				this.isEngToggled = false;
				localStorage.setItem('lastLocale', 'ua')
			},
		},
	}
</script>

<style lang="scss" scoped>
.langToggle{
	display: flex;
	flex-wrap: nowrap;
}
.english, .ukr {
	display: inline-block;
	position: relative;
	width: 3.25rem;
	// border: 1px solid #000;
	padding: 0.5rem 0;
	margin-left: .5em;
	cursor: pointer;
	text-align: right;
	font-size: 0.75rem;
	&.active{
		outline: 2px dotted var(--main-color2);
	}
}
.english::before{
	content: url('../assets/images/logo/en.svg');
	position: absolute;
	width: 1.75rem;
	top: 50%;
	left: 6px;
	transform: translateY(-50%);
}
.ukr::before{
	content: url('../assets/images/logo/ua.svg');
	position: absolute;
	width: 1.75rem;
	top: 50%;
	left: 5px;
	transform: translateY(-50%);
}


</style>