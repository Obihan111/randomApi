const mongoose = require('mongoose')


const url = 'mongodb+srv://solomon:heavenBoy@cluster3.bgsnr8z.mongodb.net/Testing1?retryWrites=true&w=majority&appName=AtlasApp'
const url2 = 'mongodb://127.0.0.1:27017/testingGame'
mongoose.connect(url2, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=> {
    console.log('database is running')
})

