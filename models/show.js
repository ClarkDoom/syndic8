import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  commentor: String,
  commentText: String,
  reaction: String
},{
  timestamps: true
})

const reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  tmbdShowId: String,
  reviewTitle: String,
  reviewContent: String,
  author: String,
  comments: [commentSchema]
},{
  timestamps: true
})

const showSchema = new Schema({
  name: {type: String, required: true},
  tmbdShowId: String, 
  profileId: String,
  description: String,
  imageUrl: String,
  reviews: [reviewSchema],
  showType: String,
  addedBy: String
}, {
  timestamps: true
})

const Show = mongoose.model('Show', showSchema)

export {
  Show,
}
