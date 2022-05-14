# Survey SPA

## Requerimentos
* PHP 8.0^
* Node.js 14^

## Instalación

#### Backend
1. Clona el repositorio
2. Ingresa a al directorio raíz del proyecto
3. Ejecuta `composer install`
4. Crea una base de datos
5. Copia el archivo `.env.example` en `.env` y ajusta los parámetros
    > Es necesario que obtengas un `CLIENT_ID` y `SECRET_ID` para usar el social login
    > * Google: https://console.developers.google.com/apis/dashboard
    > * Github: https://github.com/settings/developers
6. Ejecuta `php artisan serve` para iniciar el projecto en http://localhost:8000

#### Frontend
1. Ingresa a la carpeta `vue` usando la terminal
2. Ejecuta `npm install` para instalar las dependicias del proyecto de vue.js
3. Copia `vue/.env.example` en `vue/.env` y especifica el URL de la API
4. Inicia el frontend ejecutando `npm run dev`
5. Abre http://localhost:3000

