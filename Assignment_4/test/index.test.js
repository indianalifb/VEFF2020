//Importing the application to test
let server = require('../index');
let mongoose = require("mongoose");
let Event = require('../models/event');
let Booking = require('../models/booking');

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Endpoint tests', () => {
    //###########################
    //These variables contain the ids of the existing event/booking
    //That way, you can use them in your tests (e.g., to get all bookings for an event)
    //###########################
    let eventId = '';
    let bookingId = '';

    //###########################
    //The beforeEach function makes sure that before each test, 
    //there is exactly one event and one booking (for the existing event).
    //The ids of both are stored in eventId and bookingId
    //###########################
    beforeEach((done) => {
        let event = new Event({ name: "Test Event", capacity: 10, startDate: 1590840000000, endDate: 1590854400000 });

        Event.deleteMany({}, (err) => {
            Booking.deleteMany({}, (err) => {
                event.save((err, ev) => {
                    let booking = new Booking({ eventId: ev._id, firstName: "Jane", lastName: "Doe", email: "jane@doe.com", spots: 2 });
                    booking.save((err, book) => {
                        eventId = ev._id;
                        bookingId = book._id;
                        done();
                    });
                });
            });
        });
    });

    //###########################
    //Write your tests below here
    //###########################

    it("should always pass", function () {
        console.log("Our event has id " + eventId);
        console.log("Our booking has id " + bookingId);
        chai.expect(1).to.equal(1);
    });


    //1. Get /events
    //Get all events
    it('GET /api/v1/events', function (done) {
        chai.request('http://localhost:3000/api/v1').get('/events').end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.expect(res.body).to.be.an('array');
            chai.expect(Object.keys(res.body).length).to.be.eql(1);
            done();
        });
    });

    //2. Get /events/:eventId
    //Get event by id
    it('GET /events/:eventId', function (done) {
        chai.request('http://localhost:3000/api/v1').get('/events/' + eventId).end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.expect(res.body).to.be.a('object');
            chai.expect(Object.keys(res.body).length).to.be.eql(8);
            chai.expect(res.body).to.have.property('_id').to.be.eql(eventId.toString());
            chai.expect(res.body).to.have.property('name').eql('Test Event'); 
            chai.expect(res.body).to.have.property('description').to.be.a('string');
            chai.expect(res.body).to.have.property('location').to.be.a('string');
            chai.expect(res.body).to.have.property('capacity').eql(10);
            chai.expect(res.body).to.have.property('startDate');
            chai.expect(res.body).to.have.property('endDate');
            chai.expect(res.body).to.have.property('bookings').to.be.an('array');
            done();
        });
    });

    //3. POST /events
    //  make a new event
    it('POST /events', function (done) {
        chai.request('http://localhost:3000/api/v1').post('/events')                                                                
        .set('Content-type', 'application/json')
        .send({'name':'Busaball Verzló', 'description':'framhaldsskólaball', 'location':'Hlíðarendi', 'capacity':70, 'startDate':'1590840000000', 'endDate':'1590854400000'})
        .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('_id');
        chai.expect(res.body).to.have.property('name').eql('Busaball Verzló'); 
        chai.expect(res.body).to.have.property('description').eql('framhaldsskólaball');
        chai.expect(res.body).to.have.property('location').eql('Hlíðarendi');
        chai.expect(res.body).to.have.property('capacity').eql(70);
        chai.expect(res.body).to.have.property('startDate');
        chai.expect(res.body).to.have.property('endDate');
        chai.expect(Object.keys(res.body).length).to.be.eql(7);
        done();
        });
    });


    //4. GET /events/:eventid/bookings
    //Get all bookings
    it("GET /events/:eventid/bookings", function (done) {
        chai.request('http://localhost:3000/api/v1').get('/events/' + eventId + '/bookings').end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.expect(res.body).to.be.an('array');
            chai.expect(Object.keys(res.body).length).to.be.eql(1);
            done();
        });
    });


    //5. POST /events/:eventid/bookings
    //Make a new booking
    it("POST /events/:eventid/bookings", function (done) {
        chai.request('http://localhost:3000/api/v1').post('/events/' + eventId + '/bookings')
            .set('Content-type', 'application/json')
            .send({ 'firstName': 'Jon', 'lastName': 'Jonsson', 'tel': '1234567', 'email': 'jon@ru.is', 'spots': 5 })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.be.a('object');
                chai.expect(res.body).to.have.property('firstName').eql('Jon');
                chai.expect(res.body).to.have.property('lastName').eql('Jonsson');
                chai.expect(res.body).to.have.property('tel').eql('1234567');
                chai.expect(res.body).to.have.property('email').eql('jon@ru.is');
                chai.expect(res.body).to.have.property('spots').eql(5);
                chai.expect(res.body).to.have.property('_id');
                chai.expect(Object.keys(res.body).length).to.be.eql(6);
                done();
            })
    });

    // 6. GET/events/:eventId/bookings/:bookingId
    // Get booking by eventId & bookingId
    it("GET /events/:eventId/bookings/:bookingId", function (done) {
        chai.request('http://localhost:3000/api/v1').get('/events/' + eventId + '/bookings/' + bookingId).end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.expect(Object.keys(res.body).length).to.be.eql(6);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('_id').to.be.eql(bookingId.toString());
            chai.expect(res.body).to.have.property('firstName').to.be.eql('Jane');
            chai.expect(res.body).to.have.property('lastName').to.be.eql('Doe');
            chai.expect(res.body).to.have.property('spots').to.be.eql(2);
            chai.expect(res.body).to.have.property('email').to.be.eql('jane@doe.com');
            chai.expect(res.body).to.have.property('tel').to.be.an('string');
            done();
        });
    });
});
