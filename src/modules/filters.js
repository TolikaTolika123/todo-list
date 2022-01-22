import { addToMain, projectsList, loadUpcoming, loadToday } from "./functions"
import { Project } from "./projects"

const inboxBtn = document.querySelector('.filters__item-btn.inbox')
const todayBtn = document.querySelector('.filters__item-btn.today')
const upcomingBtn = document.querySelector('.filters__item-btn.upcoming')
const main = document.querySelector('.main')

const inbox = new Project('Inbox');
const today = new Project('Today');
const upcoming = new Project('Upcoming');


inboxBtn.addEventListener('click', () => {
  addToMain(inbox)
})

todayBtn.addEventListener('click', () => {
  loadToday()
})

upcomingBtn.addEventListener('click', () => {
  loadUpcoming()
})



export {inboxBtn, inbox, today, upcoming}