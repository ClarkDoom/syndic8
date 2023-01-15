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

function watchlist(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/index', {
      title: "Watchlist",
      shows: shows
    })
  })
}

export {
  create,
  watchlist
}