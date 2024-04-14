# **Práctica 6 - Clases e interfaces genéricas. Principios SOLID**
Nombre: Paola Astudillo Capote
Gmail: alu010337418@ull.edu.es


[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-PaolaAstudillo)

## Introducción
En est apráctica 
Además comentaré la solución propuesta para el ejercicio desarrollado durante la hora de PE.
## Objetivos

* Pasos previos
* Ejercicio 1 - La mudanza
* Ejercicio del PE 
* Conclusión


## Desarrollo

### Pasos previos



### Ejercicio del PE 
[Repositorio de la práctica](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-PaolaAstudillo)
Para realizar la modificación propuesta, nos pedían hacer operaciones asincónas utilizando callbacks. Y esto se realizó a través del método `wirteCollectionAsync`.Este método maneja la escritura de datos en el archivo de la colección de cartas de manera no bloqueante. Cuando se llama a este método, no se espera que la operación se complete de inmediato. En su lugar, se proporciona un callback que solo se ejecuta una vez que la escritura del archivo ha finalizado, ya sea exitosamente o con un error. 
Este cambio requirió ajustes adicionales en cómo se manejan las operaciones de añadir, que era el método `addcard` principal, el cual queríamos hacer asíncronos, actualizar y eliminar cartas. Cada una de estas operaciones ahora debe considerar que los cambios que realizan pueden no reflejarse inmediatamente en el archivo. Por ejemplo, al añadir una nueva carta, el método primero verifica si la carta ya existe antes de intentar escribir en el archivo de manera asincrónica. Si la escritura es exitosa, se notifica mediante un mensaje, y si falla, se muestra un error apropiado.

Por último debíamos hacer pruebas, y en mi caso no me dio tiempo para terminarlas.Por lo que no se puedieron comprobar los test, pero introduciendo los datos por la terminal funcionaba perfectamente.

### Conclusión
