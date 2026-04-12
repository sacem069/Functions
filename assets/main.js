

// https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
const facilityColors = {
	"3D & Digital Prototyping": "#0A4DFF",
	"Print": "#D3026B",
	"Media": "#7A38EB",
	"Wood, Metal and Ceramics": "#F5BB3C",
	"Sewing and Textiles": "#238C87",
	"Open Work Spaces": "#F14A02",
}

const facilities = ['3D & Digital Prototyping', 'Print', 'Media', 'Wood, Metal and Ceramics', 'Sewing and Textiles', 'Open Work Spaces']

const timeRanges = {
	"Morning": { start: "09:00", end: "12:00" },
	"Afternoon": { start: "12:00", end: "17:00" },
	"Evening": { start: "17:00", end: "22:30" }
}

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
			<p>${item.building}</p>
			<p>${item.floor}</p>
			<p>${item.week_days}</p>
			<p>${item.weekday_open}</p>
			<p>${item.weekday_close}</p>
			<p>${item.weekend_days}</p>
			<p>${item.weekend_open}</p>
			<p>${item.weekend_close}</p>
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
			<div id="labs-${facility.replaceAll(' ', '-').replaceAll('&', '')}"></div>`


		toolPicker.insertAdjacentHTML('beforeend', listItem)

	})
	document.querySelectorAll('.facility-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let LabsInFacilities = allData.filter((item) => {
				return item.facility === event.target.value
			})
			document.getElementById('tool-select').value = event.target.value;
			document.getElementById('tool-dropdown').innerHTML = ''

			let facilityId = event.target.value.replaceAll(' ', '-').replaceAll('&', '')
			let labsContainer = document.getElementById('labs-' + facilityId)
			document.querySelectorAll('[id^="labs-"]').forEach(div => div.innerHTML = '')

			renderLabs(LabsInFacilities, labsContainer)

		})
	})
}

let renderLabs = (labs, container) => {
	container.innerHTML = ''

	labs.forEach((lab) => {
		let listItem = `
			<button type="button" style="background-color: ${facilityColors[lab.facility]}; color: white;" value="${lab.name}" class="lab-btn">${lab.name} </button>
		`
		container.insertAdjacentHTML('beforeend', listItem)
	})
	document.querySelectorAll('.lab-btn').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let selectedLab = allData.find((item) => {
				return item.name === event.target.value
			})
			let toolsArray = selectedLab.tools.split(', ')
			// let toolDropdown = document.getElementById('tool-dropdown')
			// toolDropdown.innerHTML = `<select id="tool-select-dropdown">
			container.innerHTML = `<select id="tool-select-dropdown">
    ${toolsArray.map(tool => `<option value="${tool}">${tool}</option>`).join('')}</select>`
			document.getElementById('tool-select-dropdown').click()
			document.getElementById('tool-select-dropdown').addEventListener('change', (e) => {
				document.getElementById('tool-select').value = e.target.value

			})


		})
	})
}

let allData = []

let formElement = document.getElementById('making-center-form')

//Exact time by default
// used this example as reference to set the time input to the current time: https://codepen.io/mfehrenbach/pen/jEMpamr?editors=1010
//selecting the time input 
//getting current day and time
const rightNow = new Date()
//as get hours returns a number we need a string to use the padStart method to add a leading zero if the hour is less than 10



//Exact day by default
const dayInput = document.getElementById('day-select')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
dayInput.value = days[rightNow.getDay()]

document.querySelectorAll('.time-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        document.getElementById('time-select').value = event.target.value
    })
})


formElement.addEventListener('submit', (event) => {
	event.preventDefault()
	console.log('submitted!')
	let selectedTool = document.getElementById('tool-select').value
	let selectedDay = document.getElementById('day-select').value
	let selectedTime = document.getElementById('time-select').value
	console.log(`Tool: ${selectedTool}, Day: ${selectedDay}, Time: ${selectedTime}`)

	let results =
		allData.filter((item) => {
			if (selectedDay == "Saturday" || selectedDay === "Sunday") {
				return item.tools.includes(selectedTool) &&
					item.weekend_days.includes(selectedDay)
			} else {
				let timeRange = timeRanges[selectedTime]
				return item.tools.includes(selectedTool) &&
				timeRange.start < item.weekday_close &&
				timeRange.end > item.weekday_open	

			}
		})

	console.log(results)
	renderItems(results)
})




fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		allData = data
		renderFacilities(facilities)
		// And passes the data to the function, above!
	})




