# Configuración de GitHub Gist para la Persistencia de Datos

Este proyecto utiliza GitHub Gist como almacenamiento backend cuando se aloja en Vercel.

## Cómo Configurar:

### 1. Crear un Token de GitHub
1. Acceda a: https://github.com/settings/tokens/new
2. Déle un nombre: `Delivery App Storage`
3. Marque solo: `gist` (Create gists)
4. Haga clic en "Generate token"
5. **COPIE EL TOKEN** (¡no lo volverá a ver!)

### 2. Crear un Gist
1. Acceda a: https://gist.github.com/
2. Haga clic en "+" (New gist)
3. Nombre del archivo: `data.json`
4. Pegue este contenido inicial:
```json
{}
```
5. Elija "Create secret gist"
6. **COPIE EL ID DEL GIST** de la URL (ej: `https://gist.github.com/su-usuario/ABC123` → el ID es `ABC123`)

### 3. Agregar en Vercel
1. Vaya a: https://vercel.com/dashboard
2. Haga clic en el proyecto
3. Settings → Environment Variables
4. Agregue:
   - `GITHUB_TOKEN` = su token copiado
   - `GIST_ID` = el ID del gist copiado
5. Haga clic en "Save"
6. Realice un nuevo despliegue (o espere el automático)

¡Listo! El administrador guardará los datos en el Gist.
