export interface TedisAdapter {
  setKey(key: string, data: any): Promise<string>;
}
