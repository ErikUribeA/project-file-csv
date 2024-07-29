# Datos Colombia

## Descripción
Datos Colombia es una aplicación web que permite cargar, visualizar, filtrar y analizar datos geográficos de Colombia. La aplicación procesa archivos CSV con información sobre regiones, departamentos y municipios, presentando los datos en una tabla interactiva y un gráfico de barras.

## Características
- Carga de archivos CSV con datos geográficos de Colombia.
- Visualización de datos en una tabla paginada y ordenable.
- Filtrado de datos en tiempo real.
- Gráfico de barras que muestra el número de municipios por departamento.
- Exportación de datos filtrados a CSV.
  

## Tecnologías Utilizadas
- HTML5
- CSS3
- TypeScript
- Chart.js para la visualización de gráficos

## Estructura del Proyecto
# Estructura del Proyecto

- **proyecto/**
  - **dist/**
    - **controllers/**
      - `index.js`
      - `interface.controllers.js`
    - **models/**
      - `functions.js`
    - **views/**
      - **img/**
        - `logo`
      - **style/**
        - `style.css`
    - `index.html`
  - **src/**
    - **controllers/**
      - `index.ts`
      - `interface.controllers.ts`
    - **models/**
      - `functions.ts`


## Instalación
Clona el repositorio:
-Instala Visual Studio Code:

-Instala la extensión Live Server:

-Abre Visual Studio Code. Ve a la extensión de la barra lateral izquierda. Busca "Live Server" y haz clic en "Instalar" en la extensión desarrollada por Ritwick Dey.

-Abre el proyecto en Visual Studio Code: Abre Visual Studio Code. Selecciona File > Open Folder... y selecciona la carpeta de tu proyecto.

-Inicia Live Server:

Abre index.html en Visual Studio Code. Haz clic derecho en el archivo y selecciona "Open with Live Server". Alternativamente, haz clic en el botón "Go Live" en la esquina inferior derecha de Visual Studio Code.
## Uso
1. Abre `index.html` en un navegador web moderno.
2. Utiliza el botón "Subir archivo" para cargar un archivo CSV con los datos.
3. Utiliza el campo de búsqueda para filtrar los datos.
4. Haz clic en los encabezados de la tabla para ordenar los datos.
5. Utiliza los botones de paginación para navegar por los resultados.
6. Observa el gráfico de barras para ver la distribución de municipios por departamento.
7. Utiliza el botón "Exportar CSV" para descargar los datos filtrados.

## Requisitos del Archivo CSV
El archivo CSV debe contener las siguientes columnas en el orden especificado:
1. REGION
2. CÓDIGO DANE DEL DEPARTAMENTO
3. DEPARTAMENTO
4. CÓDIGO DANE DEL MUNICIPIO
5. MUNICIPIO


