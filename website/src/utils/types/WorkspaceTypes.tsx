import moment from "moment";

import { TemplateMetaData } from "./TemplateTypes";

export enum StatusType {
  Running = 'Running',
  Stopped = 'Stopped',
  Pending = 'Pending',
  Failed = 'Failed',
  Connecting = 'Connecting',
}
export enum ToolsetType {
  Terminal = 'Terminal',
  VSCode = 'VSCode',
  Jupyter = 'Jupyter',
}

export type ToolsetItemType = {
  type: ToolsetType;
  link?: string;
};

export type ProjectEventType = {
  action: string;
  date: string;
  logs?: string;
};


export type WorkspaceInfoMetaData = {
  id?: number;
  name?: string;
  createdAt?: string;
  lastAccessed?: string;
  updatedAt?: string;
  description?: string;
  templateId?: number;
  template?: TemplateMetaData;
  state?: string;
  tags?: string;
  type?: string;
  parameters?: string;
  message?: string;
};

export class WorkspaceInfoClass {
  constructor(

    readonly id?: number,

    readonly name?: string,
    readonly createdAt?: string,
    readonly lastAccessed?: string,
    readonly updatedAt?: string,
    readonly description?: string,

    readonly templateId?: number,
    readonly templateName?: string,
    readonly templateIcon?: string,

    readonly state?: StatusType,
    readonly type?: string,
    readonly parameters?: object,
    readonly tags?: string
  ){ }


  static fromDTO(dto: WorkspaceInfoMetaData){
    let state = dto?.state as keyof typeof StatusType


    return new WorkspaceInfoClass(
      dto?.id,
      dto?.name,
      moment(dto.createdAt).format('DD/MM/YY, hh:mm'),
      moment(dto.lastAccessed).format('DD/MM/YY, hh:mm'),
      moment(dto.updatedAt).format('DD/MM/YY, hh:mm'),
      dto?.description,

      dto?.templateId,
      dto.template?.filename,
      dto.template?.icon,
      StatusType[state],
      dto?.type,
      JSON.parse(dto.parameters as string) ?? undefined,

      dto?.tags
    )
  }
}
