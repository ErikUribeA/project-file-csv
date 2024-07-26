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
export function createPagination(totalPages, currentPage, goToPageFunction) {
    let paginationHTML = '<div class="pagination">';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
    }
    paginationHTML += '</div>';
    return paginationHTML;
}
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
export function initializeUI(handleFileUpload, handleFilter, handleExport) {
    const fileInput = document.querySelector('#file');
    const searchInput = document.querySelector('#search');
    const exportButton = document.querySelector('#exportButton');
    if (fileInput && searchInput && exportButton) {
        fileInput.addEventListener('change', (event) => {
            var _a;
            const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                handleFileUpload(file);
            }
        });
        const debouncedHandleFilter = debounce((searchTerm) => {
            handleFilter(searchTerm);
        }, 300); // 300ms delay
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            debouncedHandleFilter(searchTerm);
        });
        exportButton.addEventListener('click', handleExport);
    }
    else {
        console.error('No se encontraron todos los elementos necesarios en la interfaz');
    }
}
