document.addEventListener('DOMContentLoaded', init)

const limit = 2
let curentPage = 1


function init() {
    const monsterForm = document.createElement('form')
    monsterForm.addEventListener('submit', createMonster)
    monsterForm.innerHTML =
        '<label> Add Monster: ' +
        '<input type="text" placeholder = "name" name = "name"> ' +
        '<input type="text" placeholder = "age" name = "age"> ' +
        '<input type="text" placeholder = "description" name = "description"> ' +
        '<input type="submit">' +
        '</label>'
    const header = document.querySelector('h1')
    header.after(monsterForm)

    fetch(`http://localhost:3000/monsters/?_limit=${limit}`)
        .then(resp => resp.json())
        .then(displayMonsters)
        .catch(error => console.log(error))

    document.querySelector('#forward').addEventListener("click", loadNextPage)
    document.querySelector('#back').addEventListener("click", loadPreviousPage)
    disableBack()
}

function displayMonsters(data) {
    const monstrConteinerDiv = document.querySelector('#monster-container')
    data.forEach(element => {
        const monsterRecord = document.createElement('div')
        monstrConteinerDiv.appendChild(monsterRecord)

        const name = document.createElement('h2')
        monsterRecord.appendChild(name)
        name.textContent = element.name

        const age = document.createElement('h4')
        age.textContent = element.age
        monsterRecord.appendChild(age)

        const description = document.createElement('p')
        monsterRecord.appendChild(description)
        description.textContent = element.description
    });
}

function createMonster(event) {
    event.preventDefault()
    fetch(`http://localhost:3000/monsters`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name" : `${event.target.name.value}`,
            "age":  `${event.target.age.value}`,
            "description":  `${event.target.description.value}`
        })
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    event.target.reset()
}

function loadNextPage(event) {
    event.preventDefault()
    ++curentPage 
    const monstrConteinerDiv = document.querySelector('#monster-container')
    monstrConteinerDiv.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${curentPage}`)
        .then(resp => resp.json())
        .then(displayMonsters)
        .catch(error => console.log(error))
    disableBack()
}

function loadPreviousPage(event) {
    event.preventDefault()
    --curentPage
    disableBack()
    const monstrConteinerDiv = document.querySelector('#monster-container')
    monstrConteinerDiv.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${curentPage}`)
        .then(resp => resp.json())
        .then(displayMonsters)
        .catch(error => console.log(error))
}

function disableBack(){
    if (curentPage > 1) {
        document.querySelector('#back').disabled = false;
    }
    else {
        document.querySelector('#back').disabled = true;
    }
}