import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  commenter: {type: Schema.Types.ObjectId, ref: "Profile"},
  commentText: String,
  reaction: String
},{
  timestamps: true
})

const reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  tmbdShowId: String,
  showTitle: String,
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
  addedBy: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Show = mongoose.model('Show', showSchema)
const Review = mongoose.model('Review', reviewSchema)
const Comment = mongoose.model('Comment', commentSchema)

export {
  Show,
  Review,
  Comment
}
