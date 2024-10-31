import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import {
  ClientIdentityResponse,
  ClientResponse,
  ClientResponseType,
} from "../common/types";
dotenv.config();

const ID: string = process.env.IPHUB_GEO_ID as string;
const INFO_ID: string = process.env.IPDATA_ID as string;

class RealIdentity {
  private static instance: RealIdentity | null = null;
  private readonly client: string;
  private readonly proxyUrl: string;
  private readonly clientInfoUrl: string;

  private constructor(ip: string) {
    if (!ID) {
      throw new Error(
        "IPHUB_GEO_ID is not defined in the environment variables."
      );
    }
    this.client = ip;
    this.proxyUrl = `http://v2.api.iphub.info/ip/${ip}`;
    this.clientInfoUrl = `https://api.ipdata.co/${ip}?api-key=${INFO_ID}`;
  }

  static get(ip: string): RealIdentity {
    if (!RealIdentity.instance) {
      RealIdentity.instance = new RealIdentity(ip);
    }
    return RealIdentity.instance;
  }

  async checkFraud(): Promise<{flag?:number,status:ClientResponse}> {
    try {
      const response: AxiosResponse = await axios.get(this.proxyUrl, {
        headers: {
          "X-Key": ID,
        },
      });

      if (response.data.ip === this.client) {
        const data = response.data;
        const proxy_rate = data.block;
        if (proxy_rate == 0) {
          return {flag:proxy_rate, status:ClientResponseType.SECURED};
        } else {
          return {flag:proxy_rate,status:ClientResponseType.UNSECURE};
        }
      }
      return {status:ClientResponseType.UNAUTHORIZED};
    } catch (error: unknown) {
      console.error("Error checking fraud:", (error as Error).message);
      return {status:ClientResponseType.UNAUTHORIZED};
    }
  }

  async getClientInfo(): Promise<ClientIdentityResponse> {
    let res: ClientIdentityResponse = {
      status: ClientResponseType.UNAUTHORIZED,
      ip: this.client,
    };
    try {
      const response: AxiosResponse = await axios.get(this.clientInfoUrl);
      const client_info = response.data;
      res.calling_code = client_info.calling_code;
      res.city = client_info.city;
      res.client_location = {
        latitude: client_info.latitude,
        longitude: client_info.longitude,
      };
      res.continent_name = client_info.continent_name;
      res.country_code = client_info.country_code;
      res.emoji_flag = client_info.emoji_flag;
      res.current_time = client_info.time_zone.current_time;
      res.region = client_info.region;

      return res;
    } catch (error: unknown) {
      console.error(
        "Error retrieving client information:",
        (error as Error).message
      );
      return res;
    }
  }
  async clientAuthInfo(): Promise<ClientIdentityResponse> {
    let response: ClientIdentityResponse = {
      status: ClientResponseType.UNSECURE,
      ip: this.client,
    };

    try {
      const info = await this.getClientInfo();
      response = {
        ...info,
        ...response,
      };
      const res = await this.checkFraud();
      response.fraud_flag=res.flag;
      if (res.status === ClientResponseType.SECURED) {
        response.status = ClientResponseType.SECURED;
      }
    } catch (error) {}
    return response;
  }
}

export default RealIdentity;
