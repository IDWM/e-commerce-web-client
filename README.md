# E-Commerce Web Client

Aplicación web de comercio electrónico desarrollada con Next.js.

## Prerrequisitos

- **Node.js** (versión 16 o superior)

## Instalación

1. Clona este repositorio
2. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Configura la URL del backend:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   > ⚠️ **Importante**: Asegúrate de que la URL coincida exactamente con la configuración del backend.

## Backend

Este proyecto requiere el backend que se encuentra en:
**<https://github.com/FernandoChav/ayudantiawebmovil>**

Asegúrate de tener el backend ejecutándose antes de iniciar la aplicación frontend.

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)
