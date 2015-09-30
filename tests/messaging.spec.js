/* global describe:false, it:false, require:false, beforeEach */

const expect = require('chai').expect;
const nNotification = require('../main.js');
const helpers = require('./phantomjs-helpers.js');
nNotification.init();

describe("nNotification", function(){

	beforeEach(function(done) {
		const notification = document.querySelector('.n-notification');
		if(notification) {
			nNotification.hide();
		}
		setTimeout(done, 501);
	});

	const message = "<p>This is a notification</p>";

	it("Should be able to show a message with the given content", function(){

		nNotification.show({content:message,type:'message'});
		expect(document.querySelector('.n-notification')).not.to.be.null;
		const content = document.querySelector('.n-notification__content').innerHTML;
		expect(content).to.contain(message);
	});

	it('Should show a message when an FT.Notification event is fired', function(done){
		const event = new CustomEvent('nNotification.show', {detail:{content:message}});
		document.dispatchEvent(event);
		setTimeout(function(){
			expect(document.querySelector('.n-notification')).not.to.be.null;
			const content = document.querySelector('.n-notification__content').innerHTML;
			expect(content).to.contain(message);
			done();
		}, 0);
	});

	it('Will hide the message if the user clicks the close button', function(done){
		nNotification.show({content:message,type:'message'});
		helpers.click(document.querySelector('.n-notification__close-js'));

		setTimeout(function(){
			expect(document.querySelector('.n-notification')).to.be.null;
			done();
		}, 1500);

	});

	it('Will hide message after 5 seconds if no other interaction', function(done){
		this.timeout(8000);
		nNotification.show({content:message,type:'message'});
		const clickEvent = new Event('click');
		document.querySelector('.n-notification__close').dispatchEvent(clickEvent);
		setTimeout(function(){
			expect(document.querySelector('.n-notification')).to.be.null;
			done();
		}, 7000);
	});

});
