// Definir la interfaz para los datos
interface RowData {
    [key: string]: string | number;
}

// Definir los tipos de datos esperados para cada columna
enum ColumnType {
    String,
    Number,
    CodeWithSymbols,
    RegionName
}

// Definir la estructura de las columnas
const columnStructure: { name: string; type: ColumnType }[] = [
    { name: 'REGION', type: ColumnType.RegionName },
    { name: 'CÓDIGO DANE DEL DEPARTAMENTO', type: ColumnType.CodeWithSymbols },
    { name: 'DEPARTAMENTO', type: ColumnType.String },
    { name: 'CÓDIGO DANE DEL MUNICIPIO', type: ColumnType.Number },
    { name: 'MUNICIPIO', type: ColumnType.String }
];

function processCSV(content: string): RowData[] {
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    if (nonEmptyLines.length === 0) {
        throw new Error('El archivo CSV está vacío');
    }

    const headers = parseCSVLine(nonEmptyLines[0]);

    if (headers.length !== columnStructure.length) {
        throw new Error(`El archivo CSV debe tener exactamente ${columnStructure.length} columnas, pero tiene ${headers.length}`);
    }

    columnStructure.forEach((column, index) => {
        if (column.name.toLowerCase() !== headers[index].toLowerCase()) {
            throw new Error(`La columna ${index + 1} debe llamarse "${column.name}", pero se encontró "${headers[index]}"`);
        }
    });

    return nonEmptyLines.slice(1).map((line, lineIndex) => {
        const values = parseCSVLine(line);
        if (values.length !== columnStructure.length) {
            throw new Error(`La fila ${lineIndex + 2} debe tener exactamente ${columnStructure.length} valores, pero tiene ${values.length}`);
        }

        const rowData: RowData = {};

        columnStructure.forEach((column, index) => {
            const value = values[index].trim();

            if (value === '') {
                throw new Error(`La fila ${lineIndex + 2}, columna "${column.name}" está vacía`);
            }

            switch (column.type) {
                case ColumnType.Number:
                    if (!/^\d+(\.\d+)?$/.test(value)) {
                        throw new Error(`La fila ${lineIndex + 2}, columna "${column.name}" debe ser un número válido, pero se encontró "${value}"`);
                    }
                    rowData[column.name] = value; // Mantenemos el valor como string
                    break;
                case ColumnType.CodeWithSymbols:
                    rowData[column.name] = value;
                    break;
                case ColumnType.RegionName:
                case ColumnType.String:
                    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-',.()]+$/.test(value)) {
                        throw new Error(`La fila ${lineIndex + 2}, columna "${column.name}" contiene caracteres no permitidos: "${value}"`);
                    }
                    rowData[column.name] = value;
                    break;
            }
        });

        return rowData;
    });
}

function parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += line[i];
        }
    }
    result.push(current);

    return result;
}
