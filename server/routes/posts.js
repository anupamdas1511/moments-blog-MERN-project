import express from 'express'

import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

import Auth from '../middlewares/auth.js'

const router = express.Router()

// Creating routes
router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', Auth, createPost)
router.patch('/:id', Auth, updatePost)
router.delete('/:id', Auth, deletePost)
router.patch('/:id/likePost', Auth, likePost)

export default router