// will need to import models at some point
import axios from 'axios'
import { Show } from '../models/show.js'
import { Review } from '../models/show.js'


function create(req,res) {
  Show.create(req.body)
  .then(show => {
    res.redirect(`/shows/${req.body.showType}`)
  })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/movies')
  // })
}

function index(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/index', {
      title: "Shows",
      shows: shows
    })
  })
}

function watchlist(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/watchlist', {
      title: "Watchlist",
      shows: shows
    })
  })
}

function currentlyWatching(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/currentlyWatching', {
      title: "Currently Watching",
      shows: shows
    })
  })
}

function seenIt(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/seenIt', {
      title: "Seen It",
      shows: shows
    })
  })
}

function show(req,res) {
  Show.findById(req.params.id)
  .then(show => {
    res.render('shows/show', {
      title: "Show Details", 
      show: show
    })
  })
  // axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
  // .then(response => {
  //   console.log(response.data)
  //   const data = response.data 
  //   return data
  // })
  // .then((data) => {
  //   res.render('shows/show', {
  //     results: data,
  //     title: "Show Details"
  //   })
  // })
}

function createReview(req, res) {
   // find the movie by its id
  Show.findById(req.params.id)
   // push req.body (form data) into the embedded schema
  .then(show => {
    show.reviews.push(req.body)
    show.save()
    .then(() => {
       // redirect back to movie show view
      res.redirect(`/shows/${show._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
   // save the updated movie document
}

function deleteReview(req, res) {
  Show.findById(req.params.id)
  .then(show => {
    show.reviews.remove({_id: req.params.reviewId})
    show.save()
    res.redirect(`/shows/${show._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function editReview(req,res) {
  Review.findById(req.params.reviewId)
  .then(review => {
    res.render('shows/editReview', {
      title: "Edit Review",
      review: review
    })
  })
}

function reviewDetails(req,res) {
  // Show.findById(req.params.id)
  // .then(show => {
  //   Review.findById(req.params.reviewId)
  //   .then(review => {
  //     res.render('shows/review', {
  //       title: "Review Details", 
  //       review: review,
  //     })
  //   })
  //})
}
  
  
  
//   Review.findById(req.params.reviewId)
//   .then(review => {
//     res.render('shows/review', {
//       title: "Review Details", 
//       review: review,
//     })
//     console.log("ALERT", review)
//   })
//   .catch(err => {
//     console.log("ALERT - CAUGHT AN ERROR")
//     console.log(err)
//     res.redirect('/')
//   })
// }


export {
  create,
  index,
  watchlist,
  currentlyWatching,
  seenIt,
  show,
  createReview,
  deleteReview as delete,
  reviewDetails,
  editReview
}