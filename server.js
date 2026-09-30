const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hellooooo worlddd!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});