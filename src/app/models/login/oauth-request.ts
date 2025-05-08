import { CreateData } from "./create-data";

export interface OAuthRequest {
    provider:     string;
    code:         string;
    codeVerifier: string;
    redirectUrl:  string;
    createData:   CreateData;
}