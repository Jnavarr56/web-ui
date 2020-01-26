import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
	Typography,
	Button,
	IconButton,
	Tooltip,
	colors
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center'
	},
	likeButton: {},
	likedButton: {
		color: colors.red[600]
	},
	shareButton: {
		marginLeft: 'auto'
	},
	shareIcon: {
		marginRight: theme.spacing(1)
	}
}))

const Reactions = props => {
	const { post, className, ...rest } = props

	const classes = useStyles()

	const [ liked, setLiked ] = useState(post.liked)
	const [ likes, setLikes ] = useState(post.likes)

	const handleLike = () => {
		setLiked(true)
		setLikes(likes => likes + 1)
	}

	const handleUnlike = () => {
		setLiked(false)
		setLikes(likes => likes - 1)
	}

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}
		>
			{liked ? (
				<Tooltip title="Unlike">
					<IconButton
						className={classes.likedButton}
						size="small"
						onClick={handleUnlike}
					>
						<FavoriteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Like">
					<IconButton
						className={classes.likeButton}
						size="small"
						onClick={handleLike}
					>
						<FavoriteBorderIcon />
					</IconButton>
				</Tooltip>
			)}
			<Typography
				color="textSecondary"
				variant="h6"
			>
				{likes}
			</Typography>
			<Button
				className={classes.shareButton}
				size="small"
				variant="contained"
			>
				<ShareIcon className={classes.shareIcon} />
				Share
			</Button>
		</div>
	)
}

Reactions.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object.isRequired
}

export default Reactions
