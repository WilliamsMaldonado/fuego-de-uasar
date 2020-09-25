import { injectable } from "inversify";
import { TedisAdapter } from "./tedis.adapter";
import { Tedis } from "tedis";
import { satellite } from "../model/request.model";
import { CONSTANTS } from "../utils/constants";

@injectable()
export class TedisAdapterImpl implements TedisAdapter {
  private tedis = new Tedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || "6379"),
  });

  getKeys(): Promise<satellite[]> {
    return new Promise((resolve, reject) => {
      const satellites: satellite[] = [];
      this.tedis
        .get(CONSTANTS.KENOBI)
        .then((res) => {
          console.log("RES: ", res);
          return res == null
            ? reject({ message: `${CONSTANTS.NOT_DATA} ${CONSTANTS.KENOBI}` })
            : satellites.push(this.satelliteCreate(CONSTANTS.KENOBI, res as string));
        })
        .then((data) => this.tedis.get(CONSTANTS.SKYWALKER))
        .then((res) => {
          console.log("RES: ", res);
          return res == null
            ? reject({ message: `${CONSTANTS.NOT_DATA} ${CONSTANTS.SKYWALKER}` })
            : satellites.push(this.satelliteCreate(CONSTANTS.SKYWALKER, res as string));
        })
        .then((data) => this.tedis.get(CONSTANTS.SATO))
        .then((res) => {
          console.log("RES: ", res);
          return res == null
            ? reject({ message: `${CONSTANTS.NOT_DATA} ${CONSTANTS.SATO}` })
            : satellites.push(this.satelliteCreate(CONSTANTS.SATO, res as string));
        })
        .then((data) => resolve(satellites))
        .catch((err) => reject(err));
    });
  }

  delKeys(keys: string[]): Promise<number> {
    return new Promise((resolve, reject) => {
      this.tedis
        .del(keys[0], ...keys)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private satelliteCreate(name: string, data: string): satellite {
    console.log("SATELLITE PUSH: ", name, data);
    return {
      name: name,
      distance: JSON.parse(data).distance,
      message: JSON.parse(data).message,
    };
  }
}
