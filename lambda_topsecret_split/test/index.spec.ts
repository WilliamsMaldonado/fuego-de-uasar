import "reflect-metadata";
import { handler } from "../src/index";
import * as tedis from "tedis";
import { StatusCodes } from "http-status-codes";
import { CONSTANTS } from "../src/utils/constants";

describe("Index test", () => {

  const body = {
    "distance": 100.0,
    "message": ["este", "", "", "mensaje", ""]
  }

  const event = {
    body: JSON.stringify(body),
    isBase64Encoded: false,
    queryStringParameters: { satellite_name: "sato" }
  };

  const tedisSpy = {
    set: function set(key:string, value:string):Promise<any> {
      return Promise.resolve(CONSTANTS.RESPONSE);
    },
    close: function close():void {
      console.log("close");
    }
  }
  
  it("Handler ok", () => {
    spyOn(tedis, "Tedis").and.returnValue(tedisSpy);
    handler(event).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(JSON.parse(result.body).message).toEqual(CONSTANTS.RESPONSE)
    });
  });
})