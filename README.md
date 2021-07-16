# Examen de backend para creativesociety

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Acerca del proyecto

- El proyecto hace uso de una API, la cual sirve para simplemente obtener información de personajes.
- Una vez los veamos, se puede agregar el personaje a una lista de personajes favoritos.
- El personaje favorito se puede editar o eliminar de la lista.


## Requisitos
Debemos de tener instalado lo siguiente:
| Nombre | Link |
| ------ | ------ |
| XAMPP | [XAMPP](https://www.apachefriends.org/es/download.html) |
| Composer | [Composer](https://getcomposer.org/download/) |
| NodeJS | [NodeJS](https://nodejs.org/es/) |

Xampp es una opcion, pero tambien se puede tener algun otro que tenga un gestor bd de mysql.


## Instalación
Debemos correr los siguientes comandos para poder instalarlo
Abrir la terminal en la raiz del proyecto, abrir dos ventanas, una para backend y otra para frontend:

### Para la parte del backend
Comando para instalar las dependencias del backend laravel
```sh
cd backend
composer install
```

Copiar el archivo .env.example a .env en la carpeta raíz
Viene un .sql, debemos importarlo a una base de datos llamada: backend

Comando para generar un key al proyecto
```sh
php artisan key:generate
php artisan serve
```

Comando para poner en marcha el proyecto backend, y listo
```sh
php artisan serve
```

### Para la parte del frontend
Comando para instalar la carpeta node_modules
```sh
npm install
```

Comando para poner en marcha el proyecto frontend, y listo
```sh
npm run watch
```


## Técnologias

El proyecto contiene las siguientes tecnologías

| Nombre | Link |
| ------ | ------ |
| Laravel v8 | [Laravel](https://laravel.com/docs/8.x) |
| ReactJS v17.02 | [ReactJS](https://es.reactjs.org/docs/getting-started.html) |
| Material UI | [Material UI](https://material-ui.com/) |


## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).