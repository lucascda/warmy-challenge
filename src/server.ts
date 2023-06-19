import { app } from './app';

const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server is listening on localhost:${port}`);
});
