import errorHandler from 'errorhandler';
import app from './app';
import {DBConnection as connectToMongo} from './dal/db';
import {ViberBot} from './controllers/viber';

let server;
app.use(errorHandler());

connectToMongo()
  .then(() => {
    server = app.listen(app.get('port'), async () => {
      await new ViberBot();
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      );
    });
  });

export default server;
