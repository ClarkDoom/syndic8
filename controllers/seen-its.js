// will need to import models at some point

function index(req, res) {
  res.render('seen-it/index', {
    title: "Seen-it"
  })
}

export {
  index
}