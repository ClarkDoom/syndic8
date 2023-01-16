import { Router } from 'express'
import * as showCtrl from '../controllers/shows.js'

const router = Router()

router.get('/', showCtrl.index)
router.get('/watchlist', showCtrl.watchlist)
router.get('/currently-watching', showCtrl.currentlyWatching)
router.get('/seen-it', showCtrl.seenIt)
router.get('/:id', showCtrl.show)



router.get('/:id/:reviewId', showCtrl.showReview)

router.get('/:id/:reviewId/edit', showCtrl.editReview)

router.post('/new', showCtrl.create)

router.post('/:id/reviews', showCtrl.createReview)
router.post('/:id/:reviewId/add-comment', showCtrl.createComment)

router.put('/:id/:reviewId', showCtrl.updateReview)

router.delete('/:id', showCtrl.deleteShow)
router.delete('/:id/:reviewId', showCtrl.deleteReview)

export {
  router
}
