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
            var rows = 10
            var cols = 10
            arraymines = addmines();
            CreateGrid(rows,cols,arraymines)
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}
function addmines(){
    var arraymines = [
        [1, 3],
        [3, 0],
        [4, 2],
        [4, 5],
        [4, 7],
        [6, 9],
        [7, 7],
        [8, 9],
        [9, 3],
        [9, 9],
    ];
    return arraymines

}

function CreateGrid(rows,cols,Arraymines){
    var htmlBoard = document.getElementById("board");
    board_arr = initializeArray(rows,cols,Arraymines)
    //var Cols = responseBoard.cols;
    //var Rows = responseBoard.rows;
    for (var i=0;i<rows;i++){
        var row = document.createElement("div")
        // row = grid.insertRow(i);
        for (var j=0;j<cols;j++){
            let button = document.createElement("button")
            //button.id = i+"-"+j
            button.id =i.toString()+ "-" +j.toString();
            button.innerHTML = "<span></span>";
            button.onclick=() =>{
                left_click(board_arr,button);
            }
            button.oncontextmenu=() =>{
                button = right_click(button)
            }

            // console.log(button.id)
            // console.log(Arraymines[0])
            //var arr = new Array(button)
            //button[i][j].addEventListener("click",check_button(board_arr));
            //  button.onmousedown = function() {
            //      if (event.which === 3){ //rightclick
                     
            // //         //PlaceFlag(box, gameboardarray, minesArray, buttonarray)
            //      }
            //      else{ //leftclick
            //          check_button(board_arr,button.id)
            //         //OnLeftClick(box,gameboardarray, buttonarray, minesArray, rows, cols)
                //check_button(board_arr,button)
            
            // cell = row.insertCell(j);
            // cell.onclick = function(){
            //     Click_on_Cells(this);
            //     var mine = document.createAttribute("new_mine")
            //     mine.value = "false";
            //     cell.setAttributeNode(mine);
            //     console.log(mine.value)
            row.appendChild(button);
            //document.body.appendChild(button)
            }
        htmlBoard.appendChild(row);
        
    }
}
    

function left_click(board_arr,button){
    var box = document.getElementById(button.id)
    console.log(button.id)
    console.log(box)
    button_id = button.id.split("-",)
    button_id1_int = parseInt(button_id[0])

    button_id2_int = parseInt(button_id[1])


    if (board_arr[button_id1_int][button_id2_int] = "M"){
        console.log("er M")
        //var box_ = document.getElementById("img");
        // mineImg.src="bomb.png";
        // mineImg.className = "mine";
        // box.appendChild(mineImg)
        box.style.backgroundColor = " red"
        button.className = "M"
    }

    else {
        box.style.backgroundColor = "darkgrey";
        button.className = "N"
    }
    
    // var source = event.target;
    // id = source.id;
    // if(event.which==3){
    // }
    // if (event.which==1){
    //     console.log("hallo")
    //     // if(board_arr[id]=="M"){
    //     //     console.log("hallo")
    //     // }
        
    }

function right_click(button){
}
    // console.log(buttonId)
    // button_str1,button_str2 = buttonId.split("-")
    // button_int1 = parseInt(button_str1)
    // button_int2 = parseInt(button_str2)
    //button_int2 = parseInt(button_str2)
    // if(board_arr[button_int1][button_int2] == "M"){
    //     alert(gameover)
    // }
    // else{
    //     button.className = "number"
    // }

    //buttonId1,buttonId2 = buttonId.split(",")
    // for (i = 0; i < Arraymines.length; i++){
    //     var bomb = Arraymines[i]
    //     var bombstring = bomb[0] + "-" + bomb[1]
    //     if (buttonId == bombstring){
    //         alert('gameover')
        
    
    // if (button.id in Arraymines){
    //     button.className = "mine"
    // }

    //for(i=0;i<Arraymines.lenght;i++){

    //     if (buttonId1 == Arraymines[i]){
    //         for(j=0;j<Arraymines.lenght;j++){
    //             if(buttonId2 == Arraymines[j]){
    //                 button.className = "mine"
    //             }
    //         }
    //     }
            
    // }
function initializeArray(rows,cols,Arraymines){
    var dimension = rows*cols
    board_arr = createEmptyArray(cols,rows)
    row = parseInt(rows)
    col = parseInt(cols)


    for (i=0;i<Arraymines.lenght;i++){
        var new_arr = Arrraymines[i]
        var row_m =new_arr[0]
        var col_m = new_arr[1]
        var top = [row_m-1][col_m]
        var top_left = [row_m-1][col_m-1]
        var top_right = [row_m-1][col_m+1]
        var left = [row_m][col_m-1]
        var right =[row_m][col_m+1]
        var bottom= [row_m+1][col_m]
        var bottom_right = [row_m+1][col_m+1]
        var bottom_left = [row_m+1][col_m-1]
        var box = [row_m][col_m] 
        board_arr[row_m][col_m] = "M"
        if (new_arr[0] == 0){
            if (new_arr[1] == 0){
                board_arr[right[0]][right[1]]+=1;
                board_arr[bottom_right[0]][bottom_right[1]]+=1;
                board_arr[bottom[0]][bottom[1]]+=1;
        }
            else if(new_arr[1] == col-1){
                board_arr[bottom[0]][bottom[1]]+=1;
            board_arr[bottom_left[0]][bottom_left[1]]+=1;
            board_arr[left[0]][left[1]]+=1;
        }
            else  {
                board_arr[bottom[0]][bottom[1]]+=1;
                board_arr[bottom_left[0]][bottom_left[1]]+=1;
                board_arr[bottom_right[0]][bottom_right[1]]+=1;
                board_arr[right[0]][right[1]]+=1;
                board_arr[left[0]][left[1]]+=1;
        }
        
    }
        else if(new_arr[0] == row-1){
            if (Arraymines[1] == 0){
                board_arr[right[0]][right[1]]+=1;
                board_arr[top[0]][top[1]]+=1;
                board_arr[top_right[0]][top_right[1]]+=1;
        }
            else if(new_arr[1] == col-1 ){
                board_arr[top[0]][top[1]]+=1;
            board_arr[top_left[0]][top_left[1]]+=1;
            board_arr[left[0]][left[1]]+=1;
        }
            else  {
                board_arr[top[0]][top[1]]+=1;
                board_arr[top_left[0]][top_left[1]]+=1;
                board_arr[top_right[0]][top_right[1]]+=1;
                board_arr[right[0]][right[1]]+=1;
                board_arr[left[0]][left[1]]+=1;
        }

}
  else if (new_arr[1] == 0){
    board_arr[top[0]][top[1]]+=1;
    board_arr[top_right[0]][top_right[1]]+=1;
    board_arr[right[0]][right[1]]+=1;
      board_arr[bottom[0]][bottom[1]]+=1;
      board_arr[bottom_right[0]][bottom_right[1]]+=1;
  }
  else if (new_arr[1] == col-1){
    board_arr[top[0]][top[1]]+=1;
    board_arr[left[0]][left[1]]+=1;
    board_arr[left[0]][left[1]]+=1;
    board_arr[bottom[0]][bottom[1]]+=1;
    board_arr[bottom_left[0]][bottom_left[1]]+=1;
}
else{
    board_arr[top[0]][top[1]]+=1;
    board_arr[bottom[0]][bottom[1]]+=1;
    board_arr[left[0]][left[1]]+=1;
    board_arr[top_right[0]][top_right[1]]+=1;
    board_arr[left[0]][left[1]]+=1;
    board_arr[right[0]][right[1]]+=1;
    board_arr[bottom_left[0]][bottom_left[1]]+=1;
    board_arr[bottom_right[0]][bottom_right[1]]+=1;
}
    }
    // for (i=0;i<Arraymines.lenght;i++){
    //     var row_m = Arraymines[0]
    //     var col_m = Arraymines[1]
    //     board_arr[0][1] = "M"
    for (var row=0;row<row_m;row++){
        for (var col=0;col<col_m;col++){
            if(JSON.stringify(board_arr[row][col]).includes("M")){
                board_arr[row][col] = "M"
            
        }
        else{
            board_arr[row][col] = "N"
            var box = board_arr[row][col] 
            if (board_arr[row][col] == 1){
                box.className = "1"
            }
            if (board_arr[row][col] == 2){
                box.className = "2"
            }
            if (board_arr[row][col] == 3){
                box.className = "3"
            }
            if (board_arr[row][col] == 4){
                box.className = "4"
            }
            if (board_arr[row][col] == 5){
                box.className = "5"
            }
            if (board_arr[row][col] == 6){
                box.className = "6"
            }
            if (board_arr[row][col] == 7){
                box.className = "7"
            }
        }
    }
    }
    
    return board_arr
}

function createEmptyArray(rows,cols){
    //let my_array = Array(rows).fill().map(() => Array(columns).fill(0));
    dimension = rows*cols
    my_array = Array.from(Array(dimension), () => 0)
    //my_array = new Array(dimension+1).join('0').split(" ").map(parseInt)
    //my_array = new Array(dimension).fill(0)
    // my_array = []
    // len_cols = parseInt(cols)
    // for(var col = 0;col<rows;col++){
    //     my_array[col] = Array.from(Array(len_cols),()=> 0)
    
    return my_array;
}
    //var my_array = new Array(dimension).fill(0)
    // var arr = [0]
    // var arr2 = []
    // while (dimension > 0){
    //     if (len&1)arr2= arr2.concat(arr);
    //         arr1 = arr1.concat(arr1)
    //         len >>>= 1;
    //     } 
    // return arr2 
    //return my_array
 




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

