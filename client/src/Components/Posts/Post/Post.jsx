import React, { useState } from 'react'
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
  const [likes, setLikes] = useState(post?.likes)

  const userId = user?.result?.googleId || user?.result?._id
  const hasLiked = likes.find((like) => like === userId)

  const history = useHistory()

  const del = () => {
    dispatch(deletePost(post._id))

    setCurrentId(null)
    // history.push('/')
    dispatch(getPosts())
  }

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if(hasLiked) {
      setLikes(post.likes.filter(id => id !== userId))
    }else{
      setLikes([ ...likes, userId ])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <> <ThumbupAltIcon fontSize="small" /> {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`} </>
        ) : (
          <><ThumbUpAltOutlined fontSize='small' />{likes.length} {likes.length === 1 ? "Like" : "Likes "}</>
        )
    }


    return <><ThumbUpAltOutlined fontSize='small' />like</>
  }

  return (
    <Card className={classes.card} raised elevation={6}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} tabIndex={1} size='small' onClick={() => { setCurrentId(post._id) }}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}
      <ButtonBase className={classes.cardAction} tabIndex={0} onClick={() => history.push(`/posts/${post._id}`)}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map(tags => `# ${tags} `)}</Typography>
        </div>
        <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography style={{ maxHeight: '50px', overflow: 'hidden' }} variant='body2' color='textSecondary' component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
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