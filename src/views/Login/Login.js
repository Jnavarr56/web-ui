import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Avatar,
	CircularProgress,
	Dialog,
	Button,
	Divider
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { Page } from 'components'
import gradients from 'utils/gradients'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(6, 2)
	},
	card: {
		width: theme.breakpoints.values.md,
		maxWidth: '100%',
		overflow: 'unset',
		display: 'flex',
		position: 'relative',
		'& > *': {
			flexGrow: 1,
			flexBasis: '50%',
			width: '50%'
		}
	},
	content: {
		padding: theme.spacing(8, 4, 5, 4),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	media: {
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		padding: theme.spacing(3),
		color: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	icon: {
		backgroundImage: gradients.green,
		color: theme.palette.white,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1),
		position: 'absolute',
		top: -32,
		left: theme.spacing(3),
		height: 64,
		width: 64,
		fontSize: 32
	},
	loginForm: {
		marginTop: theme.spacing(3)
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	person: {
		marginTop: theme.spacing(2),
		display: 'flex'
	},
	avatar: {
		marginRight: theme.spacing(2)
	},
	loadingDialog: {
		'& *.MuiDialog-container': {
			backgroundColor: 'white'
		},
		'& *.MuiDialog-paper': {
			backgroundColor: 'transparent',
			padding: theme.spacing(4),
			boxShadow: theme.shadows[0]
		}
	}
}))

const Login = () => {
	const classes = useStyles()

	const history = useHistory()
	const [ fetchingSpotifyURL, setFetchingSpotifyURL ] = useState(false)

	const handleSpotifyRedirect = useCallback(() => {
		setFetchingSpotifyURL(true)
		axios
			.get('/api/authentication/initiate')
			.then(({ data }) => (window.location = data.spotify_authorization_url))
			.catch(({ response }) => {
				console.log(response)
				history.push('/errors/error-500')
			})
	}, [ history ])

	return (
		<>
			<Page
				className={classes.root}
				title="Login"
			>
				<Card className={classes.card}>
					<CardContent className={classes.content}>
						<LockIcon className={classes.icon} />
						<Typography
							gutterBottom
							variant="h3"
						>
							SpeeterFoo
						</Typography>
						<Typography
							gutterBottom
							variant="subtitle2"
						>
							A music based social app that doesn't suck.
						</Typography>
						<Divider />
						<Button
							color="primary"
							fullWidth
							variant="contained"
							onClick={handleSpotifyRedirect}
						>
							Sign in with spotify
						</Button>
					</CardContent>
					<CardMedia
						className={classes.media}
						image="/images/auth.png"
						title="Cover"
					>
						<Typography
							color="inherit"
							variant="subtitle1"
						>
							Hella narvwhal Cosby sweater McSweeney's, salvia kitsch before
							they sold out High Life.
						</Typography>
						<div className={classes.person}>
							<Avatar
								alt="Person"
								className={classes.avatar}
								src="/images/avatars/avatar_2.png"
							/>
							<div>
								<Typography
									color="inherit"
									variant="body1"
								>
									Ekaterina Tankova
								</Typography>
								<Typography
									color="inherit"
									variant="body2"
								>
									Manager at inVision
								</Typography>
							</div>
						</div>
					</CardMedia>
				</Card>
			</Page>
			<Dialog
				className={classes.loadingDialog}
				open={fetchingSpotifyURL}
			>
				<CircularProgress size={48} />
			</Dialog>
		</>
	)
}

export default Login
