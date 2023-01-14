import { Router } from 'express'
import * as queryCtrl from '../controllers/query.js'

const router = Router()

router.get('/', queryCtrl.index)
router.post('/', queryCtrl.search)
router.get('/:id', queryCtrl.showSearch)
router.get('/:id/:season', queryCtrl.seasonSearch)

export {
  router
}
