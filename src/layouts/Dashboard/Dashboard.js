import React, { Suspense, useState, useContext } from 'react'
import { renderRoutes } from 'react-router-config'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { LinearProgress } from '@material-ui/core'
import { context as AuthContext } from 'authentication'
import { NavBar, TopBar } from './components'

const useStyles = makeStyles(() => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden'
	},
	topBar: {
		zIndex: 2,
		position: 'relative'
	},
	container: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden'
	},
	navBar: {
		zIndex: 3,
		width: 256,
		minWidth: 256,
		flex: '0 0 auto'
	},
	content: {
		overflowY: 'auto',
		flex: '1 1 auto'
	}
}))

const Dashboard = props => {
	const { route } = props

	const classes = useStyles()
	const [ openNavBarMobile, setOpenNavBarMobile ] = useState(false)

	const handleNavBarMobileOpen = () => {
		setOpenNavBarMobile(true)
	}

	const handleNavBarMobileClose = () => {
		setOpenNavBarMobile(false)
	}

	const { session } = useContext(AuthContext)

	if (!session) return <Redirect to="/auth/login" />

	return (
		<div className={classes.root}>
			<TopBar
				className={classes.topBar}
				onOpenNavBarMobile={handleNavBarMobileOpen}
			/>
			<div className={classes.container}>
				<NavBar
					className={classes.navBar}
					openMobile={openNavBarMobile}
					onMobileClose={handleNavBarMobileClose}
				/>
				<main className={classes.content}>
					<Suspense fallback={<LinearProgress />}>
						{renderRoutes(route.routes)}
					</Suspense>
				</main>
			</div>
		</div>
	)
}

Dashboard.propTypes = {
	route: PropTypes.object
}

export default Dashboard
