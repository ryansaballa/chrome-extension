/*import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js"

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
*/

/* firebase sdk code */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUchIAhQpWmjKbx-L00jgNw31AoohunrU",
  authDomain: "leads-tracker-app-31a91.firebaseapp.com",
  databaseURL: "https://leads-tracker-app-31a91-default-rtdb.firebaseio.com",
  projectId: "leads-tracker-app-31a91",
  storageBucket: "leads-tracker-app-31a91.firebasestorage.app",
  messagingSenderId: "503599630201",
  appId: "1:503599630201:web:f70bf0a499359457ad91a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// test

console.log(app)

/* code for the lead gen app */

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

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

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})