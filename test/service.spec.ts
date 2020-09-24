import { FuegoQuasarImplService } from "../src/services/fuego-quasar-impl.service";
import { satellite } from "../src/model/request.model";
import { FuegoQuasarService } from "../src/services/fuego-quasar.service";
import { StatusCodes } from "http-status-codes";

describe("Fuego Quasar Service", () => {
  let service:FuegoQuasarService;

  beforeEach(() => {
    service = new FuegoQuasarImplService();
  })

  it("Service Error location", () => {
    const satellites:satellite[] = [
      {
        distance: 0,
        message: [""],
        name: "",
      }
    ]
    service.getTopsecret(satellites).then(res => {
      expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(JSON.parse(res.body).message).toContain("length");
    });
  });
})