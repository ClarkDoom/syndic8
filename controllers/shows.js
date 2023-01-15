// will need to import models at some point
import axios from 'axios'
import { Show } from '../models/show.js'

function create(req,res) {
  Show.create(req.body)
  .then(show => {
    res.redirect('/')
  })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/movies')
  // })
}

export {
  create
}