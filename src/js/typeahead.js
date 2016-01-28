/*global fetch*/
const Delegate = require('ftdomdelegate');
const utils = require('./_utils');

const debounce = function(fn, delay) {
		let timeoutId;
		return function debounced() {
			if (timeoutId) {
					clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
					fn.apply(this, arguments);
			}, delay);
		};
};

class Suggest {
	constructor(containerEl, input, dataSrc, showAllHandler) {
		this.container = containerEl;
		this.searchEl = input;
		this.showAllHandler = showAllHandler;
		this.dataSrc = dataSrc;
		this.minLength = 2;
		this.showAllItem = true;
		this.init();
	}

	init() {
		this.suggestions = [];
		this.suggestionList = document.createElement('ul');
		this.suggestionList.classList.add('o-header__typeahead');
		this.container.appendChild(this.suggestionList);

		if(this.showAllItem) {
			this.viewAllItem = document.createElement('li');
			this.viewAllItem.classList.add('o-header__typeahead-view-all');
			this.viewAllItemInnerHTML = '<button type="submit">View All Results</button>';
		}

		this.delegate = new Delegate(this.container);
		this.bodyDelegate = new Delegate(document.body);
		this.suggest = this.suggest;
		this.onType = debounce(this.onType, 150).bind(this);
		this.onDownArrow = this.onDownArrow.bind(this);
		this.onSuggestionKey = this.onSuggestionKey.bind(this);
		this.onSuggestionClick = this.onSuggestionClick.bind(this);

		this.delegate.on('keyup', 'input[type="search"]', (ev) => {
			switch(ev.which) {
				case 13 : return; // enter
				case 9 : return; // tab
				case 40 :
					this.onDownArrow(ev);
				break;
				default :
					this.onType(ev);
				break;
			}
		});

		this.delegate.on('focus', 'input[type="search"]', (ev) => {
			ev.target.setSelectionRange ? ev.target.setSelectionRange(0, ev.target.value.length) : ev.target.select();
			this.reshow();
		});


		this.delegate.on('click', 'input[type="search"]', (ev) => {
			ev.target.setSelectionRange ? ev.target.setSelectionRange(0, ev.target.value.length) : ev.target.select();
			this.reshow();
		});

		this.bodyDelegate.on('click', (ev) => {
			if (utils.isOutside(ev.target, this.container)) {
				this.hide();
			}
		});

		this.bodyDelegate.on('focus', (ev) => {
			if (utils.isOutside(ev.target, this.container)) {
				this.hide();
			}
		});

		this.delegate.on('keyup', '.o-header__typeahead a', this.onSuggestionKey);
		this.delegate.on('click', '.o-header__typeahead a', this.onSuggestionClick);
	}

	/*** event handlers ***/
	reshow() {
		this.suggest(this.suggestions);
	}

	onType() {
		this.searchTerm = this.searchEl.value;
		this.getSuggestions(this.searchTerm);
	}

	onDownArrow() {
		if (this.suggestions.length) {
			this.suggestionList.querySelector('a').focus();
		}
	}

	onSuggestionClick(ev) {
		this.chooseSuggestion(ev.target);
		// we don't prevent default as the link's url is a link to the search page
	}

	onSuggestionKey(ev) {
		if (ev.which === 13) { // Enter pressed
			this.chooseSuggestion(ev.target);
			ev.stopPropagation();
			// we don't prevent default as the link's url is a link to the search page
			return;
		}

		if (ev.which === 40) { // down arrow pressed
			const oLi = ev.target.parentNode.nextSibling;
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
	}

	/*** internals ***/
	getSuggestions(value) {
		value = value.trim();
		if (value.length >= this.minLength) {
			fetch(this.dataSrc + encodeURIComponent(value))
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then(this.suggest)
				.catch((err) => {
					setTimeout(() => {
						throw err;
					});
				});
		} else {
			this.unsuggest();
		}
	}

	suggest(suggestions) {
		this.suggestionList.innerHTML = '';
		this.suggestions = suggestions;
		if (this.suggestions.length) {
			this.suggestions.slice(0, 5).forEach((suggestion) => {
				if (suggestion){
					const url = suggestion.url || ('/stream/' + suggestion.taxonomy + 'Id/' + suggestion.id);
					this.suggestionList.insertAdjacentHTML('beforeend', `<li class="o-header__typeahead-item"><a class="o-header__typeahead-link" href="${url}">${suggestion.name}</a></li>`);
				}
			});

			if (this.viewAllItem) {
				this.suggestionList.appendChild(this.viewAllItem);
				this.viewAllItem.innerHTML = this.viewAllItemInnerHTML; // IE hack
				this.viewAllItem.children[0].addEventListener('click', this.showAllHandler);
			}

			this.show();
		} else {
			this.hide();
		}
	}

	unsuggest() {
		this.hide();
	}

	hide() {
		this.suggestionList.classList.remove('o-header__typeahead--active');
	}

	show() {
		this.suggestionList.classList.add('o-header__typeahead--active');
	}

	chooseSuggestion(suggestionEl) {
		this.searchEl.value = suggestionEl.textContent;
		this.hide();
		this.searchEl.focus();
	}
}

export default Suggest;
