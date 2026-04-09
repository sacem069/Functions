

// https://claude.ai/share/62daabaa-1485-4c60-bf8c-d81ab6b93031
const facilityColors = {
	"3D & Digital Prototyping": "#0A4DFF",
	"Print": "#D3026B",
	"Media": "#7A38EB",
	"Wood, Metal and Ceramics": "#F5BB3C",
	"Sewing and Textiles": "#238C87",
	"Open Work Spaces": "#F14A02",
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
}

let allData = []

let formElement = document.getElementById('making-center-form')

//Exact time by default
// used this example as reference to set the time input to the current time: https://codepen.io/mfehrenbach/pen/jEMpamr?editors=1010
//selecting the time input 
const timeInput = document.getElementById('time-select') 
//getting current day and time
const rightNow = new Date()
//as get hours returns a number we need a string to use the padStart method to add a leading zero if the hour is less than 10
const hours = String(rightNow.getHours()).padStart(2, '0')
const minutes = String(rightNow.getMinutes()).padStart(2, '0')
//sets the time imput's displayed value to the current time, combining hours and minutes with a : in between
timeInput.value = `${hours}:${minutes}`


//Exact day by default
const dayInput = document.getElementById('day-select') 
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
dayInput.value = days[rightNow.getDay()]


formElement.addEventListener('submit', (event) => {
	event.preventDefault()
	console.log('submitted!')
	let selectedTool3D = document.getElementById('tool-select-3D').value
	let selectedToolPrint = document.getElementById('tool-select-print').value
	let selectedToolMedia = document.getElementById('tool-select-media').value
	let selectedToolWood = document.getElementById('tool-select-wood').value
	let selectedToolSewing = document.getElementById('tool-select-sewing').value
	let selectedToolOpen = document.getElementById('tool-select-open').value
	let selectedTool = selectedTool3D || selectedToolPrint || selectedToolMedia || selectedToolWood || selectedToolSewing || selectedToolOpen
	let selectedDay = document.getElementById('day-select').value
	let selectedTime = document.getElementById('time-select').value
	console.log(`Tool: ${selectedTool}, Day: ${selectedDay}, Time: ${selectedTime}`)

	let results =
		allData.filter((item) => {
			if (selectedDay == "Saturday" || selectedDay === "Sunday") {
				return item.tools.includes(selectedTool) &&
					item.weekend_days.includes(selectedDay)
			} else {
				return item.tools.includes(selectedTool) &&
					selectedTime >= item.weekday_open &&
					selectedTime <= item.weekday_close
			}
		})

	console.log(results)
	renderItems(results)
})






fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		allData = data
		// And passes the data to the function, above!
	})




