var testMode = false;
//var grid = document.getElementById("grid")

function doAjax() {
    //Prepare the parameter value for 'myParam'
    //var paramValue = "someValue";
    //var tellMines = false;

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';
    var rows = document.getElementById("rows").value
    var cols = document.getElementById("cols").value
    var mines = document.getElementById("mines").value
    var grid = document.getElementById("grid")
    //var grid = document.getElementById("grid").value
    //cell.setAttributeNode(mine);
    CreateGrid(rows,cols);
    // var mine = document.createAttribute("new_mine")
    // mine.value = "false"
    // cell.setAttributeNode(mine);
    // AddMines(rows,cols,cell);


    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { rows: rows, cols: cols, mines: mines })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}


// function CreateArrey(rows,cols){
//     var my_arr = new Array(rows);
//     for (var i=0; i<rows;i++);{
//         my_arr[i] = new Array(cols);
//         }

//     }
    

function CreateGrid(rows,cols){

    grid.innerHTML="";
    for (var i=0;i<rows;i++){
        row = grid.insertRow(i)
        //this.grid[i] = []
        for (var j=0;j<cols;j++){
            cell = row.insertCell(j)
            cell.onclick = function(){
                Click_on_Cells(this);
                var mine = document.createAttribute("new_mine")
                mine.value = "false"
                cell.setAttributeNode(mine);
            //this.grid[i][j].value = "not_mine"
            //row.insertCell = new Cell();
            //cell.value = "not_mine"
            //cell.document.createAttribute("new_cell")
            
            console.log(mine.value)
            // cell.onclick = function(){
            //     Click_on_Cells(this);
            }
            // var mine = document.createAttribute("new_mine")
            // mine.value = "false"
            // cell.setAttributeNode(mine);
    //var mine = document.createAttribute("mine")
    // mine.value = "false"
    // cell.setAttributeNode(mine);
    //     }
    }
}
//  function CreateMines(){
//     var mine = document.createAttribute("mine")
//     mine.value = "false"
//     cell.setAttributeNode(mine);
//     return mine
AddMines(mines,rows,cols);
 }

function AddMines(mines,rows,cols){
    //console.log(mines.value)
        //count_mines = 0
        console.log(mines.value)
    //while ((count_mines <= mines.value) && (!mines == NaN)){
        //console.log(count_mines)

        // var rowIndex = getRandomInteger(0,rows)
        // var colIndex = getRandomInteger(0,cols)
        for (var i=0; i< mines.value;i++){
        console.log(mines.value)
        var rowIndex = Math.floor(Math.random()*rows)
         var colIndex = Math.floor(Math.random()*cols)
         //grid[rowIndex][colIndex].setAttribute("new_mine","true")

         let cell = this.grid[rowIndex][colIndex];
         cell.setAttribute("new_mine","true")
         console.log(grid[rowIndex][colIndex].getAttribute("new_mine"))
         if (testMode) cell.innerHTML="X"
        //  if (cell.value == "not_mine"){
        //      cell.value = "mine"
        //      mine.value = "true"
        //count_mines ++;
         //}
    }
}
function revealMines(rows,cols){
    for (var i=0;i<rows;i++){
        for (var j=0;j<cols;j++){
            var cell = grid.rows[i].cells[j]
            if(cell.getAttribute("new_mine")== "true")
        cell.className="mine"
        }
    }
}

// box.onmousedown = function() {
//     if (event.which === 3){ //rightclick
//         PlaceFlag(box, gameboardarray, minesArray, buttonarray)
//     }
//     else{ //leftclick
//         OnLeftClick(box,gameboardarray, buttonarray, minesArray, rows, cols)
//     }

// };
    //  for (var i= 0;i<mines;i++){
    //      var rowIndex = Math.floor(Math.random()*rows)
    //      var colIndex = Math.floor(Math.random()*cols)
    //      var cell = grid.rows[rowIndex].cols[colIndex];
    //     if (cell.value == "not_mine"){
    //         cell.value = "mine"
    //         mine.value = "true"
    //     }
        //  if (cell.getAttribute("new_mine") == "false"){
        //     cell.setAttribute("new_mine","true")
        //     //cell. = "true"
        //  }
             
// function getRandomInteger(min,max){
//     return Math.floor(Math.random()* max)
//     return Math.floor( Math.random() * ( max - min ) ) + min;
// }


 
 

// function AddMines(mines){
//     for (var i=0; i<mines;i++){
//         var row = Math.floor(Math.random()* mines/2)
//         var col = Math.floor(Math.random()* mines/2)
//         var cell = grid.rows[row].cells[col];
//         cell.setAttribute("mine","true")
        //if (tellMines) cell.grid_str='X'
//     }

// }

function Click_on_Cells(cell){
    //cell.className = "clicked"
    if (cell.getAttribute("new_mine") == true){
        revealMines(rows,cols)
        cell.className = "mine"
    }
    else{
        cell.className = "not_mine"
    }


//     if (cell.getAttribute("mine") == "false") {
//         cell.className = "clicked"
//     }
//     else{
//         //revealMines();
//         alert("Game Over")
//         cell.grid_str = "Y"
//     }
}

//function AddMines(mines,rows,cols){
//     for (var i=0;i<rows;i++){
//         var row = Math.floor(Math.random()* 10)
//         var col = Math.floor(Math.random()*10)
//         var cell = grid.rows[row].cells[col];
//         cell.setAttribute("mine","true")

    
// class Cell {
//     constructor({
//         value = ""
//       //isMine = false,
//       isRevealed = false,
//       isFlagged = false
//     }) {
//       Object.assign(this, {
//          //value of a cell: number of adjacent mines, F for flagged, M for mine
//         isMine,
//         isRevealed,
//         isFlagged
//       });
//     }
  
    // getElement() {
    //   return document.querySelector(
    //     `.cell[data-xpos="${this.xpos}"][data-ypos="${this.ypos}"]`
      
    
  