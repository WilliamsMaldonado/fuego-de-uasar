import { satellite } from "../model/request.model";
import { position, Response } from "../model/response.model";
import { FuegoQuasarService } from "./fuego-quasar.service";
import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";
import { CONSTANTS } from "../utils/constants";
import FastVector from "fast-vector";

@injectable()
export class FuegoQuasarImplService implements FuegoQuasarService {
  getTopsecret(satellites: satellite[]): Promise<Response> {
    return new Promise((resolve, reject) => {
      let position: position;
      this.GetLocation(
        satellites.map(function (satellite) {
          return satellite.distance;
        }),
      )
        .then((_position) => {
          position = _position;
          return this.GetMessage(
            satellites.map(function (satellite) {
              return satellite.message;
            }),
          );
        })
        .then((message) => {
          return resolve(new Response(StatusCodes.OK, { position: position, message: message }));
        })
        .catch((err) => {
          console.error("ERROR: ", err);
          return resolve(new Response(StatusCodes.NOT_FOUND, { position: position, message: err.message }));
        });
    });
  }

  private GetLocation(distances: number[]): Promise<position> {
    return new Promise((resolve, reject) => {
      try {
        const vectorP1 = new FastVector(CONSTANTS.P1_Kenobi[0], CONSTANTS.P1_Kenobi[1]);
        const vectorP2 = new FastVector(CONSTANTS.P2_Skywalker[0], CONSTANTS.P2_Skywalker[1]);
        const vectorP3 = new FastVector(CONSTANTS.P3_Sato[0], CONSTANTS.P3_Sato[1]);

        const vectorP2_P1 = vectorP2.sub(vectorP1);
        const vectorP3_P1 = vectorP3.sub(vectorP1);

        const ex = vectorP2_P1.normalize();
        const i = ex.dot(vectorP3_P1);
        const ey = vectorP3_P1.sub(ex.mul(i)).normalize();
        const d = vectorP2.distance(vectorP1);
        const j = ey.dot(vectorP3_P1);
        const x = (Math.pow(distances[0], 2) - Math.pow(distances[1], 2) + Math.pow(d, 2)) / (2 * d);
        const y =
          (Math.pow(distances[0], 2) - Math.pow(distances[2], 2) + Math.pow(i, 2) + Math.pow(j, 2)) / (2 * j) -
          (i / j) * x;

        const location = vectorP1.add(ex.mul(x)).add(ey.mul(y));
        console.log("LOCATION: ", location);

        return resolve({ x: location.x, y: location.y });
      } catch (error) {
        return reject(error);
      }
    });
  }

  private GetMessage(messages: string[][]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const array1: string[] = [];
        messages = this.resolveGap(messages);
        const concatAndDeDuplicate = (...arrs: string[]) => [...new Set(arrs)];

        for (let i = 0; i < messages[0].length; i++) {
          const arrayUnique = concatAndDeDuplicate(messages[0][i], messages[1][i], messages[2][i]);
          arrayUnique.length > 1
            ? arrayUnique.filter(Boolean).map((str: string) => {
                array1.push(str);
              })
            : arrayUnique.map((str: string) => {
                array1.push(str);
              });
        }

        console.log("MESSAGE: ", array1);
        return resolve(array1.join(" "));
      } catch (error) {
        return reject(error);
      }
    });
  }

  private resolveGap(messages: string[][]): string[][] {
    const array1: string[][] = [];
    const concatAndDeDuplicate = (...arrs: number[]) => [...new Set(arrs)];
    const array = concatAndDeDuplicate(messages[0].length, messages[1].length, messages[2].length);
    const del = Math.max(...array) - Math.min(...array);
    for (let i = 0; i < del; i++) {
      messages.map((m) => {
        m.length > Math.min(...array) ? m.shift() : m;
      });
    }
    return messages;
  }
}
