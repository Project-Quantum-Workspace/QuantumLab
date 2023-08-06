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

export type ProjectItemType = {
  icon: string;
  name: string;
  createDate: string;
  lastAccessedDate: string;
  template: string;
  status: StatusType;
  tags: string[];
};
