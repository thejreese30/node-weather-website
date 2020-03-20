console.log('This is a client side javascript file') 

const weatherForm = document.querySelector('form')    
const search = document.querySelector('input') 
const messageOne = document.querySelector('#message1') 
const messageTwo = document.querySelector('#message2')  
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')



weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault()   

    const location = search.value 

    messageOne.textContent = 'Loading weather forecast...' 
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => { 

    response.json().then((data) => {   
    if(data.error)  { 
        messageOne.textContent = data.error
    }  
    else {   
        
    messageOne.textContent = data.location
    messageTwo.textContent = JSON.stringify(data.forecast)
    console.log(data.location) 
    console.log(data.forecast)
    }
    
   
})

}) 
    
})