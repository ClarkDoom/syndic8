// will need to import models at some point

function index(req, res) {
  res.render('currently-watching/index', {
    title: "Currently Watching"
  })
}

export {
  index
}