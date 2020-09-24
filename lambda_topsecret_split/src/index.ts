import "reflect-metadata";
import { FuegoQuasarSplitController } from "./controller/fuego-quasar-split.controller";
import { AppContainer } from "./inversify.config";
import { Response } from "./model/response.model";
import { CONTROLLERS } from "./utils/constants";

export function handler(event: any) {
  return new Promise((resolve, reject) => {
    const controller: FuegoQuasarSplitController = AppContainer.get<FuegoQuasarSplitController>(
      CONTROLLERS.FuegoQuasarSplitController,
    );
    controller
      .eventHandler(event.body, event.queryStringParameters.satellite_name)
      .then((response: Response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
