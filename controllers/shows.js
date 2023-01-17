// will need to import models at some point
import axios from 'axios'
import { Show } from '../models/show.js'


function create(req,res) {
  Show.create(req.body)
  .then(show => {
    res.redirect(`/shows/${req.body.showType}`)
  })
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


function deleteShow(req, res) {
  Show.findByIdAndDelete(req.params.id)
  .then(show => {
    res.redirect(`/shows`)
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
  //need to pass comment data somehow here so that its available on the view to render ejs
  Show.findById(req.params.id)
  .then(show => {
    const review = show.reviews.id(req.params.reviewId)
    res.render('shows/review', {
      title: "Review Details",
      show,
      review,
    })
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
    res.redirect('/')
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
  .catch(e => res.status(400).send(e));
}

function createComment(req, res) {
  Show.findById(req.params.id)
  .then((show) => {
    const review = show.reviews.id(req.params.reviewId);
    review.comments.push(req.body);
    return show.save();
  })
  .then((show) => {
    // how do I redirect back to the review?
    res.redirect(`/shows/${show._id}/${req.params.reviewId}`)
    
  })
  .catch(e => res.status(400).send(e));
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
  .catch(e => res.status(400).send(e));
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
  deleteComment
}