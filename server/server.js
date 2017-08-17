const express = require('express');
const app = express();
const routes = require('./routes');
const mountMiddleware = require('./middlewares');
const PORT = process.env.PORT || 3000;

mountMiddleware(app);
routes(app);

app.listen(PORT, () => {
  console.log(`Web server listening on PORT ${PORT}`)
})