require('dotenv').config();
const express = require('express');
const dynamicRoutes = require('./routes/dynamicRoutes');
const fileRoutes = require('./routes/fileRoutes');
const crudRoutes = require('./routes/crudRoutes.js')
const applyMiddleware = require('./Protection_Protocols/middleware.js'); 
require('./global.js');


const app = express();
const port = 3000


const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' }); // Store image in local folder

app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path; // e.g., uploads/abc123.png
  await db.query('INSERT INTO attachments (image_path) VALUES (?)', [imagePath]);
  res.send('Uploaded successfully');
});

app.use('/uploads', express.static('uploads')); 




async function initializeApp() {
    try {
  
      
      applyMiddleware(app);
      app.use('/api/crud', crudRoutes)
      app.use('/api/file', fileRoutes);
      // app.use('/api', dynamicRoutes);      
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      
      process.exit(1); 
    }
}

process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  
  process.exit(1); 
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  
  process.exit(1); 
});
  


initializeApp();
