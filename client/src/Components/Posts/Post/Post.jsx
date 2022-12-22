import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbupAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './style'
import { useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { deletePost, likePost, getPosts } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))

  const history = useHistory()

  const del = () => {
    dispatch(deletePost(post._id))

    setCurrentId(null)
    // history.push('/')
    dispatch(getPosts())
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <> <ThumbupAltIcon fontSize="small" /> {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`} </>
        ) : (
          <><ThumbUpAltOutlined fontSize='small' />{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes "}</>
        )
    }

    // const openPost = () => {
    //   history.push(`/posts/${post._id}`)
    // }

    return <><ThumbUpAltOutlined fontSize='small' />like</>
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={() => history.push(`/posts/${post._id}`)}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size='small' onClick={() => { setCurrentId(post._id) }}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map(tags => `# ${tags} `)}</Typography>
        </div>
        <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography style={{ maxHeight: '50px', overflow: 'hidden' }} variant='body2' color='textSecondary' component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={del}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post