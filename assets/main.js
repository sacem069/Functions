

// https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
const facilityColors = {
	"3D & Digital Prototyping": "#0A4DFF",
	"Print": "#D3026B",
	"Media": "#7A38EB",
	"Wood, Metal and Ceramics": "#F5BB3C",
	"Sewing and Textiles": "#238C87",
	"Open Work Spaces": "#F14A02",
}

const facilities = ['3D & Digital Prototyping', 'Print', 'Open Work Spaces','Wood, Metal and Ceramics', 'Sewing and Textiles','Media']

const timeRanges = {
	"Morning": { start: "09:00", end: "12:00" },
	"Afternoon": { start: "12:00", end: "17:00" },
	"Evening": { start: "17:00", end: "22:30" }
}


// https://chatgpt.com/share/69dfbb11-3508-83ea-9a27-347e346f84e4




let renderItems = (data) => {
	let dataList = document.getElementById('makingcenter-list')
	dataList.innerHTML = ''

	data.forEach((item) => {

		let listItem =
			`
		    <li style="border: 3px solid ${facilityColors[item.facility]};">
			<header style="background-color: ${facilityColors[item.facility]}; color: white;"> 
			<h2>${item.name}</h2>
			</header>
			<img src="${item.image}" alt="${item.name}">

			<div class="info">
			<div class="info-row">
			<img src="assets/location-icon.svg " alt="Location" class="info-icon">
			<p>${item.building} <strong>${item.floor}</strong></p>
			</div>

			<div class="info-row">
			<img src="assets/time-icon.svg " alt="Clock" class="info-icon">
			<div> 
			<p> Weekdays: <strong>${item.weekday_open} - ${item.weekday_close}</strong></p>
			<p> Weekends: <strong>${item.weekend_open} - ${item.weekend_close}</strong></p>
			</div>
			</div>
			
			</div>
			
		</li>
		`
		dataList.insertAdjacentHTML('beforeend', listItem)
	})
	dataList.scrollIntoView({ behavior: 'smooth' })
}

let renderFacilities = (facilities) => {
	let toolPicker = document.getElementById('tool-picker')
	toolPicker.innerHTML = ''

	facilities.forEach((facility) => {
		let listItem = `
			<button type="button" style="background-color: ${facilityColors[facility]}; color: white;" value="${facility}" class="facility-btn">${facility} </button>
			<div id="labs-${facility.replaceAll(' ', '-').replaceAll('&', '')}" class="labs-container"></div>`


		toolPicker.insertAdjacentHTML('beforeend', listItem)

	})
	document.querySelectorAll('.facility-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			document.getElementById('makingcenter-list').innerHTML = ''
			document.querySelectorAll('.facility-btn').forEach((b) => {
				if (b === event.target) {
					b.classList.remove('dimmed')
				} else {
					b.classList.add('dimmed')
				}
			})

			let LabsInFacilities = allData.filter((item) => {
				return item.facility === event.target.value
			})
			// document.getElementById('tool-select').value = event.target.value;
			// updateButtonState()
			document.getElementById('tool-dropdown').innerHTML = ''

			let facilityId = event.target.value.replaceAll(' ', '-').replaceAll('&', '')
			let labsContainer = document.getElementById('labs-' + facilityId)
			document.querySelectorAll('[id^="labs-"]').forEach(div => div.innerHTML = '')

			renderLabs(LabsInFacilities, labsContainer)

		})
	})
}

//https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
let renderLabs = (labs, container) => {
	container.innerHTML = ''

	labs.forEach((lab) => {
		let listItem = `
			<button type="button" style="background-color: white; border: 2px solid ${facilityColors[lab.facility]}; color: black;" value="${lab.name}" class="lab-btn" data-lab-name="${lab.name}">${lab.name}</button>
		`
		container.insertAdjacentHTML('beforeend', listItem)
	})
	document.querySelectorAll('.lab-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let clickedLabName = event.target.value
			renderLabs(labs, container)
			let clickedLabButton = container.querySelector(`[data-lab-name="${clickedLabName}"]`)

			let selectedLab = allData.find((item) => {
				return item.name === event.target.value
			})
			let toolsArray = selectedLab.tools.split(', ')

			// 		container.innerHTML = `<select id="tool-select-dropdown">
			// ${toolsArray.map(tool => `<option value="${tool}">${tool}</option>`).join('')}</select>`
			clickedLabButton.outerHTML = `<select id="tool-select-dropdown">
			${toolsArray.map(tool => `<option value="${tool}">${tool}</option>`).join('')}
</select>`
           let dropdown = document.getElementById('tool-select-dropdown')
		   dropdown.classList.add('active')
		   dropdown.focus()

	
			dropdown.addEventListener('change', (e) => {
				document.getElementById('tool-select').value = e.target.value
				document.getElementById('makingcenter-list').innerHTML = ''
				updateButtonState()

			})
		
		})
	})
}

let allData = []

let updateButtonState = () => {
	const selectedTool = document.getElementById('tool-select').value
	const selectedDay = document.getElementById('day-select').value
	const selectedTime = document.getElementById('time-select').value

	if (selectedTool && selectedDay && selectedTime) {
		console.log('All selections complete')
	}
}

let formElement = document.getElementById('making-center-form')
formElement.addEventListener('reset', () => {
	setTimeout(updateButtonState, 0)
})

//Exact day by default
// used this example as reference to set the time input to the current time: https://codepen.io/mfehrenbach/pen/jEMpamr?editors=1010
//selecting the time input 
//getting current day and time
const rightNow = new Date()
//as get hours returns a number we need a string to use the padStart method to add a leading zero if the hour is less than 10

//Exact day by default
const dayInput = document.getElementById('day-select')
dayInput.addEventListener('change', () => {
	dayInput.classList.add('active')
	updateButtonState()
})


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
dayInput.value = days[rightNow.getDay()]

document.querySelectorAll('.time-btn').forEach((btn) => {
	btn.addEventListener('click', (event) => {
		document.querySelectorAll('.time-btn').forEach(b => {
			b.classList.remove('active')
		})
		event.target.classList.add('active')
		document.getElementById('time-select').value = event.target.value
		updateButtonState()

	})
})
updateButtonState()




function goToStep(stepId) {
	document.querySelectorAll('.step').forEach(step => {
		step.classList.remove('active-step')
	})
	document.getElementById(stepId).classList.add('active-step')

}




fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		allData = data
		renderFacilities(facilities)
		// And passes the data to the function, above!
	})




