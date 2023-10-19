import { WorkspaceInfoMetaData } from './WorkspaceTypes';

export type UserTokenType = {
  id?: number;
  name: string;
  value: string;
}

export type UserMetaData = {
  accessLevel: number;
  accountStatus: boolean;
  avatar: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  quantumlabToken: string;
  roles: {
    id: number;
    name: string;
  }[];
  uuid: string;
  workspaces: WorkspaceInfoMetaData[]; // This array will now also contain the uuid for each workspace
};
