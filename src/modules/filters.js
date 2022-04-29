import { addToMain, loadUpcoming, loadToday, toggleActive } from "./functions"
import { Project } from "./projects"
import { isUserSignedIn } from "./auth"

const inboxBtn = document.querySelector('.filters__item-btn.inbox')
const todayBtn = document.querySelector('.filters__item-btn.today')
const upcomingBtn = document.querySelector('.filters__item-btn.upcoming')

let inbox = new Project('Inbox');
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



export { inboxBtn, inbox, today, upcoming }