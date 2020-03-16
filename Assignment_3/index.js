var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

let nextEventId = 1;
let nextBookingId = 1;

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
            res.status(200).json(events[i]);
            return;
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.id + ' does not exist' });
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
        req.body.capacity === undefined || req.body.capacity < 0 || Number.isNaN(Number(req.body.capacity)) == NaN || 
        req.body.startDate === undefined || date_validation(req.body.startDate,req.body.endDate) ||
        req.body.endDate === undefined) {
        res.status(400).json({ message: 'Invalid parameter for event' });
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
    res.status(201).json(newEvent);
});


// 4. Update an event
// (Completely) Updates an existing event. The updated data is expected in the request body (all
// attributes, excluding the id and the bookings array). The request is only successful if there are no
// existing bookings for the event. The request, if successful, returns all attributes of the event.

// To test in terminal:
//curl -H 'Content-Type: application/json' -X PUT -d '{"name":"indiana", "capacity": 200,"startDate":"2020-04-03T22:00:00.000Z","endDate":"2020-05-03T22:00:00.000Z","description":"rokk"}' localhost:3000/api/v1/events/1
app.put('/api/v1/events/:id', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.id) {
            if (events[i].bookings.length === 0) {
                if (req.body === undefined ||
                    req.body.name === undefined ||
                    req.body.capacity === undefined || req.body.capacity < 0 || Number.isNaN(Number(req.body.capacity)) == NaN || 
                    req.body.startDate === undefined ||
                    req.body.endDate === undefined) {
                    res.status(400).send({ message: 'Invalid parameter for event' });
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
                res.status(200).json(events[i]);
                return;
            }
            else {
                res.status(400).json({ "message": 'Cannot update event with id: ' + req.params.id + ', it has bookings.' });
                return;
            }
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.id + ' does not exist.' });
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
                res.status(200).json(updatedEvent);
                return;
            }
            else {
                res.status(400).json({ "message": 'Cannot delete event with id: ' + req.params.id + ', it has bookings.' });
                return;
            }
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.id + ' does not exist.' });
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
    res.status(200).json(returnData);
});


// 1. Read all bookings for an event
// Returns an array of all bookings (with all attributes) for a specified event.
app.get('/api/v1/events/:id/bookings', (req, res) => {
    let all_bookings = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == Number(req.params.id)) {
            for (let j = 0; j < bookings.length; j++) {
                if (events[i].bookings.includes(Number(bookings[j].id))) {
                    all_bookings.push(bookings[j]);
                }
            }
            res.status(200).json(all_bookings);
            return;
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.id + ' does not exist.' });
});

// 2. Read an individual booking
// Returns all attributes of a specified booking (for an event).
app.get('/api/v1/events/:eventId/bookings/:bookingId', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.eventId) {
            if (events[i].bookings.includes(Number(req.params.bookingId))) {
                for (let j = 0; j < bookings.length; j++) {
                    if (bookings[j].id == req.params.bookingId) {
                        res.status(200).json(bookings[j]);
                        return;
                    }
                }
            }
            else {
                res.status(404).json({ "message": 'Booking with id: ' + req.params.eventId + ' does not exist.' });
                return;
            }
        }

    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.eventId + ' does not exist.' });
});

// 3. Create a new booking
// Creates a new booking for a specified event. The endpoint expects firstName, lastName, spots and
// tel and/or email (meaning that you can provide tel and email, only tel, or only email) attributes
// in the request body. The id (unique, non-negative number) shall be auto-generated. The request
// is only successful if there are still enough spots left in the corresponding event. The request, if
// successful, shall return the new booking (all attributes, including id). Furthermore, the id of the
// new booking shall be added to the bookings array in the corresponding event.

//To test in terminal:
// curl POST -H "Content-Type: application/json" -d '{"firstName":"indiana","lastName":"bersteins","tel":"+3546944774","email":"blala","spots": 3}' localhost:3000/api/v1/events/0/bookings

function checkForEmptySpots(eventCapacity, eventBookings) {
    let spotsLeft = eventCapacity;
    for (let i = 0; i < eventBookings.length; i++) {
        spotsLeft = spotsLeft - bookings[eventBookings[i]].spots;
    }
    return spotsLeft;
}

app.post('/api/v1/events/:eventId/bookings', function (req, res) {
    for (let i = 0; i < events.length; i++) {
        if (Number(events[i].id) === Number(req.params.eventId)) {
            let numberOfSpotsLeft = checkForEmptySpots(events[i].capacity, events[i].bookings);
            if (numberOfSpotsLeft > 0 && numberOfSpotsLeft >= req.body.spots) {
                if (req.body === undefined ||
                    req.body.firstName === undefined ||
                    req.body.lastName === undefined || req.body.capacity < 0 || Number.isNaN(Number(req.body.capacity)) == NaN ||
                    req.body.spots === undefined || req.body.spots > 0 || Number.isNaN(Number(req.body.spots)) == NaN) {
                    res.status(400).json({ message: 'Invalid parameter for booking' });
                    return;
                }
                else if (req.body.tel === undefined || req.body.email === undefined) {
                    res.status(400).json({ message: 'Tel or email is required' });
                    return;
                }
                if (req.body.tel === undefined) {
                    req.body.tel = '';
                }
                if (req.body.email === undefined) {
                    req.body.email = '';
                }
                let newBooking = {
                    id: nextBookingId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    tel: req.body.tel,
                    email: req.body.email,
                    spots: req.body.spots,
                };
                bookings.push(newBooking);
                events[i].bookings.push(newBooking.id);
                nextBookingId++;
                res.status(201).json(newBooking);
                return;
            }
            else {
                res.status(400).json({ "message": 'Event with id: ' + req.params.eventId + ' is fully booked' });
            }
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.eventId + ' does not exist.' });
});


//4. Delete a booking
// Deletes an existing booking for a specified event. The request, if successful, returns all attributes
// of the deleted booking. The booking id is removed from the corresponding event.

//test in terminal:
// curl -X DELETE localhost:3000/api/v1/events/0/bookings/0
app.delete('/api/v1/events/:eventId/bookings/:bookingId', function (req, res) {
    console.log("delete booking");
    for (let i = 0; i < events.length; i++) {
        if (Number(events[i].id) === Number(req.params.eventId)) {
            events.forEach(event => {
                if (event.bookings.includes(Number(req.params.bookingId))) {
                    for (let j = 0; j < bookings.length; j++) {
                        events[i].bookings.splice(j, 1);
                        if (bookings[j].id == req.params.bookingId) {
                            let updatedbooking = bookings.splice(j, 1);
                            res.status(200).json(updatedbooking);
                            return;
                        }
                    }
                } else {
                    res.status(404).json({ "message": 'Booking with id: ' + req.params.bookingId + ' does not exist.' });
                    return;
                }
            })
        }
        res.status(404).json({ "message": 'Event with id: ' + req.params.eventId + ' does not exist.' });
    }
});

//5. delete all bookings for an event
// Deletes all existing bookings for a specified event. The request, if successful, returns all deleted
// bookings (all attributes). The bookings array for the corresponding event is emptied.

// test in terminal:
// curl -X DELETE localhost:3000/api/v1/events/0/bookings

app.delete('/api/v1/events/:eventId/bookings', function (req, res) {
    var deletedBookings = []
    for (let i = 0; i < events.length; i++) {
        if (events[i].id == req.params.eventId) {
            var eventBookings = events[i].bookings.slice();
            events[i].bookings = [];
            for (let y = 0; y < bookings.length; y++) {
                if (eventBookings.includes(bookings[y].id)) {
                    deletedBookings.push(bookings[y]);
                    bookings.splice(y, 1);
                    y -= 1;
                }
                res.status(400).json({ "message": 'Event with id: ' + req.params.eventId + ' has no bookings' });
            }
            res.status(200).json(deletedBookings);
            return;
        }
    }
    res.status(404).json({ "message": 'Event with id: ' + req.params.eventId + ' does not exist.' });
});



app.use('*', (req, res) => {
    res.status(405).send('Operation not supported, unsupported HTTP verb or non-existing endpoint ')
});


function date_validation(start_date,end_date){
    var start_date_parsed = new Date(Date.parse(start_date));
    var end_date_parsed = new Date(Date.parse(end_date));
    if (start_date_parsed.toUTCString()!=start_date){
        return 1;
    }

    if (end_date_parsed.toUTCString()!=end_date){
        return 2;
    }
    //if ( )
    return 0;
}
