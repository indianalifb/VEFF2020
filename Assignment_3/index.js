var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var port = 3000;
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

let nextEventId = 2;

var events = [
    { id: 0, name: "The Whistlers", description: "Romania, 2019, 97 minutes", location: "Bio Paradís, Salur 1", capacity: 40, startDate: new Date(Date.UTC(2020, 02, 03, 22, 0)), endDate: new Date(Date.UTC(2020, 02, 03, 23, 45)), bookings: [0, 1, 2] },
    { id: 1, name: "HarpFusion: Bach to the Future", description: "Harp ensemble", location: "Harpa, Hörpuhorn", capacity: 100, startDate: new Date(Date.UTC(2020, 02, 12, 15, 0)), endDate: new Date(Date.UTC(2020, 02, 12, 16, 0)), bookings: [] }
];

var bookings = [
    { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3 },
    { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1 },
    { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5 }
];


app.get('/', (req, res) => {
    res.status(200).send("Hello world")
});

/* READ ALL EVETNS. RETURNS AN ARRAY OF ALL EVENTS*/
// app.get('/api/v1/events', (req, res) => {
//     //res.status(200).json(events)
//     let showEvents = [];
//     events.forEach(event => {
//         showEvents.push({
//             id: event.id,
//             name: event.name,
//             capacity: event.capacity,
//             startDate: event.startDate
//             , endDate: event.endDate
//         })
//     });
//     res.send(showEvents)
//     res.status(200).end()
// });


/* READ AN INDIVIDUAL EVENT*/
// app.get('/api/v1/events/:eventId', (req, res) => {
//     for (let i = 0; i < events.length; i++) {
//         if (events[i].id == req.params.eventId) {
//             res.status(200).json(events[i])
//             return;
//         }
//     }
//     //res.status(200).send("Hello world")
// });

/*CREATE A NEW EVENT*/
// app.post('api/v1/events', (req, res) => {
//     let checking = logic.eventChecking(req.body);
//     if (checking) {
//         res.status(400).json({ message: errorMess[checking] });
//     } else {
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


/*READ AN INDIVIDUAL BOOKING */


/*CREATE A NEW BOOKING */


/*DELET A BOOKING */


/*DELET ALL BOOKINGS FOR AN EVENT */

// 1. Read all events
//For each event, only the name, id, capacity, startDate and endDate
// is included in the response.
app.get('/api/v1/events', function (req, res) {
    let resultEvents = [];
    events.forEach(event => {
        resultEvents.push({
            id: event.id,
            name: event.name,
            capacity: event.capacity,
            startDate: event.startDate,
            endDate: event.endDate
        })
    });
    res.status(200).json(resultEvents);
});

// 2. Read an individual event
// Returns all attributes of a specified event
app.get('/api/v1/events/:id', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.id) {
            res.status(200).send(events[i]);
            return;
        }
    }
    res.status(404).send({ "message": 'id that was requested does not exist' });
});

// 3. Create a new event
// Creates a new event. The endpoint expects at least the name, capacity, startDate and endDate
// parameter. Description and location are optional. 
// The id shall be auto-generated (i.e., not provided
// in the request body). Similarly, the bookings array shall be initialised to an empty array. The
// request, if successful, shall return the new event (all attributes, including id and bookings array).

// To test this: in terminal
//curl POST -H "Content-Type: application/json" -d '{"name":"indiana", "capacity":3,"startDate":"2020-04-03T22:00:00.000Z","endDate":"2020-05-03T22:00:00.000Z","description":"rokk"}' http://localhost:3000/api/v1/events
app.post('/api/v1/events', function (req, res) {
    if (req.body === undefined ||
        req.body.name === undefined ||
        req.body.capacity === undefined || req.body.capacity < 0 ||
        req.body.startDate === undefined ||
        req.body.endDate === undefined) {
        res.status(400).send({ message: 'invalid parameter for event' });
        return;
    }
    if (req.body.description === undefined) {
        req.body.description = '';
    }
    if (req.body.location === undefined) {
        req.body.location = '';
    }
    let newEvent = {
        id: nextEventId,
        name: req.body.name,
        capacity: req.body.capacity,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        location: req.body.location,
        bookings: [],
    };
    nextEventId++;
    events.push(newEvent);
    res.status(201).send(newEvent);
});


// 4. Update an event
// (Completely) Updates an existing event. The updated data is expected in the request body (all
// attributes, excluding the id and the bookings array). The request is only successful if there are no
// existing bookings for the event. The request, if successful, returns all attributes of the event.

// To test in terminal:
//curl -H 'Content-Type: application/json' -X PUT -d '{"name":"indiana", "capacity": 200,"startDate":"2020-04-03T22:00:00.000Z","endDate":"2020-05-03T22:00:00.000Z","description":"rokk"}' localhost:3000/api/v1/events/1
app.put('/api/v1/events/:id', function (req, res) {
    console.log("update event");
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.id) {
            if (events[i].bookings.length === 0) {
                if (req.body === undefined ||
                    req.body.name === undefined ||
                    req.body.capacity === undefined || req.body.capacity < 0 ||
                    req.body.startDate === undefined ||
                    req.body.endDate === undefined) {
                    res.status(400).send({ message: 'invalid parameter for event' });
                    return;
                }
                if (req.body.description === undefined) {
                    req.body.description = '';
                }
                if (req.body.location === undefined) {
                    req.body.location = '';
                }
                let updatedEvent = {
                    id: events[i].id,
                    name: req.body.name,
                    capacity: req.body.capacity,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    description: req.body.description,
                    location: req.body.location,
                    bookings: [],
                };
                events[i] = updatedEvent;
                res.status(201).send(events[i]);
                return;
            }
            else {
                res.status(400).send({ "message": 'this event has a booking' });
                return;
            }
        }
    }
    res.status(404).send({ "message": 'id that was requested does not exist' });
});

// 5. Delete an event
// Deletes an existing event. The request is only successful if there are no existing bookings for the
// event. The request, if successful, returns all attributes of the deleted event.

//test in terminal:
// curl -X DELETE localhost:3000/api/v1/events/0
app.delete('/api/v1/events/:id', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.id) {
            if (events[i].bookings.length === 0) {
                let updatedEvent = events.splice(i, 1); //removes one element from position i
                res.status(200).send(updatedEvent);
                return;
            }
            else {
                res.status(400).send({ "message": 'this event has a booking, cannot be deleted' });
                return;
            }
        }
    }
    res.status(404).send({ "message": 'id that was requested does not exist' });
});

// 6. Delete all events
// Deletes all existing events. The request also deletes all bookings for all existing events. The request,
// if successful, returns all deleted events (all attributes), as well as their bookings (as a part of the
// bookings attribute).

//test in terminal:
// curl -X DELETE localhost:3000/api/v1/events

app.delete('/api/v1/events', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        var bookingData = [];
        if (events[i].bookings !== undefined) {
            for (let j = 0; j < events[i].bookings.length; j++) {
                if (events[i].bookings.includes(bookings[j].id)) {
                    bookingData.push(bookings[j]);
                }
            }
            events[i].bookings = bookingData;
        }
    }
    var returnData = events.slice();
    events = [];
    bookings = [];
    res.status(200).send(returnData);
});


// 1. Read all bookings for an event
// Returns an array of all bookings (with all attributes) for a specified event.
app.get('/api/v1/events/:id/bookings', (req, res) => {
    let all_bookings = [];
    for (let x = 0; x < events.length; x++) {
        if (Number(events[x].id) === Number(req.params.id)) {
            for (let y = 0; y < bookings.length; y++) {
                bookings.forEach(booking => {
                    if (Number(events[x].bookings[y]) === Number(booking.id)) {
                        all_bookings.push(bookings[y]);
                    }
                });
            }
            res.status(200).send(all_bookings);
            return;
        }
    }
    res.status(404).json({ message: 'no bookings found' })
});


// app.use('*', (req, res) => {
//     res.status(405).send('Operation not supported')
// });

