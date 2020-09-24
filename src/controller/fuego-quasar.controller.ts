import { inject, injectable } from "inversify";
import { Response } from "../model/response.model";
import { SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import { StatusCodes } from "http-status-codes";
import * as schema from "../resources/schema-request.json";
import { FuegoQuasarService } from "../services/fuego-quasar.service";

@injectable()
export class FuegoQuasarController {
  constructor(
    @inject(UTILS.RequestValidator) private validator: RequestValidator,
    @inject(SERVICES.FuegoQuasarService) private servicce: FuegoQuasarService,
  ) {}

  public eventHandler(body: any): Promise<Response> {
    return new Promise((resolve, reject) => {
      try {
        this.validator
          .validate(JSON.parse(body), schema)
          .then((satellites) => {
            return resolve(this.servicce.getTopsecret(satellites));
          })
          .catch((err: Response) => {
            console.error("ERROR: ", err);
            return resolve(err);
          });
      } catch (error) {
        return resolve(new Response(StatusCodes.NOT_FOUND, { position: { x: 0, y: 0 }, message: error.message }));
      }
    });
  }
}
