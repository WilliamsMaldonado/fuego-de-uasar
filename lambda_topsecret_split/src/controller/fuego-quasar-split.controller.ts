import { inject, injectable } from "inversify";
import { Response } from "../model/response.model";
import { SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import { StatusCodes } from "http-status-codes";
import * as schema from "../resources/schema-request.json";
import { FuegoQuasarSplitService } from "../services/fuego-quasar-split.service";

@injectable()
export class FuegoQuasarSplitController {
  constructor(
    @inject(UTILS.RequestValidator) private validator: RequestValidator,
    @inject(SERVICES.FuegoQuasarSplitService) private service: FuegoQuasarSplitService,
  ) {}

  public eventHandler(body: any, satellite_name: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      try {
        this.validator
          .validate(JSON.parse(body), schema)
          .then((satellite) => {
            return resolve(this.service.setSatellite(satellite, satellite_name));
          })
          .catch((err: Response) => {
            console.error("ERROR: ", err);
            return resolve(err);
          });
      } catch (error) {
        return resolve(new Response(StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message }));
      }
    });
  }
}
