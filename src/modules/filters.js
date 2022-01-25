import { addToMain, projectsList, loadUpcoming, loadToday, toggleActive } from "./functions"
import { Project } from "./projects"

const inboxBtn = document.querySelector('.filters__item-btn.inbox')
const todayBtn = document.querySelector('.filters__item-btn.today')
const upcomingBtn = document.querySelector('.filters__item-btn.upcoming')
const main = document.querySelector('.main')

const inbox = JSON.parse(localStorage.getItem('inbox')) || new Project('Inbox');
const today = new Project('Today');
const upcoming = new Project('Upcoming');

inboxBtn.addEventListener('click', () => {
  addToMain(inbox)
  toggleActive(inbox)
})

todayBtn.addEventListener('click', () => {
  loadToday()
  toggleActive(today)
})

upcomingBtn.addEventListener('click', () => {
  loadUpcoming()
  toggleActive(upcoming)
})



export {inboxBtn, inbox, today, upcoming}