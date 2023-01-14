import { Router } from 'express'
import * as watchlistCtrl from '../controllers/watchlists.js'

const router = Router()

router.get('/', watchlistCtrl.index)

export {
  router
}
