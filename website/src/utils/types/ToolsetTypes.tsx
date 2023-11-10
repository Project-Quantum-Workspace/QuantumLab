import TerminalLOGO from '../../assets/TerminalLOGO.svg';
import VSCodeLOGO from '../../assets/VSCodeLOGO.svg';
import JupyterLOGO from '../../assets/JupyterLOGO.svg';

export enum ToolsetType {
  Proxy = 'proxy',
  SSH = 'ssh'
}

export enum ToolsetAccessType {
  NonWildcard = 'non_wildcard',
  Wildcard = 'wildcard'
}


export type ToolsetMetaData = {
  accessId: string
  accessType: string
  icon: string
  name: string
  type: string
};

export class ToolsetClass {
  constructor(
    readonly name: string,
    readonly icon: string,
    readonly type: ToolsetType,
    readonly accessType: ToolsetAccessType,
    readonly accessId: string
  ) { }

  static fromDTO(dto: ToolsetMetaData) {
    let icon = null
    switch (dto.name.toLowerCase()) {
      case 'jupyter': {
        icon = JupyterLOGO
        break
      }
      case 'vs code': {
        icon = VSCodeLOGO
        break
      }
      case 'terminal': {
        icon = TerminalLOGO
        break
      }
      default: { 
        break; 
     }
    }
    return new ToolsetClass(
      dto.name, 
      icon, 
      dto.type as ToolsetType,
      dto.accessType as ToolsetAccessType,
      dto.accessId
    )
  }

  static getLink(accessId: string): string {
    let link = 'https://' + accessId + '.quantumlab.cloud'
    return link
  }
}