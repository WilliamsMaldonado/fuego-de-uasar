import { Container } from "inversify";
import { TedisAdapterImpl } from "./adapters/tedis-impl.adapter";
import { TedisAdapter } from "./adapters/tedis.adapter";
import { FuegoQuasarController } from "./controller/fuego-quasar.controller";
import { FuegoQuasarImplService } from "./services/fuego-quasar-impl.service";
import { FuegoQuasarService } from "./services/fuego-quasar.service";
import { ADAPTERS, CONTROLLERS, SERVICES } from "./utils/constants";

const AppContainer: Container = new Container();
AppContainer.bind<FuegoQuasarController>(CONTROLLERS.FuegoQuasarController).to(FuegoQuasarController);
AppContainer.bind<FuegoQuasarService>(SERVICES.FuegoQuasarService).to(FuegoQuasarImplService);
AppContainer.bind<TedisAdapter>(ADAPTERS.TedisAdapter).to(TedisAdapterImpl);

export { AppContainer };
