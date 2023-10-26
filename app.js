require('./mongoose')
const ImportedRouters = require('./Router/router')

const express = require('express')
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(ImportedRouters)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})