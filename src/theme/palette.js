import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

/*
  The app (src/App.js) is wrapped in a ThemeProvider component
  which is passed a custom theme object created in ./index.js.

  This palette is used in the creation of that theme object so 
  we set the color scheme for the app here.

  Matarial UI Color Palette Generator: 
  http://mcg.mbitson.com/#!?mcgpalette0=%235fb160
*/
const appColor = {
	primary: {
		50: '#eaf5ea',
		100: '#c9e7cb',
		200: '#a6d7a8',
		300: '#82c785',
		400: '#67bb6a',
		500: '#4caf50',
		600: '#45a849',
		700: '#3c9f40',
		800: '#339637',
		900: '#248627',
		A100: '#c5ffc7',
		A200: '#92ff95',
		A400: '#5fff64',
		A700: '#46ff4b'
	},
	secondary: {
		50: '#e9f4f8',
		100: '#c7e4ec',
		200: '#a2d2e0',
		300: '#7dbfd4',
		400: '#61b2ca',
		500: '#45a4c1',
		600: '#3e9cbb',
		700: '#3692b3',
		800: '#2e89ab',
		900: '#1f789e',
		A100: '#d8f2ff',
		A200: '#a5e2ff',
		A400: '#72d2ff',
		A700: '#58caff'
	}
}

export default {
	black,
	white,
	primary: {
		contrastText: white,
		dark: appColor.primary[900],
		main: appColor.primary[500],
		light: appColor.primary[100]
	},
	secondary: {
		contrastText: white,
		dark: appColor.secondary[900],
		main: appColor.secondary['A400'],
		light: appColor.secondary['A400']
	},
	error: {
		contrastText: white,
		dark: colors.red[900],
		main: colors.red[600],
		light: colors.red[400]
	},
	text: {
		primary: colors.blueGrey[900],
		secondary: colors.blueGrey[600],
		link: colors.blue[600]
	},
	link: colors.blue[800],
	icon: colors.blueGrey[600],
	background: {
		default: '#F4F6F8',
		paper: white
	},
	divider: colors.grey[200]
}
