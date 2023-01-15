import { Router } from 'express'
import * as showCtrl from '../controllers/shows.js'

const router = Router()

router.post('/new', showCtrl.create)
router.get('/', showCtrl.index)

router.get('/watchlist', showCtrl.watchlist)
router.get('/currently-watching', showCtrl.currentlyWatching)
router.get('/seen-it', showCtrl.seenIt)


export {
  router
}
