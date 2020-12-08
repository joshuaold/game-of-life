const row_dimension = 10
const column_dimension = 10
var cell_status_array = []
var render

$(document).ready(function() {
	createGrid()
})

function createGrid() {

	for (i = 0; i < row_dimension; i++) {
		for (j = 0; j < column_dimension; j++) {
			let cellID = (column_dimension*i) + j
			$('.gridContainer').append(
				`<div class="cell" id=${cellID} onclick="clickCell(${cellID})"" is-alive="false" cell-row=${i} cell-column=${j}></div>`
			)
		}		
	}	

}

function clickCell(cellID) {

	var isCellSelected = $(`#${cellID}`).attr("is-alive")

	if(isCellSelected == "false")
		$(`#${cellID}`).attr("is-alive", "true").css("background-color", "#00cc00")
	else
		$(`#${cellID}`).attr("is-alive", "false").css("background-color", "transparent")
}

function clearCells() {

	$('.cell').attr("is-alive", "false").css("background-color", "transparent")

	clearInterval(render)
	render = null
	
}

function startGame() {

	render = setInterval(updateGrid, 200)
	
}

function updateGrid() {

	cell_status_array = []

	for (i = 0; i < row_dimension; i++) {
		for (j = 0; j < column_dimension; j++) {
			cell_status_array.push(getNeighbors(i, j))
		}
	}

	for (i = 0; i < row_dimension*column_dimension; i++) {

		var cellStatus = $(`#${i}`).attr("is-alive")
		var aliveCount = cell_status_array[i].reduce((n, x) => n + (x == "true"), 0)

		if(cellStatus == 'true' && (aliveCount == 2 || aliveCount == 3))
			$(`#${i}`).attr("is-alive", "true").css("background-color", "#00cc00")
		else if(cellStatus == 'false' && aliveCount == 3)
			$(`#${i}`).attr("is-alive", "true").css("background-color", "#00cc00")
		else
			$(`#${i}`).attr("is-alive", "false").css("background-color", "transparent")
	}

}

function getNeighbors(i, j) {

	var cellNeighbors = []
	let cellID = (column_dimension*i) + j

	var northwest = cellID - 11
	var north = cellID - 10
	var northeast = cellID - 9
	var west = cellID - 1
	var east = cellID + 1
	var southwest = cellID + 9
	var south = cellID + 10
	var southeast = cellID + 11
	
	if(j > 0)
	{
		cellNeighbors.push(northwest)			
		cellNeighbors.push(west)
		cellNeighbors.push(southwest)			
	}			

	if(j < column_dimension-1)
	{
		cellNeighbors.push(northeast)
		cellNeighbors.push(east)
		cellNeighbors.push(southeast)
	}			

	cellNeighbors.push(north)
	cellNeighbors.push(south)

	cellNeighbors = cellNeighbors.filter(value => value >= 0 && value < 100)	

	cellNeighborStatus = []

	for (i = 0; i < cellNeighbors.length; i++) {
		cellNeighborStatus.push($(`#${cellNeighbors[i]}`).attr("is-alive"))
	}

	return cellNeighborStatus
}