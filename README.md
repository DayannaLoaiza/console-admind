# Console Admind

Este proyecto utiliza Next.js como framework de desarrollo y MongoDB como base de datos. Sigue estos pasos para configurar el entorno y ejecutar el proyecto en tu máquina local.

## Requisitos previos

- Node.js: Asegúrate de tener Node.js instalado en tu máquina. Puedes verificar la instalación ejecutando node -v y npm -v.
- MongoDB: Este proyecto se conecta a una base de datos MongoDB, asegúrate de tener acceso a una base de datos de MongoDB o de tener MongoDB Atlas configurado.

## Instalación

Clona este repositorio en tu máquina local:

```sh
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto::

```sh
npm install
```

## Configuración del entorno

Para la conexión a la base de datos, es necesario configurar las variables de entorno. A continuación, se detalla cómo hacerlo.

- En la raíz del proyecto, crea un archivo llamado .env.
- Dentro del archivo .env, agrega la siguiente línea, reemplazando <TU_URL_DE_MONGODB> con la URL de conexión de tu base de datos MongoDB:

```sh
MONGODB_URL=<TU_URL_DE_MONGODB>
```

## Estructura de la base de datos

Este proyecto utiliza dos colecciones en MongoDB:

- Orders: Colección principal para gestionar los pedidos.
- TransitionLogs: Colección para registrar los cambios de estado de los pedidos.

> Nota: Asegúrate de que estas colecciones existan en tu base de datos y de que tu usuario de MongoDB tenga los permisos adecuados para leer y escribir en ellas.

## Ejecución en modo local

Una vez configurado el archivo .env y la conexión a la base de datos, puedes ejecutar el proyecto en modo de desarrollo.

```sh
npm run dev
```

## Rutas disponibles

- /management: Ruta principal para gestionar los pedidos.
- /transitionLogs: Ruta para visualizar los registros de cambios de estado de los pedidos.

Estas rutas están disponibles en el entorno local (http://localhost:3000/management y http://localhost:3000/transitionLogs).
