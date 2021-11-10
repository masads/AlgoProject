import express from 'express' ;
import router  from './routes/routes.js' ;


const app = express();


// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); 
app.use(router);

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');