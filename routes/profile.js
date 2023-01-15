import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profileCtrl.index)
router.get('/edit', profileCtrl.edit)
router.post('/top8', profileCtrl.addTop8)

export {
  router
}
