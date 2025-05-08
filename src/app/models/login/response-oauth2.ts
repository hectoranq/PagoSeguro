import { Meta } from "./meta";
import { Record } from "./record";

export interface ResponseOAuth2 {
    token:  string;
    record: Record;
    meta:   Meta;
}