// import npm packages
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'

// import custom middleware
import { passDataToView } from './middleware/middleware.js'

// connect to MongoDB with mongoose
import './config/database.js'

// load passport
import'./config/passport.js'

// import routes
import { router as indexRouter } from './routes/index.js'
import { router as authRouter } from './routes/auth.js'
import { router as watchlistRouter} from './routes/watchlist.js'
import { router as currentlyWatchingRouter} from './routes/currently-watching.js'
import { router as seenItRouter} from './routes/seen-it.js'
import { router as profileRouter} from './routes/profile.js'
import { router as queryRouter} from './routes/query.js'

// create the express app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// basic middleware
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    },
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// custom middleware
app.use(passDataToView)

// router middleware
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/watchlist', watchlistRouter)
app.use('/currently-watching', currentlyWatchingRouter)
app.use('/seen-it', seenItRouter)
app.use('/profile', profileRouter)
app.use('/query', queryRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    title: `🎊 ${err.status || 500} Error`,
    user: req.user ? req.user : null,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
  })
})

export { app }
