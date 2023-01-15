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
  // Profile.findById(req.user.profile._id)
  // .then(profile => {
  //   profile.top8.push(req.body)
  //   profile.save()
  //   .then(()=> {
  //     res.redirect(`/`)
  //   })
  // })
}

export {
  index,
  edit,
  addTop8
}