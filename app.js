const express = require('express')
const app = express()
const PORT = process.env.PORT || 8222

app.listen(PORT, () => {
    console.log(`Application starts on ${PORT} PORT!`);
})