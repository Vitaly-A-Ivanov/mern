// create server
const express = require('express') // library to run the server
const config = require('config') // const config entries
const mongoose = require('mongoose') // mongoDb library

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/link', require('./routes/link.routes'))

app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000 // get port from the config file , otherwise use 5000

//connect to mongoDB
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      // make sure connection is correct with a mongoDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    // in case of error
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

app.listen(PORT, () => console.log(`App has been started on port ${PORT}....`))