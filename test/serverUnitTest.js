let expect = require('chai').expect;
let request = require('request');
let server = require('../server.js'); 

/* The below test uses the request package and tests if the server works correctly and if the api fetch works correctly
 using the term and media parameters.
 I used Pg 5 of the L2T20 HyperionDev notes to assist with this unit test.
*/
describe('Status and API fetch', function () {
    it('status of server', function(done){
        request('http://localhost:3001/searchApi',
            function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('fetch the request from api correctly', () => {
        let term = 'blue'
        let media = 'music'
        request(`https://itunes.apple.com/search?term=${term}&media=${media}`, function(error, response, body) {
            expect(response.statusCode).to.equal(200)
        });
    })
});
