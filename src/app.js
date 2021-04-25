const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const weatherReport = require('./utils/weatherReport')

const app = express()
const port = process.env.PORT || 3000
// Defining Path for express config..
const Publicdirectorypath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(Publicdirectorypath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kavi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about-section',
        name: 'Kavi Kumar'
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        res.send({
            error: 'Search field is required'
        })
    } else {
        console.log(req.query.rating)
        res.send({
            products: []
        })
    }
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help-section',
        name: 'Kavi Kumar Kundan'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404-Error',
        name: 'kavi',
        error: 'Help article not found'
    })
})

// home page root directory creating route
// sending HTML element
// app.get('', (req, res) => {
    
//     res.send('<h1>Hello express</h1>')
// })

// // sending json Data
// app.get('/help', (req, res) =>{
//     res.send({
//         name: "Kavi",
//         RollNo: 838
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('About the Page')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'Location required'
        })
    } else {
        
         geocode(req.query.address, (error, data) => {
             if(error) {
                res.send({
                    error: error
                })
             } else {
                 weatherReport(data, (error, report) => {
                     if(error) {
                        res.send({
                            error: error
                        })
                     } else {
                        res.send({
                            temperature: report.temperature,
                            precipitation: report.precip,
                            location: req.query.address
                        })   
                     }
                 })
             }
             
         })
    } 
    
    
    
})

// app.get('/weather-report', (req, res) => {
//     res.send({
//         forcast: 45.5,
//         place: "Delhi"
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404-Errror',
        name: 'kavi',
        error: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})