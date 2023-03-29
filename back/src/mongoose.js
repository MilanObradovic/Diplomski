// Connection URI
import mongoose from 'mongoose';

const databaseURI =
  'mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net/WeatherDB?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
console.clear();
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.group('Database');
    console.log('Successfully connected to the database');
    console.groupEnd();
  })
  .catch(() => {
    console.group('Database');
    console.log('Error while trying to connect to database');
    console.groupEnd();
  });

export const mongoose = Mmongoose;
