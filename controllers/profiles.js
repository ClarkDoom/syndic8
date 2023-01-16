// will need to import models at some point

import { Profile } from "../models/profile.js"

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

function addTop8(req, res) {
  console.log("ALERT ", req.user)
}

export {
  index,
  edit,
  addTop8
}