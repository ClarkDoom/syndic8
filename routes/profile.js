import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/:profileId', profileCtrl.index)
router.get('/:profileId/edit', profileCtrl.edit)
router.post('/top8', profileCtrl.addTop8)

router.patch('/:profileId/edit', profileCtrl.updateAboutMe)


export {
  router
}
