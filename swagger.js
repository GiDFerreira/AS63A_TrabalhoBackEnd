const swaggerAutoGen = require('swagger-autogen')()

output = './swagger_doc.json'
endpoints = ['./routes/animalIndex.js', './routes/jogadorIndex.js', './routes/login.js', './routes/mestreIndex.js', './routes/personagemIndex.js', './routes/users.js']

swaggerAutoGen(output, endpoints)