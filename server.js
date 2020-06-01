const express = require('express');
const app = express();
const PORT = 3000;
require('./routes')(app);

app.use( express.static( "public" ) );
app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`App listening on PORT: ${PORT}`);
});