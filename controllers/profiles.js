// will need to import models at some point

function index(req, res) {
  res.render('profile/index', {
    title: "Profile"
  })
}

export {
  index
}