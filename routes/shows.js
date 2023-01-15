import { Router } from 'express'
import * as showCtrl from '../controllers/shows.js'

const router = Router()

router.get('/', showCtrl.index)
router.get('/watchlist', showCtrl.watchlist)
router.get('/currently-watching', showCtrl.currentlyWatching)
router.get('/seen-it', showCtrl.seenIt)
router.get('/:id', showCtrl.show)
router.get('/:id/:reviewId', showCtrl.reviewDetails)

router.post('/new', showCtrl.create)
router.post('/:id/reviews', showCtrl.createReview)

router.delete('/:id/:reviewId', showCtrl.delete)


export {
  router
}