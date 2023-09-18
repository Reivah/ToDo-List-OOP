export default class Todo {
	constructor(
		inputSelector,
		addBtn,
		taskNumSelector,
		errorMsg,
		ulList,
		editWindow,
		editInput,
		editBtn,
		cancelBtn,
		idNumber = 0
	) {
		this.addInput = document.querySelector(inputSelector)
		this.addBtn = document.querySelector(addBtn)
		this.taskNumber = document.querySelector(taskNumSelector)
		this.errorMsg = document.querySelector(errorMsg)
		this.ulList = document.querySelector(ulList)
		this.editWindow = document.querySelector(editWindow)
		this.editInput = document.querySelector(editInput)
		this.editBtn = document.querySelector(editBtn)
		this.cancelBtn = document.querySelector(cancelBtn)
		this.idNumber = idNumber
	
		
		this.addBtn.addEventListener('click', this.addTask.bind(this))
		this.ulList.addEventListener('click', this.optionButtons.bind(this))
        this.editBtn.addEventListener('click', this.confirmEditTask.bind(this))
        this.cancelBtn.addEventListener('click', this.closeEditWindow.bind(this))
	}
	
	addTask() {
		if (this.addInput.value !== '') {
			this.task = document.createElement('li')
			this.task.setAttribute('id', this.idNumber++)
			this.div = document.createElement('div')
			const inputValue = this.addInput.value
			this.task.innerHTML =
			inputValue +
			'<div>' +
			'<button class="complete-btn option-btn"><i class="fa-solid fa-check"></i></button>' +
			'<button class="edit-btn option-btn">EDIT</button>' +
			'<button class="delete-btn option-btn"><i class="fa-solid fa-trash"></i></button>' +
			('</div>')
			this.ulList.appendChild(this.task)
			this.taskNumber.textContent = document.querySelectorAll('li').length
			this.addInput.value = ''
			this.errorMsg.textContent = ''
			this.errorMsg.style.visibility = 'hidden'
			this.localStorage = new LocalStorage(this.idNumber, inputValue)
			this.localStorage.addStorage()
			

			const button = document.createElement('button')
			button.className = 'delete-btn option-btn'
			button.innerHTML = '<i class="fa-solid fa-trash"></i></button>'
			;('</div>')
			
			
			
		} else {
			this.errorMsg.style.visibility = 'visible'
			this.errorMsg.textContent = 'Please write some tasks'
		}
	}

	

	optionButtons(e) {
		if (e.target.classList.value !== '') {
			if (e.target.closest('button').classList.contains('complete-btn')) {
				e.target.closest('li').style.textDecoration = 'line-through'
				e.target.closest('li').style.fontStyle = 'oblique'
				e.target.closest('li').style.backgroundColor = 'grey'
			} else if (e.target.closest('button').classList.contains('edit-btn')) {
                this.editTask(e)
			}else if(e.target.closest('button').classList.contains('delete-btn')){
                document.querySelector('li').remove()
                this.taskNumber.textContent = document.querySelectorAll('li').length
				console.log(this.idNumber);
            }
		}
	
	}

    editTask(e) {
        this.editWindow.style.display = 'flex'
        this.taskId = e.target.closest('li').id
        this.editedTask = document.getElementById(this.taskId)
        this.editInput.value = this.editedTask.firstChild.textContent
      
    }

    confirmEditTask(){
        this.editedTask.firstChild.textContent = this.editInput.value
        this.editInput.value = ''
        this.editWindow.style.display = 'none'
    }

    closeEditWindow(){
        this.editWindow.style.display = 'none'
        this.editInput.value = ''
    }

    
}

class LocalStorage {
	constructor(taskId, taskText) {
		this.taskId = taskId;
		this.taskText = taskText
	}
	addStorage() {
		localStorage.setItem(this.taskId, this.taskText)
	}

}


