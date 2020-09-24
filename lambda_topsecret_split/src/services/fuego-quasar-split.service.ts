import { satellite } from "../model/request.model";
import { Response } from "../model/response.model";
export interface FuegoQuasarSplitService {
  setSatellite(satellite: satellite, name: string): Promise<Response>;
}
