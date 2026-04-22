

// https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
const facilityColors = {
	"3D & Digital Prototyping": "#0A4DFF",
	"Print": "#D3026B",
	"Media": "#7A38EB",
	"Wood, Metal and Ceramics": "#F5BB3C",
	"Sewing and Textiles": "#238C87",
	"Open Work Spaces": "#F14A02",
}

const facilities = ['3D & Digital Prototyping', 'Print', 'Open Work Spaces', 'Wood, Metal and Ceramics', 'Sewing and Textiles', 'Media']

const timeRanges = {
	"Morning": { start: "09:00", end: "12:00" },
	"Afternoon": { start: "12:00", end: "17:00" },
	"Evening": { start: "17:00", end: "22:30" }
}


// https://chatgpt.com/share/69dfbb11-3508-83ea-9a27-347e346f84e4
// Creates a function that recieves data as a parameter which represents the filtered list of facilities to display. 'data' represents the filtered list of facilities that match the user's selections. 
// This function generates visual result cards based on the filtered data and renders them to the page. Each card includes the facility name, image, location, and hours of operation. The cards are styled with colors corresponding to their respective facilities for easy identification.
// 'datalist' is a variable that stores the HTML container where the results will be inserted. The container is cleared before rendeing new results.
let renderItems = (data) => {
	let dataList = document.getElementById('makingcenter-list')
	dataList.innerHTML = ''
	if (data.length === 0) {
		dataList.innerHTML = '<p>No results found. Please try a different selection.</p>'
		return
	}

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

// Creates a function that recieves the name of facility names as a parameter 
// This function generates the category buttons and places them inside the tool picker container. 'toolPicker' is a variable that stores the HTML element where all facility options will be displayed. 
// The container is cleared first so that old content leaves the page. 

let renderFacilities = (facilities) => {
	let toolPicker = document.getElementById('tool-picker')
	toolPicker.innerHTML = ''

	// Loops through each facility in the facilities array and creates a button with its corresponding color and labs container. 
	facilities.forEach((facility) => {

		// listItem stores the HTML stucture for each facility group 
		let listItem = `
		<div class="facility-group"> 
			<button type="button" style="background-color: ${facilityColors[facility]}; color: white;" value="${facility}" class="facility-btn">${facility} </button>
			<div id="labs-${facility.replaceAll(' ', '-').replaceAll('&', '')}" class="labs-container"></div>
			</div>`


			// Inserts each facility group into the tool picker container. 
		toolPicker.insertAdjacentHTML('beforeend', listItem)

	})

	// After rendering the facility buttons this loop adds a click event to each one. 
	document.querySelectorAll('.facility-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			// clears the results and tool dropdown each time a new facility is selected. It also dims the unselected facility buttons to highlight the current selection.
			document.getElementById('makingcenter-list').innerHTML = ''
			document.querySelectorAll('.facility-btn').forEach((b) => {

				// === is strict comparing if this was the button that was callled. if it is, removes the 'dimmed' state, if its not, it adds it.
				if (b === event.target) {
					b.classList.remove('dimmed')
				} else {
					b.classList.add('dimmed')
				}
			})

			// filters the dataset and keeps only the labs that belong to the facility selected
			let LabsInFacilities = allData.filter((item) => {
				return item.facility === event.target.value
			})
			
			document.getElementById('tool-dropdown').innerHTML = ''

			// converts the facility name into a valid HTML id by replacing spaces with '-' and removing '&'
			// then finds the correct lab that belongs to the selected familiy
			let facilityId = event.target.value.replaceAll(' ', '-').replaceAll('&', '')
			let labsContainer = document.getElementById('labs-' + facilityId)
			document.querySelectorAll('.labs-container').forEach(div => div.innerHTML = '')
 
			// calls the renderLabs function to display the filtered labs inside the correct container. 
			renderLabs(LabsInFacilities, labsContainer)

		})
	})
}


//https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
// create a function that recieves filter lab data and the container where those labs should be displayed.
// Loops through each lab in the filter lab array and creates the lab button. Inserts each lab button into the selected container. 
let renderLabs = (labs, container) => {
	container.innerHTML = ''

	labs.forEach((lab) => {
		let listItem = `
			<button type="button" style="background-color: white; border: 2px solid ${facilityColors[lab.facility]}; color: black;" value="${lab.name}" class="lab-btn" data-lab-name="${lab.name}">${lab.name}</button>
		`
		container.insertAdjacentHTML('beforeend', listItem)
	})
	// Select all lab buttons and adds click functionality to each of them 
	// Identifies the clicked lab, finds its matching data and takes the list of tools available in that lab. 
	// Converts the tool list from a string to an array
	document.querySelectorAll('.lab-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let clickedLabName = event.target.value
			renderLabs(labs, container)
			let clickedLabButton = container.querySelector(`[data-lab-name="${clickedLabName}"]`)

			let selectedLab = allData.find((item) => {
				return item.name === event.target.value
			})
			let toolsArray = selectedLab.tools.split(', ')

			// Replaces the clicked lab button with dropdown of tools, activates the dropdown and updates the selected tool 
			// outerHtml replaces the entire element. .map() is creating a dropdown option for each tool .join('') combines all the options into an HTML string 
			// dropdown.focus () places the cursor on the dropdown. 

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

const toolSelect = document.getElementById('tool-select')
const daySelect = document.getElementById('day-select')
const timeSelect = document.getElementById('time-select')

let updateButtonState = () => {
	const selectedTool = document.getElementById('tool-select').value
	const selectedDay = document.getElementById('day-select').value
	const selectedTime = document.getElementById('time-select').value

	updateFooterState()

	if (selectedTool && selectedDay && selectedTime) {
		console.log('All selections complete')
	}
}

// https://chatgpt.com/share/69dfbb11-3508-83ea-9a27-347e346f84e4
// Function that controls footer navigation. 
function updateFooterState() {
	document.querySelectorAll('.footer-nav-btn').forEach((btn) => {
		btn.classList.remove('available')
	})

	// This ensures step 1 is always available 
	document
	.getElementById('footer-step-1').classList.add('available')

	// checks if user selected a tool. if it did, step 2 icon gets available.
	// then checks if selected day and time and step 3 icon available. 
	if (toolSelect.value !== "") {
		document.getElementById('footer-step-2').classList.add('available')
	}
	if (toolSelect.value !== "" && daySelect.value !== "" && timeSelect.value !== "") {
		document.getElementById('footer-step-3').classList.add('available')
	}
}

// actual movement to each step. step 1 always available to move to. step 2 only if tool selected. step 3 if tool, day and time are completed
function goToStep1() {
	goToStep('step-1')
}

function goToStep2(){
	if (toolSelect.value === "") return 
	goToStep('step-2')
}

function goToStep3(){
	const selectedTool = toolSelect.value
	const selectedDay = daySelect.value
	const selectedTime = timeSelect.value

	// stops the function if any required selection is missing
	if (selectedTool === "" || selectedDay === "" || selectedTime === "") return


	// filters the dataset to keep only the labs that match the selected tool, day and time 
	let results = allData.filter((item) => {

		// if the selected day is saturday or sunday check if the labs contain the selected tool and if its open on that weekend day. 
		if (selectedDay === 'Saturday' || selectedDay === 'Sunday') {
			return item.tools.includes(selectedTool) &&
				item.weekend_days.includes(selectedDay)
		} 
		// for weekdays, gets the selected time range for the selected time period. 
		else {
			let timeRange = timeRanges[selectedTime]
			return item.tools.includes(selectedTool) &&
				// item.week_days.includes(selectedDay) &&
				timeRange.start < item.weekday_close &&
				timeRange.end > item.weekday_open

		}
	})
	renderItems(results)
	goToStep('step-3')
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

// Creates an array that stores all days of the week. Day input sets the exact day automaticlly. 
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
dayInput.value = days[rightNow.getDay()]

// when the time button is clicked, removes the active state from the other time buttons, and adds active state to the clicked one
document.querySelectorAll('.time-btn').forEach((btn) => {
	btn.addEventListener('click', (event) => {
		document.querySelectorAll('.time-btn').forEach(b => {
			b.classList.remove('active')
		})
		event.target.classList.add('active')

		//updates time input value based on the selected button and updates the footer navigation state after a selecting time
		document.getElementById('time-select').value = event.target.value
		updateButtonState()

	})
})
updateButtonState()


// https://chatgpt.com/share/69dfbb11-3508-83ea-9a27-347e346f84e4

// Controls which step is visible on screen and updates the footer and body styles to match the current step

function goToStep(stepId) {

	// only one step shown at a time. 
	// activates the seleted state by using the ID
	// sh
	document.querySelectorAll('.step').forEach(step => {
		step.classList.remove('active-step')
	})
	document.getElementById(stepId).classList.add('active-step')

	if (stepId === 'step-0') {
		document.body.classList.add('landing-mode')
	} else {
		document.body.classList.remove('landing-mode')
	}
    // Removes the active state from all footer buttons before activating the current step button.
	document.querySelectorAll('.footer-nav-btn').forEach((btn) => {
		btn.classList.remove('active')
	})

	// activates the red icon if it is in the actual step
	if (stepId === 'step-1') {
		document.getElementById('footer-step-1').classList.add('active')
	}
	if (stepId === 'step-2') {
		document.getElementById('footer-step-2').classList.add('active')
	}		
	if (stepId === 'step-3') {
		document.getElementById('footer-step-3').classList.add('active')
	}

}


// Adds interaction to the main interface controls
// when the logo is clicked, the interface resets key selections and return the users to step 1, removing previous states of buttons
document.getElementById('logo-home').addEventListener('click', () => {
	toolSelect.value = ''
	document.getElementById('tool-dropdown').innerHTML = ''
	document.getElementById('makingcenter-list').innerHTML = ''
	document.querySelectorAll('.facility-btn').forEach((btn) => {
		btn.classList.remove('dimmed')
	})

	document.querySelectorAll('.labs-container').forEach((div) => {
		div.innerHTML = ''
	})

	goToStep('step-1')
})

// Starts the main flow by moving the user from the landing screen to step 1

document.getElementById('start-flow').addEventListener('click', () => {
	goToStep('step-1')
})

// allows navigation throught the footer icons 
document.getElementById('footer-step-2').addEventListener('click', goToStep2)


document.getElementById('footer-step-1').addEventListener('click', goToStep1) 

document.getElementById('footer-step-3').addEventListener('click', goToStep3)


//resets the interface to the initial state and sends the user back to step 1
document.getElementById('restart-flow').addEventListener('click', () => {
	formElement.reset()
	document.getElementById('tool-select').value = ''
	document.getElementById('time-select').value = ''
	document.getElementById('makingcenter-list').innerHTML = ''

	document.querySelectorAll('.time-btn').forEach(btn => {
		btn.classList.remove('active')
	})
	document.querySelectorAll('.facility-btn').forEach(btn => {
		btn.classList.remove('dimmed')
	})
	document.querySelectorAll('.labs-container').forEach((div) => {
		div.innerHTML = ''
	})

	goToStep('step-1')
})


//Loads json file, stores it in memory and uses it to generate the facility interface
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		allData = data
		renderFacilities(facilities)
		// And passes the data to the function, above!
	})




