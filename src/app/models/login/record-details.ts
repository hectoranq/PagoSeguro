export interface RecordDetails {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  name: string;
  avatar: string; // Filename or URL
}
