import { satellite } from "../model/request.model";
import { Response } from "../model/response.model";
export interface FuegoQuasarService {
  getTopsecret(): Promise<Response>;
}
