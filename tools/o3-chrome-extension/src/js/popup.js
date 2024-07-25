/* eslint-disable @lwc/lwc/no-async-await */
import {
	injectStyles,
	removeStyles,
	isGridEnabled,
	getCurrentTab,
} from './utils.js';

const checkbox = document.querySelector('#o3-grid-checkbox');
const gridOptions = document.querySelector('.o3-grid-options');
// eslint-disable-next-line wrap-iife
(async function () {
	const isEnabled = await isGridEnabled();
	checkbox.checked = isEnabled;
	toggleOptions();
})();

checkbox.addEventListener('change', function () {
	if (this.checked) {
		injectStyles();
	} else {
		removeStyles();
	}
	toggleOptions();
});

function toggleOptions() {
	if (checkbox.checked) {
		gridOptions.style.display = 'block';
		setColorsAndOpacityFromStorage();
		registerColorPickerEventListeners();
	} else {
		gridOptions.style.display = 'none';
	}
}

function registerColorPickerEventListeners() {
	const colorPickers = document.querySelectorAll(
		'.o3-grid-extension-color-picker input'
	);
	colorPickers.forEach(colorPicker => {
		colorPicker.addEventListener('input', handleColorChange);
	});
}

async function handleColorChange() {
	const activeTab = await getCurrentTab();
	const columnColor = document.getElementById(
		'o3-grid-extension-column-color'
	).value;
	const gutterColor = document.getElementById(
		'o3-grid-extension-gutter-color'
	).value;
	const marginColor = document.getElementById(
		'o3-grid-extension-margin-color'
	).value;

	const colorOpacity = document.getElementById(
		'o3-grid-extension-color-opacity'
	).value;

	await chrome.tabs.sendMessage(activeTab.id, {
		message: 'updateGridColors',
		colors: {
			columnColor,
			gutterColor,
			marginColor,
			colorOpacity,
		},
	});
}

async function setColorsAndOpacityFromStorage() {
	const state = await chrome.storage.local.get(['gridColorSettings']);
	if (state.gridColorSettings) {
		const {columnColor, gutterColor, marginColor, colorOpacity} =
			state.gridColorSettings;
		document.getElementById('o3-grid-extension-column-color').value =
			columnColor;
		document.getElementById('o3-grid-extension-gutter-color').value =
			gutterColor;
		document.getElementById('o3-grid-extension-margin-color').value =
			marginColor;
		document.getElementById('o3-grid-extension-color-opacity').value =
			colorOpacity;
	}
}

const resetButton = document.getElementById('o3-grid-extension-reset');

let partyIntervalId = null;

resetButton.addEventListener('click', async () => {
	const activeTab = await getCurrentTab();
	const columnColor = '#7ec3f1';
	const gutterColor = '#ff0000';
	const marginColor = '#ffc800';
	const colorOpacity = 25;
	await chrome.tabs.sendMessage(activeTab.id, {
		message: 'updateGridColors',
		colors: {
			columnColor,
			gutterColor,
			marginColor,
			colorOpacity,
		},
	});
	if (partyIntervalId) {
		// Stop the party
		clearInterval(partyIntervalId);
		partyIntervalId = null;
	}
	await setColorsAndOpacityFromStorage();
});

let inputBuffer = '';

document.addEventListener('keydown', async event => {
	inputBuffer += event.key.toLowerCase();
	inputBuffer = inputBuffer.slice(-11);

	// Check if the last 11 characters match the secret code
	if (inputBuffer.endsWith('secretparty')) {
		const activeTab = await getCurrentTab();
		// Random hex generator
		const randomColor = () => {
			const hex = Math.floor(Math.random() * 16777215).toString(16);
			return hex.padStart(6, '0'); // Ensure 6 digits
		};

		partyIntervalId = setInterval(async () => {
			const columnColor = '#' + randomColor();
			const gutterColor = '#' + randomColor();
			const marginColor = '#' + randomColor();
			const colorOpacity = Math.random().toFixed(2) * 100;

			await chrome.tabs.sendMessage(activeTab.id, {
				message: 'updateGridColors',
				colors: {
					columnColor,
					gutterColor,
					marginColor,
					colorOpacity,
				},
			});
			await setColorsAndOpacityFromStorage();
		}, 100); // Change colors every second

		inputBuffer = '';
	} else {
		if (partyIntervalId) {
			clearInterval(partyIntervalId);
			partyIntervalId = null;
		}
	}
});
