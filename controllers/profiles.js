// will need to import models at some point

function index(req, res) {
  res.render('profile/index', {
    title: "Profile"
  })
}

function edit(req, res) {
  res.render('profile/edit', {
    title: "Profile"
  })
}

export {
  index,
  edit
}