import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { Profile } from '../models/profile.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { 
      title: 'Home Page',
  })
})

router.get('/home', function (req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    res.render('index', { 
        title: 'Home Page',
        profile: profile
    })
  })
})

export {
  router
}
