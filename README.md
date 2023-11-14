# Prueba Técnica PHP

En este proyecto podremos añadir, listar y borrar películas a la base de datos. 


## Inicialización

Para comenzar a usar este proyecto necesitaras inicializar tanto la parte de backend como la parte de frontend.

#### Backend

Dirigete a la carpeta `api_php` y abre un terminal. 

```http
  php bin/console doctrine:database:create
```

Una vez hecho esto debemos comprobar si nos ha creado la base de datos `movies_php` correctamente además de su tabla correspondiente. 

***En caso de que solamente haya creado la base de datos sin la tabla***

```http
  php bin/console doctrine:schema:update --force
```

#### Frontend

Dirigete a la carpeta `php_movies_front` y abre un terminal. 

```http
  npm run dev
```
## Guía Rápida de la API

#### Obtener todas las películas

```http
  GET /api/getmovies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | Devuelve el ID de la película en la base de datos |
| `imagen` | `string` | Devuelve la ruta relativa de la imagen |
| `rating` | `float` | Devuelve la puntuación media de la película |
| `title` | `string` | Devuelve el nombre de la película |

#### Añadir película

```http
  POST /api/addmovie
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Necesario** Nombre de la película |
| `rating`      | `float` | **Necesario**. Puntuación de la película |
| `imagen`      | `string` | Ruta del poster de la película |
| `id_tmdb`      | `int` | **Necesario**. Id de la película de TMDB. Este debe de ser único. |

#### Eliminar película

```http
  DELETE /api/deletemovie/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Necesario** Id de la película que queremos borrar. |


## Imágenes


![image](https://github.com/BorjaLopz/php_movies/assets/122975457/e5292c2d-5c76-48cc-a36d-d73ff73531cc)
Página principal. 

![image](https://github.com/BorjaLopz/php_movies/assets/122975457/bd6bba29-593f-4ab2-a232-20efcf9dcc6a)
Información adicional de la película y opción de añadirla. 

![image](https://github.com/BorjaLopz/php_movies/assets/122975457/b1b2c9d2-d106-4399-8a46-4ad383dc9a17)
Buscador de películas. 

![image](https://github.com/BorjaLopz/php_movies/assets/122975457/76cd3165-24cf-4903-af08-6f8fd498d5d7)
Listado de películas. 

## Tech Stack

**Client:** React, CSS

**Server:** PHP, Symfony

