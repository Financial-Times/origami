const oTableEl = document.querySelector('.o-table--responsive');
const heads = oTableEl.querySelectorAll('thead tr th');
const rows = oTableEl.getElementsByTagName('tr');

for (let row of rows) {
  const data = Array.from(row.getElementsByTagName('td'));
	data.forEach((td, dataIndex) => {
		td.parentNode.insertBefore(heads[dataIndex].cloneNode(true), td);
	});
}
