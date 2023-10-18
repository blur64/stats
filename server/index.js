import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';

const PORT = 8081;
const dbConnectionUrl =
  'mongodb+srv://admin:admin@cluster0.5gufvml.mongodb.net/stats?retryWrites=true&w=majority';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  next();
});
app.use('/api', router);

const startApp = async () => {
  try {
    await mongoose.connect(dbConnectionUrl);
    console.log('connected to DB');

    app.listen(PORT, () => {
      console.log('server is working');
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
