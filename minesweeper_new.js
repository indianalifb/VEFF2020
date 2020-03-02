var responseBoard;
function doAjax() {
    //Prepare the parameter value for 'myParam'

    //The URL to which we will send the request
    const url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

    const rows = document.getElementById("rows").value;
    const cols = document.getElementById("cols").value;
    const mines = document.getElementById("mines").value;

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { rows:rows, cols:cols, mines:mines })
        .then(function (response) {
            responseBoard = response.data.board
            var Arraymines = response.data.board.minePositions
            console.log("Success: ", response.data);
            CreateGrid(rows,cols, Arraymines);
            //When successful, print 'Success: ' and the received data
            //var Rows = responseBoard.rows;
            // console.log("rows: ",Rows);
             //var Cols = responseBoard.cols;
            // const Minescount = response.data.mines;
            // const Minesposition = response.data.minepositions;
            //CreateGrid(Rows,Cols);
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}

function CreateGrid(rows,cols,Arraymines){
    var htmlBoard = document.getElementById("board");
    //var Cols = responseBoard.cols;
    //var Rows = responseBoard.rows;
    for (var i=0;i<rows;i++){
        var row = document.createElement("div")
        // row = grid.insertRow(i);
        for (var j=0;j<cols;j++){
            var button = document.createElement("button")
            button.id = i+"-"+j
            document.getElementById("button").addEventListener("click",check_button(Arraymines,button.id))
                
            // cell = row.insertCell(j);
            // cell.onclick = function(){
            //     Click_on_Cells(this);
            //     var mine = document.createAttribute("new_mine")
            //     mine.value = "false";
            //     cell.setAttributeNode(mine);
            //     console.log(mine.value)
            row.appendChild(button);
            }
        htmlBoard.appendChild(row);
        }

    }

// function check_button(Arraymines,buttonId){
//     var currentArrey = new Array();
//     if (currentArrey[] in Arraymines{

//     }
// }

// function AddMines(Arraymines){

//     for (var i=0; i< mines.value;i++){
//         console.log(mines.value)
//         var rowIndex = Math.floor(Math.random()*rows)
//          var colIndex = Math.floor(Math.random()*cols)

//          let cell = this.grid[rowIndex][colIndex];
//          cell.setAttribute("new_mine","true")
//          console.log(grid[rowIndex][colIndex].getAttribute("new_mine"))
//          if (testMode) cell.innerHTML="X"
//     }
// }

// box.onmousedown = function() {
//     if (event.which === 3){ //rightclick
//         PlaceFlag(box, gameboardarray, minesArray, buttonarray)
//     }
//     else{ //leftclick
//         OnLeftClick(box,gameboardarray, buttonarray, minesArray, rows, cols)
//     }

// };