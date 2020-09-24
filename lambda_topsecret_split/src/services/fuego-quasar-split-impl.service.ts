import { satellite } from "../model/request.model";
import { Response } from "../model/response.model";
import { FuegoQuasarSplitService } from "./fuego-quasar-split.service";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { ADAPTERS, CONSTANTS } from "../utils/constants";
import { TedisAdapter } from "../adapters/tedis.adapter";

@injectable()
export class FuegoQuasarSplitImplService implements FuegoQuasarSplitService {
  constructor(@inject(ADAPTERS.TedisAdapter) private adapter: TedisAdapter) {}
  setSatellite(satellite: satellite, name: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.adapter
        .setKey(name, satellite)
        .then((res) => {
          return resolve(new Response(StatusCodes.OK, { message: CONSTANTS.RESPONSE }));
        })
        .catch((err) => {
          console.error("ERROR: ", err);
          return resolve(new Response(StatusCodes.INTERNAL_SERVER_ERROR, { message: err.message }));
        });
    });
  }
}
