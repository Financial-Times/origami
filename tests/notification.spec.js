/* global describe, it, beforeEach afterEach*/

const expect = require('chai').expect;
const helpers = require('./phantomjs-helpers.js');
const lolex = require('lolex');
const nNotification = require('../main.js');

describe('Notifications', () => {

  const defaultDuration = 500;
  let clock;

  beforeEach(() => {
    clock = lolex.install();
  });

  afterEach(() => {
    clock.uninstall();
    nNotification.teardown();
  });

  it('should display a notification with the expected content', () => {
    nNotification.show({title: 'Title', content: 'Content'});
    expect(document.querySelector('.n-notification__item')).not.to.be.null;
    const content = document.querySelector('.n-notification__content').innerHTML;
    expect(content).to.contain('Content');
  });

  it('should display an error notification', () => {
    nNotification.show({type: 'error'});
    expect(document.querySelector('.n-notification--error')).not.to.be.null;
  });

  it('should remove the message after the specified timeout', () => {
    nNotification.show({title: 'Title', content: 'Content', duration: defaultDuration});
    expect(document.querySelector('.n-notification__item')).not.to.be.null;
    clock.tick(defaultDuration + 1);
    expect(document.querySelector('.n-notification__item')).to.be.null;
  });

  it('should hide the nootification when the close button is clicked', () => {
    nNotification.show({title: 'Title', content: 'Content'});
    expect(document.querySelector('.n-notification__item')).not.to.be.null;
    helpers.click(document.querySelector('.n-notification__close'));
    expect(document.querySelector('.n-notification__item')).to.be.null;
  });

  it('displays multiple messages stacked in the right order', () => {
    nNotification.show({title: 'Title', content: 'First'});
    nNotification.show({title: 'Title', content: 'Second'});
    nNotification.show({title: 'Title', content: 'Third'});
    expect(document.querySelectorAll('.n-notification__item').length).to.equal(3);
    expect(document.querySelector('.n-notification__content').innerHTML).to.contain('Third');
    helpers.click(document.querySelector('.n-notification__close'));
    expect(document.querySelector('.n-notification__content').innerHTML).to.contain('Second');
  });

});
