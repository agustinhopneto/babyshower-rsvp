import axios, { AxiosInstance } from 'axios';

import { ConfirmationData } from '@/app/page';

export class API {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_RSVP_API_URL,
    });
  }

  async sendConfirmation(data: ConfirmationData) {
    const confirmation = {
      ...data,
      people: data.people.map((item) => item.value),
    };

    const { data: response } = await this.client.post('/invites', confirmation);

    console.log(response);
  }
}
