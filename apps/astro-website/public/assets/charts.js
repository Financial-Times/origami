(() => {

	// Define some default chart colours. Trying not to have colours that
	// are too similar, especially next to each other
	const chartColors = [
		'#17D4E6', // Teal 90
		'#FF1966', // Claret 100
		'#198CFF', // Oxford 100
		'#593380', // Velvet
		'#FF8833', // Mandarin
		'#FFEC1A', // Lemon
		'#00994D', // Jade
		'#CC0000', // Crimson
		'#4E96EB', // Org B2C
		'#FF7FAA', // Candy
		'#96CC28', // Wasabi
		'#800D33'  // Claret 50
	];

	document.addEventListener('DOMContentLoaded', setupCharts);

	function setupCharts() {
		for (const tableElement of document.querySelectorAll('table[data-chart-type]')) {
			setupChart(tableElement);
		}
	}

	function setupChart(tableElement) {
		const options = getChartConfigurationFromTable(tableElement);

		// Create a canvas and add it to the DOM
		const canvasElement = document.createElement('canvas');

		const containerElement = document.createElement('div');
		containerElement.classList.add('chart');
		containerElement.classList.add(`chart--${tableElement.dataset.chartType}`);
		containerElement.appendChild(canvasElement);

		tableElement.parentElement.insertBefore(containerElement, tableElement);
		tableElement.hidden = true;

		// Create a chart with the new canvas
		new Chart(canvasElement, options);
	}

	function getChartConfigurationFromTable(tableElement) {
		switch (tableElement.dataset.chartType) {
			case 'stacked-bar':
				return getStackedBarChartConfigurationFromTable(tableElement);
			case 'pie':
				return getPieChartConfigurationFromTable(tableElement);
			default:
				throw new Error(`Invalid chart type ${tableElement.dataset.chartType}`);
		}
	}

	function getStackedBarChartConfigurationFromTable(tableElement) {
		const table = tableElementToArray(tableElement);
		const tableHead = table[0].slice(1);
		const tableBody = table.slice(1);
		const firstColumn = tableBody.map(row => row[0]);
		const otherColumns = tableBody.map(row => row.slice(1));
		return {
			type: 'bar',
			data: {
				labels: tableHead.map(cell => {
					return cell.dataset.columnLabel || cell.textContent;
				}),
				datasets: otherColumns.map((row, index) => {
					return {
						label: firstColumn[index].textContent,
						backgroundColor: chartColors[index],
						data: row.map(cell => cell.textContent)
					};
				})
			},
			options: {
				title: {
					display: true,
					text: tableElement.querySelector('caption').textContent
				},
				legend: {
					position: 'bottom'
				},
				scales: {
					xAxes: [{
						stacked: true,
						// ticks: {
						// 	autoSkip: false,
						// 	maxRotation: 90,
						// 	minRotation: 90
						// }
					}],
					yAxes: [{
						stacked: true
					}]
				}
			}
		}
	}

	function getPieChartConfigurationFromTable(tableElement) {
		const table = tableElementToArray(tableElement);
		const tableBody = table.slice(1);
		console.log(tableBody);
		return {
			type: 'pie',
			data: {
				labels: tableBody.map(row => row[0].textContent),
				datasets: [{
					data: tableBody.map(row => row[1].textContent),
					backgroundColor: tableBody.map((row, index) => {
						return row[0].dataset.sliceColor || chartColors[index]
					})
				}]
			},
			options: {
				title: {
					display: true,
					text: tableElement.querySelector('caption').textContent
				},
				legend: {
					position: 'bottom'
				}
			}
		}
	}

	function tableElementToArray(tableElement) {
		return [...tableElement.rows].map(row => {
			return [...row.cells];
		});
	}

})();
