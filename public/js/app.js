
console.log('Client side javascript is active')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1= document.querySelector('#msg-1')
const msg2= document.querySelector('#msg-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg2.textContent = ''
    fetch('/weather?address='+location).then(
    (response) => {
        response.json().then((data) => {
            if(data.error) {
                msg1.textContent = data.error
            } else {
                
                msg1.textContent = 'Teprature of '+data.location + ' is ' + data.temperature + ' degree centigrade'
                msg2.textContent = 'Precipitation chance is ' + data.precipitation
            }
        })
    }
)
})