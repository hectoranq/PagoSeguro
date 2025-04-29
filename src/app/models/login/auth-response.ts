import { RecordDetails } from "./record-details";

export interface AuthResponse {
  token: string;
  record: RecordDetails;
}
