import {Project, ProjectPrint} from './projects'

const main = document.querySelector('.main')

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
  </div>
  <button class="main__form-add" disabled>Add tast</button>
  <button class="main__form-cancel">Cancel</button>
</form>`

  const input = document.querySelector(".main__form-title");
  const textarea = document.querySelector('.main__form-description')
  const add = document.querySelector(".main__form-add");
  input.addEventListener("input", () => {
    input.value === "" ? (add.disabled = true) : (add.disabled = false);
  });

  add.addEventListener('click', () => {
    project.items.push({
      title: input.value,
      description: textarea.value
    })
    addToMain(project)
  })
  
}

function deleteItem(project) {
  const checkTodo = document.querySelectorAll('.main__item-checkbox');
  const mainListItem = document.querySelectorAll('.main__list-item')
  for (let i = 0; i < checkTodo.length; i++) {
    checkTodo[i].addEventListener('click', () => {
      mainListItem[i].remove()
      project.items.splice(i, 1);
    })
  }
}


export { addToMain }