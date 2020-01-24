import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import {
	ScrollReset,
	GoogleAnalytics,
	CookiesNotification
  } from './components';
import './assets/scss/index.scss';
const App = () => {
	
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<ScrollReset />
				<GoogleAnalytics />
				<CookiesNotification />
				{renderRoutes(routes)}
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
