const express = require('express');
const app = express();

const PORT = process.env.PORT || 4647;

app.use(express.static(__dirname + '/dist/cafeteria-frontend'))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/cafeteria-front/src/index.html')
});

app.listen(PORT, () => {
  console.log('Servidor iniciado na porta ' + PORT);
})
