import moment from "moment";

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

export type WorkspaceInfoDTO = {
  id?: string;
  // icon: string;
  name?: string;
  createdAt?: string;
  lastAccessed?: string;
  updatedAt?: string;
  description?: string;
  template_id?: string;
  state?: StatusType;
  tags?: string;
  type?: string;
  parameters?: string;
  message?: string;
};

export class WorkspaceInfoClass {
  constructor(
    readonly id?: string,
    // readonly icon: string,
    readonly name?: string,
    readonly createdAt?: string,
    readonly lastAccessed?: string,
    readonly updatedAt?: string,
    readonly description?: string,
    readonly template_id?: string,
    readonly state?: StatusType,
    readonly type?: string,
    readonly parameters?: object,
    readonly tags?: string
  ){ }

  static fromDTO(dto: WorkspaceInfoDTO){
    let state = dto?.state as keyof typeof StatusType
    return new WorkspaceInfoClass(
      dto?.id,
      dto?.name,
      moment(dto.createdAt).format('DD/MM/YY, hh:mm'),
      moment(dto.lastAccessed).format('DD/MM/YY, hh:mm'),
      moment(dto.updatedAt).format('DD/MM/YY, hh:mm'),
      dto?.description,
      dto?.template_id,
      StatusType[state],
      dto?.type,
      JSON.parse(dto.parameters as string),
      dto?.tags
    )
  }
}
