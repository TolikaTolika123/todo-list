import { Project, ProjectPrint } from './projects'
import { inbox, inboxBtn, today, upcoming } from './filters';
import { format, formatDistance, endOfYesterday } from 'date-fns'

const addProjects = document.querySelector('.sidebar__add')
const showProjects = document.querySelector('.sidebar__list');
const main = document.querySelector('.main')
const projects = document.querySelector('.projects');

const projectsList = [];
let allProjects = [inbox].concat(projectsList)

function addToMain(project) {
  main.innerHTML = '';
  const mainInner = document.createElement('div');
  mainInner.classList.add('main__inner');
  const mainTitle = document.createElement('h3');
  mainTitle.classList.add('main__title');
  mainTitle.innerText = project.title;
  const mainList = document.createElement('ul');
  mainList.classList.add('main__list');

  for (let i = 0; i < project.items.length; i++) {
    const mainListItem = document.createElement('li');
    mainListItem.classList.add('main__list-item');

    const listItemHeading = document.createElement('div');
    listItemHeading.classList.add('main__item-heading')
    listItemHeading.innerHTML = `<button class="main__item-checkbox">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#bdc3c7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
  </button>`

    const listItemTitle = document.createElement('h5');
    listItemTitle.classList.add('main__item-title');
    listItemTitle.innerText = project.items[i].title;
    listItemHeading.appendChild(listItemTitle);

    mainListItem.appendChild(listItemHeading)

    const listItemDescription = document.createElement('p');
    listItemDescription.classList.add('main__item-description')
    listItemDescription.innerText = project.items[i].description;
    mainListItem.appendChild(listItemDescription)

    const listItemDate = document.createElement('time')
    listItemDate.classList.add('main__item-date', 'no-after')

    if (project.items[i].date === null) {
      listItemDate.innerText = ''
    } else if (format(project.items[i].date, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy')) {
      listItemDate.innerText = 'Today'
    } else {
      listItemDate.innerText = formatDistance(endOfYesterday(), project.items[i].date)
    }
    mainListItem.appendChild(listItemDate)

    if (project.title === 'Upcoming') {
      listItemDate.classList.remove('no-after')
      const listItemParent = document.createElement('span');
      listItemParent.classList.add('main__item-parent');
      listItemParent.innerText = project.items[i].parent;
      mainListItem.appendChild(listItemParent)
    }

    if (project.title === 'Today') {
      listItemDate.classList.remove('no-after')
      const listItemParent = document.createElement('span');
      listItemParent.classList.add('main__item-parent');
      listItemParent.innerText = project.items[i].parent;
      mainListItem.appendChild(listItemParent)
    }

    mainList.appendChild(mainListItem)
  }

  mainList.innerHTML += `<li class="main__list-item">
  <button class="main__add" data-project="${project.title}">
    <span class="icon">
      <svg width="13" height="13" fill="red"><path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"  fill-rule="evenodd"></path></svg>
    </span>
    Add task
  </button>
</li>`

  mainInner.appendChild(mainTitle)
  mainInner.appendChild(mainList)
  main.appendChild(mainInner)

  deleteItem(project)

  const addBtn = document.querySelector('.main__add');
  addBtn.addEventListener('click', e => {
    addNewItem(project, e)
  })
}

function addNewItem(project, e) {
  e.path[1].innerHTML = `<form class="main__form-create">
  <div>
    <input type="text" class="main__form-title" placeholder="e.g., Family lunch on Sunday at 11am">
    <textarea class="main__form-description" placeholder="Description"></textarea>
    <input class="main__form-date" type="date" >
  </div>
  <button class="main__form-add" disabled>Add tast</button>
  <button class="main__form-cancel">Cancel</button>
</form>`

  const input = document.querySelector(".main__form-title");
  const textarea = document.querySelector('.main__form-description')
  const date = document.querySelector('.main__form-date');
  const add = document.querySelector(".main__form-add");
  const cancel = document.querySelector('.main__form-cancel')

  input.addEventListener("input", () => {
    input.value === "" ? (add.disabled = true) : (add.disabled = false);
  });

  let today = new Date().toISOString().slice(0, 10);
  date.setAttribute('min', today)

  add.addEventListener('click', () => {
    if (project.title === 'Upcoming') {
      inbox.items.push({
        title: input.value,
        description: textarea.value,
        date: date.valueAsDate,
        parent: inbox.title
      })
      changeCountNumber(inbox)
      loadUpcoming()
    } else if (project.title === 'Today') {
      inbox.items.push({
        title: input.value,
        description: textarea.value,
        date: date.valueAsDate || new Date(),
        parent: inbox.title
      })
      changeCountNumber(inbox)
      loadToday()
    } else {
      project.items.push({
        title: input.value,
        description: textarea.value,
        date: date.valueAsDate,
        parent: project.title
      })
    }


    addToMain(project)
    changeCountNumber(project)
  })

  cancel.addEventListener('click', () => {
    addToMain(project)
  })
}

function deleteItem(project) {
  const checkTodo = document.querySelectorAll('.main__item-checkbox');
  const mainListItem = document.querySelectorAll('.main__list-item')

  if (project.title === 'Upcoming') {
    for (let i = 0; i < checkTodo.length; i++) {
      checkTodo[i].addEventListener('click', () => {
        const mainProject = allProjects.find(e => e.title === project.items[i].parent);
        mainListItem[i].remove()
        mainProject.items.splice(i, 1);

        changeCountNumber(mainProject)
        loadUpcoming()
      })
    }
  } else if (project.title === 'Today') {
    for (let i = 0; i < checkTodo.length; i++) {
      checkTodo[i].addEventListener('click', () => {
        const mainProject = allProjects.find(e => e.title === project.items[i].parent);
        mainListItem[i].remove()
        mainProject.items.splice(i, 1);

        changeCountNumber(mainProject)
        loadUpcoming()
      })
    }
  } else {
    for (let i = 0; i < checkTodo.length; i++) {
      checkTodo[i].addEventListener('click', () => {
        mainListItem[i].remove()
        project.items.splice(i, 1);
        changeCountNumber(project)
      })
    }
  }
}

showProjects.addEventListener('click', () => {
  showProjects.classList.toggle('active')
  if (showProjects.classList.contains('active')) {
    for (let i = 0; i < projectsList.length; i++) {
      const print = new ProjectPrint(projectsList[i])

      print.html()
    }
  } else {
    projects.innerHTML = ''
  }

})

addProjects.addEventListener('click', () => {
  let title = prompt('Add project title')
  const newProject = new Project(title);
  projectsList.push(newProject)
  allProjects = [inbox].concat(projectsList)

  if (showProjects.classList.contains('active')) {
    const print = new ProjectPrint(newProject)

    print.html()
  }
  console.log(projectsList)
})

function changeCountNumber(project) {
  const projectsTitles = document.querySelectorAll('.projects__text');

  let item = Array.from(projectsTitles).find(p => p.innerText == project.title)
  if (!item) {
    if (project.title === 'Inbox') {
      project.items.length > 0 ? inboxBtn.lastChild.innerText = project.items.length : inboxBtn.lastChild.innerText = '';
    }
  } else {
    project.items.length > 0 ? item.parentElement.lastChild.innerText = project.items.length : item.parentElement.lastChild.innerText = '';
  }
}

function deleteProject(project) {
  const projectsTitles = document.querySelectorAll('.projects__text');

  let item = Array.from(projectsTitles).find(p => p.innerText == project.title)

  item.parentElement.remove();
  projectsList.splice(projectsList.indexOf(project), 1);
  allProjects = [inbox].concat(projectsList)
}

function loadUpcoming() {
  const upcomingItems = []
  for (let i = 0; i < allProjects.length; i++) {
    upcomingItems.push(...allProjects[i].items.filter(item => item.date !== null))
  }
  upcoming.items = upcomingItems.sort()
  addToMain(upcoming)
}

function loadToday() {
  const todayItems = []
  for (let i = 0; i < allProjects.length; i++) {
    todayItems.push(...allProjects[i].items.filter(item => {
      return item.date !== null && format(item.date, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy')
    }))
  }
  today.items = todayItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  addToMain(today)
}

export { addToMain, deleteProject, projectsList, loadUpcoming, loadToday }