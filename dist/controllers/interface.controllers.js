export function createTable(data, sortColumn = null, sortDirection = null) {
    if (!data || data.length === 0) {
        return '<p>No hay datos para mostrar.</p>';
    }
    const headers = Object.keys(data[0]);
    let tableHTML = '<table><thead><tr>';
    headers.forEach(header => {
        let sortIndicator = '';
        if (header === sortColumn) {
            sortIndicator = sortDirection === 'asc' ? ' ▲' : ' ▼';
        }
        tableHTML += `<th class="sortable" data-column="${header}">${header}${sortIndicator}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    data.forEach(row => {
        tableHTML += '<tr>';
        headers.forEach(header => {
            tableHTML += `<td>${row[header]}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    return tableHTML;
}
