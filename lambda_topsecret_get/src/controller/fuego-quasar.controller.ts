import { inject, injectable } from "inversify";
import { Response } from "../model/response.model";
import { SERVICES } from "../utils/constants";
import { StatusCodes } from "http-status-codes";
import { FuegoQuasarService } from "../services/fuego-quasar.service";

@injectable()
export class FuegoQuasarController {
  constructor(@inject(SERVICES.FuegoQuasarService) private service: FuegoQuasarService) {}

  public eventHandler(): Promise<Response> {
    return new Promise((resolve, reject) => {
      console.log("CONTROLLER");
      try {
        this.service
          .getTopsecret()
          .then((response) => {
            return resolve(response);
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
