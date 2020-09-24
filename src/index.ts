import "reflect-metadata";
import { FuegoQuasarController } from "./controller/fuego-quasar.controller";
import { AppContainer } from "./inversify.config";
import { Response } from "./model/response.model";
import { CONTROLLERS } from "./utils/constants";

export function handler(event: any) {
  return new Promise((resolve, reject) => {
    const controller: FuegoQuasarController = AppContainer.get<FuegoQuasarController>(
      CONTROLLERS.FuegoQuasarController,
    );
    controller
      .eventHandler(event.body)
      .then((response: Response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
