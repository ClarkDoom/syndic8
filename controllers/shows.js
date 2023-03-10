// will need to import models at some point
import axios from 'axios'
import { Show } from '../models/show.js'
import { Review } from '../models/show.js'
import { Comment } from '../models/show.js'
import { Profile } from '../models/profile.js'


function create(req,res) {
  Show.create(req.body)
  .then(show => {
    if (show.showType === "favorite") {
      res.redirect(`/profile/${req.user.profile._id}`)
    } else {
      res.redirect(`/shows/${req.body.showType}`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function index(req, res) {
  Show.find({})
  .populate("addedBy")
  .then(shows => {
    const reversedShows = shows.reverse()
    res.render('shows/index', {
      title: "Shows",
      shows: reversedShows
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function watchlist(req, res) {
  Show.find({})
  .then(shows => {
    const watchlistShows = shows.filter(show => {
      return show.showType == "watchlist"
    })
    res.render('shows/watchlist', {
      title: "Watchlist",
      shows: watchlistShows
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function currentlyWatching(req, res) {
  Show.find({})
  .then(shows => {
    const currentlyWatchingShows = shows.filter(show => {
      return show.showType == "currently-watching"
    })
    res.render('shows/currentlyWatching', {
      title: "Currently Watching",
      shows: currentlyWatchingShows
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function seenIt(req, res) {
  Show.find({})
  .then(shows => {
    const seenItShows = shows.filter(show => {
      return show.showType == "seen-it"
    })
    res.render('shows/seenIt', {
      title: "Seen It",
      shows: seenItShows
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}


function deleteShow(req, res) {
  Show.findByIdAndDelete(req.params.id)
  .then(show => {
    if(show.showType === "favorite"){
      res.redirect(`/profile/${req.user.profile._id}`)
    } else {
      res.redirect(`/shows/${show.showType}`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function show(req,res) {
  Show.findById(req.params.id)
  .populate("addedBy")
  .then(show => {
    res.render('shows/show', {
      title: "Show Details", 
      show: show
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function createReview(req, res) {
  Show.findById(req.params.id)
  .then(show => {
    show.reviews.push(req.body)
    show.save()
    .then(() => {
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
}

function showReview(req, res) {
  Show.findById(req.params.id)
  .populate({
    path: 'reviews',
    model: 'Review',
    populate: {
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'commenter',
        model: 'Profile'
      }
    }
  })
  .then(show => {
    const review = show.reviews.id(req.params.reviewId)
    res.render('shows/review', {
      title: "Review Details",
      show,
      review,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
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
    res.redirect('/home')
  })
}

function editReview(req,res) {
  Show.findById(req.params.id)
  .then(show => {
    const review = show.reviews.id(req.params.reviewId)
    res.render('shows/editReview', {
      title: "Edit Review",
      show,
      review,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function updateReview(req, res) {
  Show.findById(req.params.id)
  .then((show) => {
    const review = show.reviews.id(req.params.reviewId);
    review.set(req.body);
    return show.save();
  })
  .then((show) => {
    res.redirect(`/shows/${show._id}`)
    // res.send({ show });
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function createComment(req, res) {
  Show.findById(req.params.id)
  .then((show) => {
    const review = show.reviews.id(req.params.reviewId);
    req.body.commenter = req.user.profile._id
    review.comments.push(req.body);
    return show.save();
  })
  .then((show) => {
    res.redirect(`/shows/${show._id}/${req.params.reviewId}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function deleteComment(req, res) {
  Show.findById(req.params.id)
  .then((show) => {
    const review = show.reviews.id(req.params.reviewId);
    review.comments.remove(req.params.commentId);
    show.save();
  })
  .then((show) => {
    // how do I redirect back to the review?
    res.redirect(`/shows/${req.params.id}/${req.params.reviewId}`)
    
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

function updateShowType(req,res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  Show.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(show => {
    res.redirect(`/shows/${show.showType}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/home')
  })
}

export {
  create,
  index,
  watchlist,
  currentlyWatching,
  seenIt,
  show,
  createReview,
  showReview,
  deleteReview,
  editReview,
  updateReview,
  deleteShow,
  createComment,
  deleteComment,
  updateShowType
}