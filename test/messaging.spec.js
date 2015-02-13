"use strict";

var expect = require('chai').expect;
var notification = require('../src/main.js');

describe("Messaging", function(){

	var message = "<p>This is a notification</p>";

	it("Should be able to show a message with the given content", function(){

		notification({content:message});
		expect(document.querySelector('.notification')).not.to.be.null;
		var content = document.querySelector('.notification__content').innerHTML;
		expect(content).to.contain(message);
	});

	it('Should show a message when an FT.Notification event is fired', function(done){
		var event = new CustomEvent('FT.Notification', {detail:{content:message}});
		document.dispatchEvent(event);
		setTimeout(function(){
			expect(document.querySelector('.notification')).not.to.be.null;
			var content = document.querySelector('.notification__content').innerHTML;
			expect(content).to.contain(message);
			done();
		}, 0);
	});

	// todo [PW] Make this test correctly dispatch a click event
	it.skip('Will hide the message if the user clicks the close button', function(done){
		notification({content:message});
		setTimeout(function(){
			expect(document.querySelector('.notification')).to.be.null;
			done();
		}, 1500);

	});

	it('Will hide message after 5 seconds if no other interaction', function(done){
		this.timeout(8000);
		notification({content:message});
		var clickEvent = new Event('click');
		document.querySelector('.notification__close').dispatchEvent(clickEvent);
		setTimeout(function(){
			expect(document.querySelector('.notification')).to.be.null;
			done();
		}, 7000);
	});

});
