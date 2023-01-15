// will need to import models at some point

import { Show } from "../models/show.js"

function index(req, res) {
  Show.find({})
  .then(shows => {
    res.render('watchlist/index', {
      title: "Watchlist",
      shows: shows
    })
    
  })
}

export {
  index
}