var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { processCSV, filterData, paginateData, processDataForChart } from '../models/functions.js';
import { createTable, createPagination, createChart } from './interface.controllers.js';
let allData = [];
let currentPage = 1;
let filteredData = []; // Variable para almacenar los datos filtrados actuales
let currentSortColumn = null;
let currentSortDirection = null;
const pageSize = 15;
function goToPage(pageNumber) {
    currentPage = pageNumber;
    const searchInput = document.querySelector('#search');
    const searchTerm = searchInput ? searchInput.value : '';
    const filteredData = filterData(allData, searchTerm);
    displayTable(filteredData);
}
function displayTable(data) {
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
function handleFileUpload(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield readCSV(file);
            allData = processCSV(content);
            filteredData = [...allData]; // Inicializa filteredData con todos los datos
            currentPage = 1;
            displayTable(filteredData);
        }
        catch (error) {
            alert(error);
        }
    });
}
