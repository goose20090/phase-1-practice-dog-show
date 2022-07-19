document.addEventListener('DOMContentLoaded', () => {


    getDogs()
    
    let form = document.getElementById('dog-form')

    form.addEventListener("submit", (event)=>{
        event.preventDefault()

        handleFormSubmit()
    })

})
let dogId
function handleFormSubmit(){

    nameInputValue = document.querySelector("input[name=name]").value
    breedInputValue = document.querySelector("input[name=breed]").value
    sexInputValue = document.querySelector("input[name=sex]").value
    
    fetch (`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        body: JSON.stringify({
            name: nameInputValue,
            breed: breedInputValue,
            sex: sexInputValue
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(function (dog){ 
        console.log(dog)
        let table = document.getElementById("table-body")
        table.innerHTML = '';
        getDogs();
    })

}
    
function getDogs(){
    fetch("http://localhost:3000/dogs")
    .then(res=> res.json())
    .then(dogs=> addDogsToTable(dogs))
}

function addDogsToTable(dogs){

    let table = document.getElementById("table-body")

    dogs.forEach(dog=>{
        let newRow = document.createElement("tr")
        let tdName = document.createElement("td")
        tdName.textContent= dog.name
        let tdBreed = document.createElement("td")
        tdBreed.textContent= dog.breed
        let tdSex = document.createElement("td")
        tdSex.textContent = dog.sex
        let tdEdit = document.createElement("td")
        let editBtn = document.createElement("button")
        editBtn.textContent = "Edit Dog"
        editBtn.className = "edit-btn"

        newRow.id = dog.id

        tdEdit.append(editBtn)
        
        newRow.append(tdName, tdBreed, tdSex, tdEdit)
        table.append(newRow)

    })

    addBtnListeners()

}

function addBtnListeners(){

    let editBtns = document.querySelectorAll('.edit-btn')

    editBtns.forEach((btn)=> btn.addEventListener("click", (event)=> editDog(event)))

}


function editDog(event){
    let dogRow = event.target.parentElement.parentElement
    dogInfo = dogRow.getElementsByTagName("td")

    let name = dogInfo[0].textContent
    let breed = dogInfo[1].textContent
    let sex = dogInfo[2].textContent

    nameInput = document.querySelector("input[name=name]")
    breedInput = document.querySelector("input[name=breed]")
    sexInput = document.querySelector("input[name=sex]")
    
    nameInput.value = name
    breedInput.value = breed
    sexInput.value = sex

    dogId = dogRow.id
    
}