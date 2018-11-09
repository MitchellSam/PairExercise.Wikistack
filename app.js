const express = require('express')
const morgan = require('morgan')
const app = express()
const {db} = require('./models')
const models = require('./models')

const userRouter = require('./routes/user')
const wikiRouter = require('./routes/wiki')

app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(express.urlencoded({extended: false}))

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

const layout = require('./views/layout')

app.get('/', (req, res, next) => {
    // res.send(layout())
    res.redirect("/wiki")
})

//

const PORT = 3000

const init = async () => {
    await models.Page.sync()
    await models.User.sync()

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`)
    })
}

db.authenticate().
then(() => {
  console.log('connected to the database');
})

init()
