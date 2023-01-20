import { Router } from 'express'
import * as queryCtrl from '../controllers/query.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, queryCtrl.index)
router.get('/:id', isLoggedIn, queryCtrl.showSearch)
router.get('/:id/:season', isLoggedIn, queryCtrl.seasonSearch)

router.post('/', isLoggedIn, queryCtrl.search)

export {
  router
}
