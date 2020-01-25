import React, { Fragment, useEffect, useContext } from 'react'
// import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Drawer,
	Divider,
	Paper,
	Avatar,
	Typography,
	Link
} from '@material-ui/core'
import { Hidden } from '@material-ui/core'
import { Navigation } from 'components'
import navigationConfig from './navigationConfig'
import { context as AuthContext } from 'authentication'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		overflowY: 'auto'
	},
	content: {
		padding: theme.spacing(2)
	},
	profile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content'
	},
	avatar: {
		width: 60,
		height: 60
	},
	name: {
		marginTop: theme.spacing(1)
	},
	divider: {
		marginTop: theme.spacing(2)
	},
	navigation: {
		marginTop: theme.spacing(2)
	}
}))

const NavBar = props => {
	const { openMobile, onMobileClose, className, ...rest } = props

	const classes = useStyles()
	const location = useLocation()

	const { session } = useContext(AuthContext)
	const { spotify_me_data } = session

	useEffect(() => {
		if (openMobile) {
			onMobileClose && onMobileClose()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ location.pathname ])

	const navbarContent = (
		<div className={classes.content}>
			<div className={classes.profile}>
				<Avatar
					alt="Person"
					className={classes.avatar}
					component={Link}
					href={spotify_me_data.external_urls.spotify}
					src={spotify_me_data.images[0].url}
				/>
				<Typography
					className={classes.name}
					variant="h4"
				>
					{spotify_me_data.display_name}
				</Typography>
				<Typography variant="body2">{spotify_me_data.email}</Typography>
			</div>
			<Divider className={classes.divider} />
			<nav className={classes.navigation}>
				{navigationConfig.map(list => (
					<Navigation
						component="div"
						key={list.title}
						pages={list.pages}
						title={list.title}
					/>
				))}
			</nav>
		</div>
	)

	return (
		<Fragment>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					open={openMobile}
					variant="temporary"
					onClose={onMobileClose}
				>
					<div
						{...rest}
						className={clsx(classes.root, className)}
					>
						{navbarContent}
					</div>
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Paper
					{...rest}
					className={clsx(classes.root, className)}
					elevation={1}
					square
				>
					{navbarContent}
				</Paper>
			</Hidden>
		</Fragment>
	)
}

NavBar.propTypes = {
	className: PropTypes.string,
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool
}

export default NavBar
