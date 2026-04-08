let renderItems = (data) => {
	let dataList = document.getElementById('makingcenter-list')
	dataList.innerHTML = ''

	data.forEach((item) => {

		let listItem =
			`
		    <li>
			<h2>${item.name}</h2>
			<p>${item.building}</p>
			<p>${item.floor}</p>
			<p>${item.facility}</p>
			<p>${item.weekday_open}</p>
			<p>${item.weekday_close}</p>
			<p>${item.weekend_open}</p>
			<p>${item.weekend_close}</p>
			<p>${item.weekend_days}</p>
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
	let selectedTool3D = document.getElementById('tool-select-3D' ||  'tool-select-print' || 'tool-select-media' || 'tool-select-wood' || 'tool-select-sewing').value
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




