Deliktum remake

**Pasos para descargar:**

```
git clone https://github.com/rvntone/coding_tournament.git
cd coding_tournament
```

**Para el back-end (emulado, usando json-server):**

- **Instalación de paquetes**

```
cd jsonserver
yarn
```

- **Correr:**

```
cd jsonserver
yarn start
```

Se levanta un servicio en http://localhost:3500
con el endpoint /events

**Para el front-end:**

- **Instalación de paquetes**

```
cd frontend
yarn
```

- **Correr:**

```
cd frontend
yarn start
```

Se levanta en front-end en http://localhost:3000

**Puntos alcanzados**

- Mostar mapa, con zoom (in/out, con doble clic para zoom-in y scroll del mouse/touchpad para las dos funcionalidades) y navegable (drag/pan con clic izquierdo o flechas del teclado y rotación con clic derecho)
- Formulario para agregar eventos y envio al API (no incluye subida de archivos)
- Filtro por tipo de eventos
- Lista de eventos traidos del API
- Visualización de puntos en el mapa agrupados (cluster)

_NOTA_: Los puntos creados son cercanos a la localidad del torneo
