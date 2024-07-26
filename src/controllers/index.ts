import { RowData, processCSV, filterData, paginateData, processDataForChart, convertToCSV, sortData } from '../models/functions.js';
import { createTable, createPagination, initializeUI, createChart, downloadCSV } from './interface.controllers.js';

let allData: RowData[] = [];
let currentPage = 1;
let filteredData: RowData[] = []; // Variable para almacenar los datos filtrados actuales
let currentSortColumn: string | null = null;
let currentSortDirection: 'asc' | 'desc' | null = null;

const pageSize = 15;

function goToPage(pageNumber: number) {
    currentPage = pageNumber;
    const searchInput = document.querySelector('#search') as HTMLInputElement | null;
    const searchTerm = searchInput ? searchInput.value : '';
    const filteredData = filterData(allData, searchTerm);
    displayTable(filteredData);
}

function displayTable(data: RowData[]) {
    const tableContainer = document.getElementById('table');
    const paginationContainer = document.getElementById('pagination');

    if (tableContainer && paginationContainer) {
        if (!data || data.length === 0) {
            tableContainer.innerHTML = '<p>No hay datos para mostrar.</p>';
            paginationContainer.innerHTML = '';
            return;
        }

        const paginatedData = paginateData(data, pageSize, currentPage);
        const tableHTML = createTable(paginatedData, currentSortColumn, currentSortDirection);
        tableContainer.innerHTML = tableHTML;

        const totalPages = Math.ceil(data.length / pageSize);
        const paginationHTML = createPagination(totalPages, currentPage, goToPage);
        paginationContainer.innerHTML = paginationHTML;

        // Crear y actualizar el gráfico
        const chartData = processDataForChart(data);
        createChart(chartData);

        // Agregar event listeners para ordenamiento
        const headers = tableContainer.querySelectorAll('th.sortable');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-column');
                if (column) {
                    handleSort(column);
                }
            });
        });
    }
}

async function handleFileUpload(file: File) {
    try {
        const content = await readCSV(file);
        allData = processCSV(content);
        filteredData = [...allData]; // Inicializa filteredData con todos los datos
        currentPage = 1;
        displayTable(filteredData);
    } catch (error) {
        alert(error);
    }
}
