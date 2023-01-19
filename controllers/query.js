// will need to import models at some point
import axios from 'axios'
import { Profile } from '../models/profile.js'

function index(req, res) {
  res.render('query/index', {
    title: "Search Results"
  })
}


function search(req, res) {
  Profile.findById(req.body.profileId)
  .then(profileData => {
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&query=${req.body.query}&include_adult=false`)
    .then(response => {
      console.log(response.data)
      const data = response.data 
      return data
    })
    .then ((data) => {
      res.render('query/index', {
        results: data.results,
        title: "Search Results",
        profile: req.params.id,
        profileData: profileData,
      })
    })
  })
}

function showSearch(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profileData => {
    axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
    .then(response => {
      const data = response.data 
      return data
    })
    .then((data) => {
      res.render('query/tv-show', {
        results: data,
        title: "Show Details",
        profileData: profileData
      })
    })
  })
}


function seasonSearch(req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/season/${req.params.season}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
  .then(response => {
    const data = response.data 
    return data
  })
  .then((data) => {
    res.render('query/episode', {
      results: data,
      title: "Season Details"
    })
  })
}



export {
  index,
  search,
  showSearch,
  seasonSearch
}