import { RowData } from "../models/functions.js";
declare const Chart: any;

export function createTable(data: RowData[], sortColumn: string | null = null, sortDirection: 'asc' | 'desc' | null = null): string {
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


export function createPagination(totalPages: number, currentPage: number, goToPageFunction: (page: number) => void): string {
    let paginationHTML = '<div class="pagination">';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">${i}</button>`;
    }
    paginationHTML += '</div>';
    return paginationHTML;
}

function debounce(func: Function, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export function initializeUI(
    handleFileUpload: (file: File) => void,
    handleFilter: (searchTerm: string) => void,
    handleExport: () => void
) {
    const fileInput = document.querySelector('#file') as HTMLInputElement | null;
    const searchInput = document.querySelector('#search') as HTMLInputElement | null;
    const exportButton = document.querySelector('#exportButton') as HTMLButtonElement | null;

    if (fileInput && searchInput && exportButton) {
        fileInput.addEventListener('change', (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                handleFileUpload(file);
            }
        });

        const debouncedHandleFilter = debounce((searchTerm: string) => {
            handleFilter(searchTerm);
        }, 300); // 300ms delay

        searchInput.addEventListener('input', (event) => {
            const searchTerm = (event.target as HTMLInputElement).value;
            debouncedHandleFilter(searchTerm);
        });
        exportButton.addEventListener('click', handleExport);
    } else {
        console.error('No se encontraron todos los elementos necesarios en la interfaz');
    }
}

export function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

