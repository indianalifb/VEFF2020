
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
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            const Rows = response.data.rows;
            console.log("rows: ",Rows);
            const Cols = response.data.cols;
            const Minescount = response.data.mines;
            const Minesposition = response.data.minepositions;
            CreateGrid(Rows,Cols,Minescount,Minesposition);
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}

function CreateGrid(Rows,Cols){
    grid.innerHTML="";
    for (var i=0;i<Rows;i++){
        row = grid.insertRow(i);
        for (var j=0;j<Cols;j++){
            cell = row.insertCell(j);
            cell.onclick = function(){
                Click_on_Cells(this);
                var mine = document.createAttribute("new_mine")
                mine.value = "false";
                cell.setAttributeNode(mine);
                console.log(mine.value)

            }
        }
    }
}
