let renderItems = (data) => {
    let dataList = document.getElementById('makingcenter-list')
}

let allData = []

let formElement = document.getElementById('some-form')


formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submitted!')
    let selectedTool = document.getElementById('tool-select').value
    let selectedDay= document.getElementById('day-select').value
    let selectedTime =	document.getElementById('time-select').value
	console.log(`Tool: ${selectedTool}, Day: ${selectedDay}, Time: ${selectedTime}`)

	let results = 
	allData.filter ((item) => {
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
})


fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
        allData = data
		// And passes the data to the function, above!
		renderItems(data)
	})




