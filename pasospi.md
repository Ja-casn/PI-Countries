1. Modelado de la base de datos.
2. Hacer la relacion de las tablas, si es de 1:N, N:1 o N:N y establecer la tabla intermedia.
3. Proceder a crear las rutas, creamos una carpeta Routes y alli dentro las rutas hacia nuestros modelos. //countries && activities
<!-- Vamos a app.js y en server.use('/', routes) lo pasamos a server.use('/api', routes) para usar las rutas que estan en index -->
4. En nuestro archivo index.js de rutas, debemos importar unas variables de donde requeriremos cada archivo sea countries o activities, para luego hacer nuestro enrutado:
<!-- router.use('/countries', countriesRouter) y router.use('/activities', activitiesRouter) -->

Dicho archivo index.js creado para nuestro enrutado, nos servirá para al momento de crear nuestro crud con nuestras respectivas rutas, usemos unicamente '/' como path y podria tomar countries como activities, de eso depende la busqueda del cliente, en dado caso que se requiera otro parametro luego de /countries 

5. Luego en cada archivo de nuestras rutas, activities y countries, debemos importar la constante que usamos para hacer las relaciones desde la base de datos, sea Country y TouristActivity:

const { Country || TourisActivity} = require


<!-- Diferencia de usar fetch a axios: La diferencia es que no hay que hacerle el .json y devolverle una promesa como se hace en fetch. Si no que con axios lo hacemos de una sola vez y te devuelve todo en .data -->

6. 