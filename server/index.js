// server/index.js
const mongoose = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 5000;
try{
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
}catch(err){
  console.error('Failed to start', err);
  
}