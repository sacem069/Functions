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


formElement.addEventListener('submit', (event) => {
	event.preventDefault()
	console.log('submitted!')
	let selectedTool3D = document.getElementById('tool-select-3D' ||  'tool-select-print' || 'tool-select-media' || 'tool-select-wood' || 'tool-select-sewing').value
	let selectedToolPrint = document.getElementById('tool-select-print').value
	let selectedToolMedia = document.getElementById('tool-select-media').value
	let selectedToolWood = document.getElementById('tool-select-wood').value
	let selectedToolSewing = document.getElementById('tool-select-sewing').value
	let selectedTool = selectedTool3D || selectedToolPrint || selectedToolMedia || selectedToolWood || selectedToolSewing
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




