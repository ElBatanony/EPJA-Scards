import DataActions from '@main/__data__/actions/main';

const loadData = async () => {
  return DataActions();
};

const sum = (a, b) => a + b;

export { sum };

export default () => {
  loadData();
  document.write(`    
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Hello Fire App</title>
  </head>
  <body>
      <h1>Hello there!</h1>
      <p id="hello">hello</p>
  </body>
  </html>
  `);
  return;
};