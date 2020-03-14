var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var port = 3000;
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

var events = [
    { id: 0, name: "The Whistlers", description: "Romania, 2019, 97 minutes", location: "Bio Paradís, Salur 1", capacity: 40, startDate: new Date(Date.UTC(2020, 02, 03, 22, 0)), endDate: new Date(Date.UTC(2020, 02, 03, 23, 45)), bookings: [0, 1, 2] },
    { id: 1, name: "HarpFusion: Bach to the Future", description: "Harp ensemble", location: "Harpa, Hörpuhorn", capacity: 100, startDate: new Date(Date.UTC(2020, 02, 12, 15, 0)), endDate: new Date(Date.UTC(2020, 02, 12, 16, 0)), bookings: [] }
];
// let bookings = [
//     {id: 0, firstName: "Bertha", lastName: "Óladóttir", spots}
// ]

var bookings = [
    { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3 },
    { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1 },
    { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5 }
];

let bookings = [
    {eventId: 1,bookingEv: [
        { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3}
    ]},
    {eventId: 0,bookingEv: [
        { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1},
        { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5}
    ]}
    // { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3},
    // { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1},
    // { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5}
 ];

app.get('/',(req,res) =>{
    res.status(200).send("Hello world")
});

/* READ ALL EVETNS. RETURNS AN ARRAY OF ALL EVENTS*/ 
app.get('/api/v1/events',(req,res)=> {
    //res.status(200).json(events)
    let showEvents = [];
    events.forEach(event => {
        showEvents.push({
            id: event.id,
            name: event.name,
            capacity: event.capacity,
            startDate: event.startDate
            , endDate: event.endDate
        })
    });
    res.send(showEvents)
    res.status(200).end()
});


/* READ AN INDIVIDUAL EVENT*/
app.get('/api/v1/events/:eventId',(req,res)=> {
    for (let i =0;i<events.length;i++){
        if (events[i].id == req.params.eventId){
            res.status(200).json(events[i])
            return;
        }
    }
    //res.status(200).send("Hello world")
});

/*CREATE A NEW EVENT*/
// app.post('api/v1/events',(req,res)=> {
//     let checking = logic.eventChecking(req.body);
//     if (checking) {
//         res.status(400).json({message: errorMess[checking]});
//     } else{
//         let newEvent = Object(
//             {
//                 id: logic
//             }

//         );
//     }

// });




/* UPDATE AN EVENT*/


/*DELET AN EVENT */


/*DELET ALL EVENTS */


/*READ ALL BOOKINGS FOR AN EVENT */
app.get('/api/v1/events/:eventId/bookings', (req, res) =>{
    for (let x = 0; x < events.length; x++){
        if (Number(events[x].id) === Number(req.params.eventId)){
            let all_bookings = [];
            for (let y = 0; i < bookings.length; y++){
                events[x].bookings.forEach(booking_ID =>{
                    if (Number(bookings[y].id) === Number(booking_ID)){
                        all_bookings.push(bookings[y]);
                    }
                });
            }
            res.status(200).json(all_bookings);
            return;
        }
    }
    res.status(404).json({message: 'no bookings found'})
});


/*READ AN INDIVIDUAL BOOKING */


/*CREATE A NEW BOOKING */


/*DELET A BOOKING */


/*DELET ALL BOOKINGS FOR AN EVENT */

// 1. Read all events
//For each event, only the name, id, capacity, startDate and endDate
// is included in the response.
app.get('/api/v1/events', function (req, res) {
    console.log("read all events", events);
    let tempEvents = JSON.parse(JSON.stringify(events));
    for (i = 0; i < tempEvents.length; i++) {
        delete tempEvents[i].bookings;
        delete tempEvents[i].location;
        delete tempEvents[i].description;
    }
    res.status(200).json(tempEvents);
});


app.use('*', (req, res) => {
    res.status(405).send('Operation not supported')
});

