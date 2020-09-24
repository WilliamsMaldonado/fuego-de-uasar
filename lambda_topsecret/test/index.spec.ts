import "reflect-metadata";
import { handler } from "../src/index";
import { StatusCodes } from "http-status-codes";
import { FuegoQuasarController } from "../src/controller/fuego-quasar.controller";

describe("Index test", () => {
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

  it("Handler ok", () => {
    handler(event).then((result:any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(JSON.parse(result.body).message).toEqual("este es un mensaje secreto");
    })
  });

  it("Hadler validator error", () => {
    const eventErr = {
      body: JSON.stringify({data: ""}),
      isBase64Encoded: false,
    };
    handler(eventErr).then((result:any) => {
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(JSON.parse(result.body).message).toContain("required property");
    })
  });

  it("Handler controller reject", () => {
    spyOn(FuegoQuasarController.prototype, "eventHandler").and.returnValue(Promise.reject("Error"));
    handler("").catch(err => {
      expect(err).toEqual("Error");
    })
  });

  it("Handler controller error", () => {
    handler("").then((res:any) => {
      expect(JSON.parse(res.body).message).toContain("JSON");
    })
  });
})