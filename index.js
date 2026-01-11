import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"
import { DATABASE_URL } from "./config.js"

const fireBaseConfig = {
  databaseURL: DATABASE_URL,
}

const app = initializeApp(fireBaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

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

onValue(referenceInDB, function (lead) {
  const snapshotValues = lead.val()
  const leads = Object.values(snapshotValues)
  render(leads)
})

deleteBtn.addEventListener("dblclick", function () {
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value)
  inputEl.value = ""

  render(myLeads)
})
