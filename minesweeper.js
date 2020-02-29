function doAjax() {
    //Prepare the parameter value for 'myParam'
    var paramValue = "someValue";

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

    var rows = document.getElementById("rows").value
    var cols = document.getElementById("cols").value
    var mines = document.getElementById("mines").value



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