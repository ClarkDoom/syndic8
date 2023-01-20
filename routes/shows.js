import { Router } from 'express'
import * as showCtrl from '../controllers/shows.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, showCtrl.index)
router.get('/watchlist', isLoggedIn, showCtrl.watchlist)
router.get('/currently-watching', isLoggedIn, showCtrl.currentlyWatching)
router.get('/seen-it', isLoggedIn, showCtrl.seenIt)
router.get('/:id', isLoggedIn, showCtrl.show)
router.get('/:id/:reviewId', isLoggedIn, showCtrl.showReview)
router.get('/:id/:reviewId/edit', isLoggedIn, showCtrl.editReview)

router.post('/new', isLoggedIn, showCtrl.create)
router.post('/:id/reviews', isLoggedIn, showCtrl.createReview)
router.post('/:id/:reviewId/add-comment', isLoggedIn, showCtrl.createComment)

router.put('/:id/:reviewId', isLoggedIn, showCtrl.updateReview)

router.patch('/:id/update-show-type', isLoggedIn, showCtrl.updateShowType)

router.delete('/:id', isLoggedIn, showCtrl.deleteShow)
router.delete('/:id/:reviewId', isLoggedIn, showCtrl.deleteReview)
router.delete('/:id/:reviewId/:commentId', isLoggedIn, showCtrl.deleteComment)

export {
  router
}
