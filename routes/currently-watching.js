import { Router } from 'express'
import * as currentlyWatchingCtrl from '../controllers/currently-watchings.js'

const router = Router()

router.get('/', currentlyWatchingCtrl.index)

export {
  router
}
