// will need to import models at some point

import { Profile } from "../models/profile.js"
import { Show } from "../models/show.js"

function index(req, res) {
  Show.find({})
  .then(shows => {
    Profile.findById(req.params.profileId)
    .then(profile => {
      res.render('profile/index', {
        title: "Profile",  
        profile,
        shows 
      })
    })
  })
}

function edit(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    res.render('profile/edit', {
      title: "Profile",
      profile
    })
  })
}

function updateAboutMe(req, res) {
  console.log("ALERT", req.params.profileId)
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  Profile.findByIdAndUpdate(req.params.profileId, req.body, {new: true})
  .then(profile => {
    res.redirect(`/profile/${req.params.profileId}`)
  })
}

function addTop8(req, res) {
  console.log("ALERT ", req.user)
}

export {
  index,
  edit,
  addTop8,
  updateAboutMe
}