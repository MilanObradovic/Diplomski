// Connection URI
import mong from 'mongoose';

const databaseURI =
  'mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net/WeatherDB?retryWrites=true&w=majority';

mong.Promise = global.Promise;
mong.set('strictQuery', false);
console.clear();
mong
  .connect(databaseURI, {
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

export const mongoose = mong;
