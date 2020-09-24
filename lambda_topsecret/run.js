const index = require('./dist/index');

const body = {
  "satellites": [
    {
      "name": "kenobi",
      "distance": 100.0,
      "message": ["este", "", "", "mensaje", ""]
    },
    {
      "name": "skywalker",
      "distance": 115.5,
      "message": ["", "es", "", "", "secreto"]
    },
    {
      "name": "sato",
      "distance": 142.7,
      "message": ["", "este", "", "un", "", ""]
    }
  ]
}

const event = {
  body: JSON.stringify(body),
  isBase64Encoded: false,
};

index.handler(event).then((data) => console.log(data))
  .catch((error) => console.log(error));