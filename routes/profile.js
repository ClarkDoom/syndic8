import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:profileId', isLoggedIn, profileCtrl.index)
router.get('/:profileId/edit', isLoggedIn, profileCtrl.edit)

router.post('/favorite', isLoggedIn, profileCtrl.addFavorite)

router.patch('/:profileId/edit', isLoggedIn, profileCtrl.updateAboutMe)

export {
  router
}
