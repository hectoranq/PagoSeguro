import { Record } from "./record";

export interface AuthRefreshResponse {
    token:  string;
    record: Record;
}
