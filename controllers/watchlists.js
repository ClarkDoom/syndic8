// will need to import models at some point

function index(req, res) {
  res.render('watchlist/index', {
    title: "Watchlist"
  })
}

export {
  index
}