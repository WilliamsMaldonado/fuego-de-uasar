import { injectable } from "inversify";
import { TedisAdapter } from "./tedis.adapter";
import { Tedis } from "tedis";
import { satellite } from "../model/request.model";

@injectable()
export class TedisAdapterImpl implements TedisAdapter {
  private tedis = new Tedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || "6379"),
  });

  setKey(key: string, data: satellite): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("KEY: ", key, JSON.stringify(data));
      this.tedis
        .set(key.toLowerCase(), JSON.stringify(data))
        .then((res) => {
          console.log("RES: ", res);
          resolve(res);
        })
        .catch((err) => reject(err))
        .finally(() => this.tedis.close());
    });
  }
}
