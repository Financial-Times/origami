/*global fetch*/
const Delegate = require('ftdomdelegate');
const isOutside = require('./is-outside');

const debounce = function(fn,delay){
		let timeoutId;
		return function debounced(){
				if(timeoutId){
						clearTimeout(timeoutId);
				}
				const args = arguments;
				timeoutId = setTimeout(function() {
						fn.apply(this, args);
				}.bind(this), delay);
		};
};

function Suggest(container, input, dataSrc, showAllHandler) {
	this.container = container;
	this.searchEl = input;
	this.showAllHandler = showAllHandler;
	this.dataSrc = dataSrc;
	this.minLength = 2;
	this.showAllItem = true;
	this.init();
}

Suggest.prototype.init = function () {
	const self = this;

	this.suggestions = [];
	this.suggestionList = document.createElement('ul');
	this.suggestionList.classList.add('typeahead');
	this.container.appendChild(this.suggestionList);

	if(this.showAllItem) {
		this.viewAllItem = document.createElement('li');
		this.viewAllItem.classList.add('typeahead__view-all');
		this.viewAllItemInnerHTML = '<button type="submit" data-trackable="view-all">View All Results</button>';
	}

	this.delegate = new Delegate(this.container);
	this.bodyDelegate = new Delegate(document.body);
	this.suggest = this.suggest.bind(this);
	this.onType = debounce(this.onType, 150).bind(this);
	this.onDownArrow = this.onDownArrow.bind(this);
	this.onSuggestionKey = this.onSuggestionKey.bind(this);
	this.onSuggestionClick = this.onSuggestionClick.bind(this);

	this.delegate.on('keyup', 'input[type="search"]', function(ev) {
		switch(ev.which) {
			case 13 : return; // enter
			case 9 : return; // tab
			case 40 :
				self.onDownArrow(ev);
			break;
			default :
				self.onType(ev);
			break;
		}
	});

	this.delegate.on('focus', 'input[type="search"]', function(ev) {
		ev.target.setSelectionRange ? ev.target.setSelectionRange(0, ev.target.value.length) : ev.target.select();
		self.reshow();
	});


	this.delegate.on('click', 'input[type="search"]', function(ev) {
		ev.target.setSelectionRange ? ev.target.setSelectionRange(0, ev.target.value.length) : ev.target.select();
		self.reshow();
	});

	this.bodyDelegate.on('click', function (ev) {
		if (isOutside(ev.target, self.container)) {
			self.hide();
		}
	});

	this.bodyDelegate.on('focus', function (ev) {
		if (isOutside(ev.target, self.container)) {
			self.hide();
			document.querySelector('.o-header').classList.remove('o-header--searching');
		}
	});

	this.delegate.on('keyup', '.typeahead a', this.onSuggestionKey);
	this.delegate.on('click', '.typeahead a', this.onSuggestionClick);
};

/*** event handlers ***/

Suggest.prototype.reshow = function () {
	this.suggest(this.suggestions);
};

Suggest.prototype.onType = function () {
	this.searchTerm = this.searchEl.value;
	this.getSuggestions(this.searchTerm);
	[].forEach.call(this.suggestionList.querySelectorAll('li'), function (el) {
		el.setAttribute('data-trackable-meta', '{"search-term":"' + this.searchTerm + '"}');
	}.bind(this));
};

Suggest.prototype.onDownArrow = function () {
	if (this.suggestions.length) {
		this.suggestionList.querySelector('a').focus();
	}
};

Suggest.prototype.onSuggestionClick = function (ev) {
	this.chooseSuggestion(ev.target);
	// we don't prevent default as the link's url is a link to the search page
};

Suggest.prototype.onSuggestionKey = function (ev) {
	if (ev.which === 13) { // Enter pressed
		this.chooseSuggestion(ev.target);
		ev.stopPropagation();
		// we don't prevent default as the link's url is a link to the search page
		return;
	}

	if (ev.which === 40) { // down arrow pressed
		const oLi = ev.target.parentNode.oSibling;
		if (oLi) {
			oLi.firstChild.focus();
		}
		return;
	}

	if (ev.which === 38) { // up arrow pressed
		const previousLi = ev.target.parentNode.previousSibling;
		if (previousLi) {
			previousLi.firstChild.focus();
		} else {
			this.searchEl.focus();
		}
		return;
	}
};

/*** internals ***/

Suggest.prototype.getSuggestions = function (value) {
	value = value.trim();
	if (value.length >= this.minLength) {
		fetch(this.dataSrc + encodeURIComponent(value))
			.then(function (response) {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(this.suggest)
			.catch(function (err) {
				setTimeout(function () {
					throw err;
				});
			});
	} else {
		this.unsuggest();
	}
};

Suggest.prototype.suggest = function (suggestions) {
	const self = this;
	this.suggestionList.innerHTML = '';
	this.suggestions = suggestions;
	if (this.suggestions.length) {
		this.suggestions.slice(0, 5).forEach(function(suggestion){
			if (suggestion){
				const url = suggestion.url || ('/stream/' + suggestion.taxonomy + 'Id/' + suggestion.id);
				const id = suggestion.id;
				self.suggestionList.insertAdjacentHTML('beforeend', '<li class="typeahead__item"><a class="typeahead__link" data-trackable="typeahead" data-trackable-meta="{&quot;search-term&quot;:&quot;' +
						this.searchTerm + '&quot;}" data-concept-id="' + id + '" href="' + url + '">' +
						suggestion.name + '</a></li>');
			}
		}.bind(this));

		if(this.viewAllItem) {
			self.suggestionList.appendChild(this.viewAllItem);
			this.viewAllItem.innerHTML = this.viewAllItemInnerHTML; // IE seriously, WTF??
			this.viewAllItem.children[0].addEventListener('click', this.showAllHandler);
		}

		this.show();
	} else {
		this.hide();
	}
};

Suggest.prototype.unsuggest = function () {
	this.hide();
};

Suggest.prototype.hide = function () {
	this.suggestionList.classList.remove('typeahead--active');
};

Suggest.prototype.show = function () {
	this.suggestionList.classList.add('typeahead--active');
};

Suggest.prototype.chooseSuggestion = function (suggestionEl){
	this.searchEl.value = suggestionEl.textContent;
	this.hide();
	this.searchEl.focus();
};

module.exports = Suggest;
