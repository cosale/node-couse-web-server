const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

hbs.registerPartials(path.join(__dirname, '/views/partials'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

var app = express()
app.set('view engine', 'hbs') // configuring express to use hbs as view engine

console.log(__dirname) // __dirname is the absolute path of our project
// app.use(express.static(path.join(__dirname, '/public')))

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('./public/server.log', path.join(log, '\n'), (error) => {
    // if (error) {
    //   console.log('error during file writing', error)
    //   res.render('maintenance.hbs', {
    //     maintenanceMessage: 'Page under maintenance'
    //   })
    // } else {
    //   next()
    // }
  })
  // console.log(`${now}: ${req.method} ${req.url}`)
  next()  // we use next to tell express when we're done. So, only when we call next, the application will continue to run.
})


// le funzioni di middleware vengono eseguite nell'ordine in cui sono scritte. Se si vuole che il flusso di esecuzione deve proseguire, va inserito il middleware next. Se il flusso deve essere arrestato, non si inserisce il middleware next 
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceMessage: 'Page under maintenance'
//   })
// })

app.use(express.static(path.join(__dirname, '/public'))) // è un middleware con cui si recupera (si mostra a video) un file contenuto in una cartella. Se tale middleware si inserisce prima del middleware con il render maintenance, allora se da browser si richiama la pagina help.html, questa verrà mostrata a video. Se invece questo middleware viene messo (come nel codice di esempio) dopo il middleware (attualmente commentato) con il render di maintenance, dato che non è stato inserito il middleware next, il comportamento sarà sempre lo stesso: si scriverà nel file e poi si mostrerà a video la pagina di maintenance. Non si procederà oltre, e quindi la home non verrà mai mostrata

app.get('/', (req, res) => {
  // res.send('<h1>Hello express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Adele home'
    // currentYear: new Date().getFullYear()
  })
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'My portfolio'
  })
})

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello express!</h1>')
//   res.send({
//     name: 'Adele',
//     likes: ['reading', 'doing sport', 'walking']
//   })
// })

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  })
})
// app.get('/about', (req, res) => {
//   res.send('About page')
// })

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
    otherMessage: 'Retry!'
  })
})
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
