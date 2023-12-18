<template>
	<div>
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
		<!-- <span class="currentLang">{{ $t('language.current') }}: {{ currentLanguage }}</span> -->

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
.english, .ukr {
	display: inline-block;
	position: relative;
	width: 4rem;
	// border: 1px solid #000;
	padding: 0.5rem .5rem;
	margin: 0.5em;
	cursor: pointer;
	text-align: right;
	&.active{
		outline: 2px dotted var(--main-color2);

	}
}
.english::before{
	content: url('../assets/en.svg');
	position: absolute;
	width: 2rem;
	top: 50%;
	left: 2px;
	transform: translateY(-50%);
}
.ukr::before{
	content: url('../assets/ua.svg');
	position: absolute;
	width: 2rem;
	top: 50%;
	left: 2px;
	transform: translateY(-50%);
}
.currentLang{
	font-size: 0.75rem;
}

</style>