import Ajv from "ajv";
import { injectable } from "inversify";
import { satellite } from "../model/request.model";
import { StatusCodes } from "http-status-codes";
import { Response } from "../model/response.model";

@injectable()
export class RequestValidator {
  public validate(request: any, schema: any): Promise<satellite> {
    return new Promise((resolve, reject) => {
      const ajv: Ajv.Ajv = new Ajv();
      const isValid: boolean | PromiseLike<any> = ajv.validate(schema, request);
      if (!isValid) {
        return reject(new Response(StatusCodes.NOT_FOUND, { message: ajv.errorsText() }));
      }
      return resolve(request);
    });
  }
}
