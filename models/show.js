import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  tmbdShowId: String,
  reviewContent: String,
  author: String
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
  showType: {
    type: String, 
    enum: ["watchlist", "currentlyWatching", "seenIt", "top8"]
  }
}, {
  timestamps: true
})

const Show = mongoose.model('Show', showSchema)

export {
  Show
}
