import mongoose from 'mongoose'

const Schema = mongoose.Schema

const top8 = new Schema({
  
},{
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
