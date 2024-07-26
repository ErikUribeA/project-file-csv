var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { processCSV, filterData, paginateData, processDataForChart, convertToCSV, sortData } from '../models/functions.js';
import { createTable, createPagination, initializeUI, createChart, downloadCSV } from './interface.controllers.js';
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
function handleSort(column) {
    if (!filteredData || filteredData.length === 0) {
        return; // No hacer nada si no hay datos
    }
    if (column === currentSortColumn) {
        // Cambiar dirección si se hace clic en la misma columna
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    filteredData = sortData(filteredData, column, currentSortDirection);
    currentPage = 1;
    displayTable(filteredData);
}
function handleFilter(searchTerm) {
    filteredData = filterData(allData, searchTerm);
    currentSortColumn = null;
    currentSortDirection = null;
    currentPage = 1;
    displayTable(filteredData);
}
function handleExport() {
    if (filteredData.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    const csv = convertToCSV(filteredData);
    const filename = `datos_filtrados_${new Date().toISOString()}.csv`;
    downloadCSV(csv, filename);
}
function readCSV(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => { var _a; return resolve((_a = event.target) === null || _a === void 0 ? void 0 : _a.result); };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initializeUI(handleFileUpload, handleFilter, handleExport);
});
// Asignar la función goToPage al objeto window para que esté disponible globalmente
window.goToPage = goToPage;
