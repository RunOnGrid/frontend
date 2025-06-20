const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Configuración de autenticación usando el archivo de credenciales
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });
const PUBLIC_FOLDER_PATH = './public';
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID; // ID de la carpeta en Drive

async function uploadFile(filePath, fileName) {
  try {
    // Verificar si el archivo ya existe
    const query = `name='${fileName}' and '${DRIVE_FOLDER_ID}' in parents and trashed=false`;
    const res = await drive.files.list({ q: query });
    
    if (res.data.files.length > 0) {
      // Actualizar archivo existente
      const fileId = res.data.files[0].id;
      await drive.files.update({
        fileId: fileId,
        media: {
          body: fs.createReadStream(filePath)
        }
      });
      console.log(`Archivo actualizado: ${fileName}, ID: ${fileId}`);
    } else {
      // Crear nuevo archivo
      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [DRIVE_FOLDER_ID]
        },
        media: {
          body: fs.createReadStream(filePath)
        },
        fields: 'id,name'
      });
      console.log(`Archivo subido: ${fileName}, ID: ${response.data.id}`);
    }
  } catch (error) {
    console.error(`Error al procesar ${fileName}:`, error.message);
  }
}

async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      // Procesar subcarpetas recursivamente
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      // Solo procesar archivos de imagen
      if (/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(entry.name)) {
        // Obtener ruta relativa respecto a la carpeta public
        const relativePath = path.relative(PUBLIC_FOLDER_PATH, fullPath);
        await uploadFile(fullPath, relativePath);
      }
    }
  }
}

async function main() {
  try {
    console.log("Iniciando sincronización con Google Drive...");
    await processDirectory(PUBLIC_FOLDER_PATH);
    console.log("Sincronización completada.");
  } catch (error) {
    console.error("Error en la sincronización:", error);
    process.exit(1);
  }
}

main();