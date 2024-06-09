function doSum() { alert("Client side JavaScript is totally loaded."); }
console.log("Yeah...i guess client side javascript is loaded....");

function getWeather(locality) {
    fetch(`http://localhost:3000/weather?address=${locality}`, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'applicaton/json'
        }
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    e.preventDefault();
    var address = search.value;
    getWeather(address);
});