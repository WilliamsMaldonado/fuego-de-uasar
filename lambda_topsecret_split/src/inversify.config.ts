import { Container } from "inversify";
import { TedisAdapterImpl } from "./adapters/tedis-impl.adapter";
import { TedisAdapter } from "./adapters/tedis.adapter";
import { FuegoQuasarSplitController } from "./controller/fuego-quasar-split.controller";
import { FuegoQuasarSplitImplService } from "./services/fuego-quasar-split-impl.service";
import { FuegoQuasarSplitService } from "./services/fuego-quasar-split.service";
import { ADAPTERS, CONTROLLERS, SERVICES, UTILS } from "./utils/constants";
import { RequestValidator } from "./utils/request-validator";

const AppContainer: Container = new Container();
AppContainer.bind<FuegoQuasarSplitController>(CONTROLLERS.FuegoQuasarSplitController).to(FuegoQuasarSplitController);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);
AppContainer.bind<FuegoQuasarSplitService>(SERVICES.FuegoQuasarSplitService).to(FuegoQuasarSplitImplService);
AppContainer.bind<TedisAdapter>(ADAPTERS.TedisAdapter).to(TedisAdapterImpl);

export { AppContainer };
