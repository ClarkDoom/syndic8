import { Router } from 'express'
import * as seenItCtrl from '../controllers/seen-its.js'

const router = Router()

router.get('/', seenItCtrl.index)

export {
  router
}
