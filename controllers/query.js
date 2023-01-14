// will need to import models at some point
import axios from 'axios'

function index(req, res) {
  res.render('query/index', {
    title: "Search Results"
  })
}


function search(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&query=${req.body.query}&include_adult=false`)
  .then(response => {
    console.log(response.data)
    const data = response.data 
    return data
  })
  .then ((data) => {
    res.render('query/index', {
      results: data.results,
      title: "Search Results"
    })
  })
}



export {
  index,
  search
}