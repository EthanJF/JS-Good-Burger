document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here

  const fetchURL = "http://localhost:3000/burgers"

  const burgerMenu = document.querySelector("#burger-menu")

  const customBurgerForm = document.querySelector("#custom-burger")

  customBurgerForm.addEventListener("submit", getCustomBurger)

  function fetchBurgers(){
    fetch(fetchURL)
    .then(r => r.json())
    .then(resObj => {
      resObj.forEach(eachBurger => renderBurgers(eachBurger))
    })
  }

  function renderBurgers(burger){
    
    const newBurgerDiv = document.createElement("div")

    newBurgerDiv.className = "burger"

    newBurgerDiv.innerHTML = ` 
    <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="burger_description">
      ${burger.description}
    </p>
    <button class="button">Add to Order</button>
  `
    burgerMenu.append(newBurgerDiv)

    newBurgerDiv.addEventListener("click", addEventListenerToNewBurger)
  }

  function addEventListenerToNewBurger(event){

    if(event.target.className == "button"){

      const orderList = document.querySelector("#order-list")

      const burgerDiv = event.target.parentNode

      const burgerTitle = burgerDiv.querySelector(".burger_title")

      const newOrderLI = document.createElement("li")

      newOrderLI.textContent = burgerTitle.textContent

      orderList.append(newOrderLI)
    }
  }

  function getCustomBurger(event){

    event.preventDefault()

    const form = event.target

    const newBurgerObj = {
      name: form.name.value,
      description: form.description.value,
      image: form.url.value
    }

    submitCustomBurger(newBurgerObj)

  }

  function submitCustomBurger(burger) {

    fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(burger)
    })
    .then(response => response.json())
    .then(responseObject => renderBurgers(responseObject))

  }

  fetchBurgers()

})
