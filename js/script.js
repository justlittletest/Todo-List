let todoInput // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczmności wpisania tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadań, tagi UL
let addLiText // dodaje tekst do li
let addNewLi // dodaje Li to ul listy
let popup // popup
let popupInfo // tekst w popupie
let todoToEdit // zadanie edytowanie w popupie
let popupInput // input w popupie
let popupAddBtn // przycisk do dodania w popupie
let popupCloseBtn // przycisk do zamkniecia w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
prepareDOMElements()

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addElementToList)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keypress', addByEnter)
}

const addElementToList = () => {
	if (todoInput.value !== '') {
		document.createElement('li')
		addLiText = document.createElement('p')
		addLiText.textContent = todoInput.value
		addNewLi = document.createElement('li')
		addNewLi.append(addLiText)
		createTools()
		ulList.append(addNewLi)
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Nie wpisałeś treści zadania, proszę wpisz treść zadania!'
	}
}

const createTools = () => {
	newDiv = document.createElement('div')
	newDiv.classList.add('tools')
	const number = 3
	addNewLi.append(newDiv)

	for (let i = 0; i < number; i++) {
		newToolsBtn = document.createElement('button')
		newDiv.append(newToolsBtn)
		if (i === 0) {
			newToolsBtn.classList.add('complete')
			newToolsBtn.innerHTML = '<i class="fas fa-check"></i>'
		} else if (i === 1) {
			newToolsBtn.textContent = 'EDIT'
			newToolsBtn.classList.add('edit')
		} else {
			newToolsBtn.classList.add('delete')
			newToolsBtn.innerHTML = '<i class="fas fa-times"></i>'
		}
	}
}
const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.parentElement.previousElementSibling.classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		removeTodo(e)
	}
}

const editTodo = e => {
	popup.style.display = 'flex'
	todoToEdit = e.target.parentElement.previousElementSibling
	popupInput.value = todoToEdit.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.textContent = popupInput.value
		popupInput.value = ''
		closePopup()
	} else {
		popupInfo.textContent = 'Nie podałeś treści zadania, podaj proszę treść, aby edytować!'
	}
}

const removeTodo = e => {
	e.target.closest('li').remove()
	popup.style.display = 'none'
	const currentAllTodos = ulList.querySelectorAll('li')

	if (currentAllTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	} else {
		errorInfo.textContent = ''
	}
}

const addByEnter = e => {
	if (e.key === 'Enter') {
		addElementToList()
	}
}

document.addEventListener('DOMContentLoaded', main)
