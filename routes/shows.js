import { Router } from 'express'
import * as showCtrl from '../controllers/shows.js'

const router = Router()

router.post('/new', showCtrl.create)
router.get('/watchlist', showCtrl.watchlist)

export {
  router
}
