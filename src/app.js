 const path = require('path')
 const express = require('express')     
const hbs = require('hbs')  
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()  

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')  
const partialsPath = path.join(__dirname, '../templates/partials')   

app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))   

app.get('', (req, res) => { 
    res.render('index', { 
        title : 'Burning Rain',
        name : 'Justin Reese'
    })
}) 

app.get('/about', (req, res) => { 
    res.render('about', { 
        title : 'about', 
        name : 'Justin Reese'
    })
}) 

app.get('/help', (req, res) => { 
    res.render('help', { 
        title : 'We are here to assist you'  ,
        message : 'send us an email to troubleshoot your weather issue', 
        name : 'Justin Reese'
    }) 
})
 
app.get('/weather', (req, res) => {   
    if (!req.query.address) { 
        return res.send([{ 
            error : 'Please provide a search term' 
        }])
    }  
    geocode(req.query.address, (error, {latitude , longitude , location} = {}) => {  
        if (error) { 
            return res.send(error) 
        }
    
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) { 
                return res.send({error})
            } 
            else {
            res.send({ 
                forecast : forecastData , 
                location : location        //
            }) 
        }
           
          }) 
        }) 
   
})  

app.get('/products', (req, res) => { 
   if (!req.query.search) { 
        return res.send ([{ 
            error : 'You must provide a search term'
        }])
   }
    res.send([{ 
        products : []
    }])
})




app.get('/help/*', (req, res) => { 
    res.render ('404', {  
        title : '404', 
        errorMessage : 'The article searched could not be found'
    })
})
 
app.get('*', (req, res) => { 
    res.render('404', {  
        title : '404',
        errorMessage : '404 error: this page could not be found'
    })
})

app.listen(port, () => { 
    console.log('App is running on port ' + port)
})