import { RawUser } from "./raw-user";

export interface Meta {
    id:           string;
    name:         string;
    username:     string;
    email:        string;
    avatarUrl:    string;
    accessToken:  string;
    refreshToken: string;
    rawUser:      RawUser;
}
