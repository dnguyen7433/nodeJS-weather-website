
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#error");
const messageTwo = document.querySelector("#location");
const messageThree = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchLocation = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    fetch("http://localhost:3000/weather?address=" + searchLocation).then((res) =>{
    res.json().then((data) => {
        if(data.error) {
            messageOne.textContent = "Uhh Ohh!!! Something went wrong. Try Again!!!";
        } else {
            messageOne.textContent = "";
            messageTwo.textContent = data.location;
            messageThree.textContent = data.forecast;
        }

    })
})
})
