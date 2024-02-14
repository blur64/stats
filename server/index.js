import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import cookieParser from 'cookie-parser';
import authChecker from './authChecker.js';

const PORT = 8081;
const dbConnectionUrl =
  'mongodb+srv://admin:admin@cluster0.5gufvml.mongodb.net/stats?retryWrites=true&w=majority';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cookieParser());
app.use(authChecker);


app.use('/api', router);

const startApp = async () => {
  try {
    await mongoose.connect(dbConnectionUrl);
    console.log('connected to DB');

    app.listen(PORT, () => {
      console.log('server is working. Port ' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
