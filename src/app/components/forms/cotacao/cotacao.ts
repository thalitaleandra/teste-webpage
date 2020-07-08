import { Models } from "./models";

export interface Cotacao {
  id: number;
  name: string;
  fipe_name: string;
  models: Models[];
}
