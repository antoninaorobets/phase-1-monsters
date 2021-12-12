document.addEventListener('DOMContentLoaded', init)

const limit = 50
let page = 0

function init() {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(displayMonsters)
        .catch (error => console.log(error))
}

function displayMonsters(data) {
    const monstrConteinerDiv = document.querySelector('#monster-container')
    data.forEach(element => {
        const monsterRecord = document.createElement('div')
        monstrConteinerDiv.appendChild(monsterRecord)

        const name  = document.createElement('h2')
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