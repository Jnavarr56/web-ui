import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { ScrollReset, GoogleAnalytics, CookiesNotification } from './components'
import './assets/scss/index.scss'
import { AuthenticationContext } from './authentication'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<AuthenticationContext>
					<ScrollReset />
					<GoogleAnalytics />
					<CookiesNotification />
					{renderRoutes(routes)}
				</AuthenticationContext>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
