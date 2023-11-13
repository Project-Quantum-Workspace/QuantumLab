export type TemplateMetaData = {
  id: number;
  filename: string;
  parameters: string;
  accessLevel: number;
  icon: string;
  createdAt:string;
  readme: string;
};

export type TemplateField = {
  name: string;
  description:string;
  default?:string;
  type:string;
  label: string;
  selections?: DataSelections[];
  isInput: boolean;
  validation?:string[];
}
export type DataSelections={
  
  name:string;
  value:string
}
export class TemplateClass {
  constructor(
    readonly id: number,
    readonly parameters: TemplateField[],
    readonly filename: string,
    readonly accessLevel: number,
    readonly icon: string,
    readonly readme: string
  ){ }

  static fromDTO(dto: TemplateMetaData){
    return new TemplateClass(
      dto.id,
      JSON.parse(dto.parameters as string),
      dto.filename,
      dto.accessLevel,
      dto.icon,
      dto.readme
    )
  }
}
