import express                from 'express'
import cors                   from 'cors'
import helmet                 from 'helmet'
import compression            from 'compression'
import path                   from 'path'

const app                     = express()
const port                    = Number(process.env.PORT || 3000);

app.enable('trust proxy')

app.use(cors({ maxAge: 86400 }))

if (process.env.NODE_ENV === 'production') { app.use(helmet()) }

app.use(compression({ threshold: 0 }))
app.use(express.static(path.join(__dirname, '../')))

app.get('*', (req, res) => {

    res.status(400).json({ status: 400, msg: 'not found' })
});

const server = app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});

server.keepAliveTimeout = 61 * 1000;
