export interface Record {
    id:              string;
    collectionId:    string;
    collectionName:  string;
    username:        string;
    verified:        boolean;
    emailVisibility: boolean;
    email:           string;
    created:         Date;
    updated:         Date;
    name:            string;
    avatar:          string;
}