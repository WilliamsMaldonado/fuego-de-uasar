import { Container } from "inversify";
import { FuegoQuasarController } from "./controller/fuego-quasar.controller";
import { FuegoQuasarImplService } from "./services/fuego-quasar-impl.service";
import { FuegoQuasarService } from "./services/fuego-quasar.service";
import { CONTROLLERS, SERVICES, UTILS } from "./utils/constants";
import { RequestValidator } from "./utils/request-validator";

const AppContainer: Container = new Container();
AppContainer.bind<FuegoQuasarController>(CONTROLLERS.FuegoQuasarController).to(FuegoQuasarController);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);
AppContainer.bind<FuegoQuasarService>(SERVICES.FuegoQuasarService).to(FuegoQuasarImplService);

export { AppContainer };
