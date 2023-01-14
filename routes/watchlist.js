import { Router } from 'express'

const router = Router()

router.get('/', watchlistCtrl.index)

export {
  router
}
