import { expressApiV1 } from '..';

expressApiV1.get('/test', (req, res) => {
  res.send('hello world!');
});
