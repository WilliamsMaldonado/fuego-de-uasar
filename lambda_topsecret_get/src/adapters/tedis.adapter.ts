import { satellite } from "../model/request.model";

export interface TedisAdapter {
  getKeys(): Promise<satellite[]>;
  delKeys(keys: string[]): Promise<number>;
}
