/* jshint browser:true */
/* global describe:false, it:false, require:false */
"use strict";

var expect = require('chai').expect;
var messaging = require('../src/main.js');
var helpers = require('../test/phantomjs-helpers.js');
messaging.init();

describe("Messaging", function(){

	var message = "<p>This is a notification</p>";

	it("Should be able to show a message with the given content", function(){

		messaging.showMessage({content:message,type:'message'});
		expect(document.querySelector('.message')).not.to.be.null;
		var content = document.querySelector('.message__content').innerHTML;
		expect(content).to.contain(message);
	});

	it('Should show a message when an FT.Notification event is fired', function(done){
		var event = new CustomEvent('FT.Message', {detail:{content:message}});
		document.dispatchEvent(event);
		setTimeout(function(){
			expect(document.querySelector('.message')).not.to.be.null;
			var content = document.querySelector('.message__content').innerHTML;
			expect(content).to.contain(message);
			done();
		}, 0);
	});

	it('Will hide the message if the user clicks the close button', function(done){
		messaging.showMessage({content:message,type:'message'});
		helpers.click(document.querySelector('.message__close-js'));

		setTimeout(function(){
			expect(document.querySelector('.message')).to.be.null;
			done();
		}, 1500);

	});

	it('Will hide message after 5 seconds if no other interaction', function(done){
		this.timeout(8000);
		messaging.showMessage({content:message,type:'message'});
		var clickEvent = new Event('click');
		document.querySelector('.message__close').dispatchEvent(clickEvent);
		setTimeout(function(){
			expect(document.querySelector('.message')).to.be.null;
			done();
		}, 7000);
	});

});
