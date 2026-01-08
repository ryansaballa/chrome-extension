import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"
import { DATABASE_URL } from "./config.js"

const fireBaseConfig = {
  databaseURL: DATABASE_URL,
}

const app = initializeApp(fireBaseConfig)
const database = getDatabase(app)

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})
