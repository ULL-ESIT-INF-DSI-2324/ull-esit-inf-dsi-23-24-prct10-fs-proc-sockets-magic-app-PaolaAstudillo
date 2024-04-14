# **Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic**
Nombre: Paola Astudillo Capote
Gmail: alu010337418@ull.edu.es


[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo)

## Introducción
En esta práctica haré uso de un modelo cliente-servidor y pasaremos de un práctica 9 síncrona a una práctica 10 asíncrona.
Además comentaré la solución propuesta para el ejercicio desarrollado durante la hora de PE.

## Objetivos
* Pasos previos
* Desarrollo de la aplicación
* Ejercicio del PE 
* Conclusión


## Desarrollo

### Pasos previos
Para realizar este ejercicio he configurado el repositorio, igual que hemos hecho anteriormente en la asignatura,y además he usado la práctica 9 como base para la solución de esta nueva práctica. Modificándola para cumplir con los nuevos requisitos.

### Desarrollo de la aplicación

En la transición de la práctica 9 a la práctica 10, he tenido que realizar importantes cambios para  adaptar la aplicación a un modelo cliente-servidor utilizando Node.js, particularmente haciendo uso de sockets para la comunicación entre el cliente y el servidor.Uno de los primeros cambios fue utilizar la API asíncrona de Node.js para la gestión de archivos, como pide el enunciado.De esta manera permitimos a el servidor maneje múltiples peticiones de forma no bloqueante. Al trabajar con el módulo `fs/promises`, pude implementar funciones que leen y escriben en el sistema de archivos sin detener la ejecución del servidor. 

Para el diseño del servidor, hice uso del módulo `net` de Node.js, como habíamos visto en clase. Para cada conexión, el servidor lee los datos enviados por el cliente, los deserializa de JSON a un objeto JavaScript y determina la acción requerida (añadir, actualizar, eliminar, listar o mostrar una carta). Dependiendo de la acción, el servidor debería interactuar con la colección de cartas del usuario correspondiente y luego enviar una respuesta de vuelta al cliente.En mi caso, sí devuelve una respuesta al introducir una acción, pero como no detecta nada de lo guardado en /data, siempre devuelve que no hay nada que listar, o que leer.Por lo cual no se le puede ver tanta funcionalidad a la aplicación, ya que no logré la persistencia de datos.. Y como no pude solucionar este fallo, aunque intente realizar pruebas, salen erróneas.

Cabe destacar que la lógica de cada comando se maneja mediante una instancia de `MagicCardCollection`, que a su vez utiliza métodos asíncronos para manipular los datos de las cartas. 

En el lado del cliente, he utilizado `yargs` para manejar la interfaz de línea de comandos, lo que permite a los usuarios especificar comandos. Cada comando define claramente qué datos se requieren y cómo deben ser enviados al servidor. Una vez que el usuario ejecuta un comando, el cliente establece una conexión con el servidor, envía los datos y espera una respuesta. Cuando el servidor responde, el cliente muestra esta información y luego cierra la conexión.

Por último, para no utilizar el método `end`, espero a que el servidor procese la solicitud y responda, cerrando la conexión solo después de recibir esta respuesta. Esto garantiza que el cliente reciba y procese completamente la respuesta del servidor, evitando cortes prematuros que podrían llevar a pérdidas de datos importantes.

Ejemplo de uso: node dist/practica9/Client.js add "Paola" 1 "Magic Card" 50 "Blue" "Creature" "Rare" "Special Ability" 100

### Ejercicio del PE 
[Repositorio de la práctica](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-PaolaAstudillo)

Para realizar la modificación propuesta, nos pedían hacer operaciones asincónas utilizando callbacks. Y esto se realizó a través del método `wirteCollectionAsync`.Este método maneja la escritura de datos en el archivo de la colección de cartas de manera no bloqueante. Cuando se llama a este método, no se espera que la operación se complete de inmediato. En su lugar, se proporciona un callback que solo se ejecuta una vez que la escritura del archivo ha finalizado, ya sea exitosamente o con un error. 
Este cambio requirió ajustes adicionales en cómo se manejan las operaciones de añadir, que era el método `addcard` principal, el cual queríamos hacer asíncronos, actualizar y eliminar cartas. Cada una de estas operaciones ahora debe considerar que los cambios que realizan pueden no reflejarse inmediatamente en el archivo. Por ejemplo, al añadir una nueva carta, el método primero verifica si la carta ya existe antes de intentar escribir en el archivo de manera asincrónica. Si la escritura es exitosa, se notifica mediante un mensaje, y si falla, se muestra un error apropiado.

Por último debíamos hacer pruebas, y en mi caso no me dio tiempo para terminarlas.Por lo que no se puedieron comprobar los test, pero introduciendo los datos por la terminal funcionaba perfectamente.

### Conclusión
Tras finalizar la práctica he consolidado mis conociemientos sobre el uso del API asíncrona proporcionada por Node.js y del uso de sockets. Aunque no he podido completar satisfacroriamente la práctica, ya que no puede arreglar los errores comentados en el el desarrollo, se puede ver claramente la funcionalidad del código leyendolo, además, he aprendido mucho, y aunque es un tema un poco complicado, por lo que ha sido un desafío para mi, acabo satisfecha porque he compredido muchos nuevos conceptos.