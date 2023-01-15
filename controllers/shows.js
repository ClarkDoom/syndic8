// will need to import models at some point
import axios from 'axios'
import { Show } from '../models/show.js'

function create(req,res) {
  Show.create(req.body)
  .then(show => {
    res.redirect(`/shows/${req.body.showType}`)
  })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/movies')
  // })
}

function index(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/index', {
      title: "Shows",
      shows: shows
    })
  })
}

function watchlist(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/watchlist', {
      title: "Watchlist",
      shows: shows
    })
  })
}

function currentlyWatching(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/currentlyWatching', {
      title: "Currently Watching",
      shows: shows
    })
  })
}

function seenIt(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/seenIt', {
      title: "Seen It",
      shows: shows
    })
  })
}

export {
  create,
  index,
  watchlist,
  currentlyWatching,
  seenIt,
}