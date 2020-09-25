import "reflect-metadata";
import { handler } from "../src/index";
import * as tedis from "tedis";
import { StatusCodes } from "http-status-codes";
import { FuegoQuasarController } from "../src/controller/fuego-quasar.controller";

describe("Index test", () => {

  const event = {
    body: "",
    isBase64Encoded: false,
  };

  const data = {
    "distance": 100.0,
    "message": ["este", "", "", "mensaje", ""]
  }
  const tedisSpy = {
    get: function get(key: string): Promise<string | number | null> {
      return Promise.resolve(JSON.stringify(data));
    },
    close: function close(): void {
      console.log("close");
    },
    del: function del(key: string, ...keys: string[]): Promise<number> {
      return Promise.resolve(3);
    }
  }

  it("Handler ok", () => {
    spyOn(tedis, "Tedis").and.returnValue(tedisSpy);
    handler(event).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
    })
  });

})