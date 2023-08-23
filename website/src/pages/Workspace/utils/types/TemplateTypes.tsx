export type TemplateMetaData = {
  id: number;
  filename: string;
  parameters: string;
  accessLevel: string;
  icon: string;
};

export class TemplateClass {
  constructor(
    readonly id?: number,
    readonly parameters?: object,
    readonly filename?: string,
    readonly accessLevel?: string,
    readonly icon?: string
  ){ }

  static fromDTO(dto: TemplateMetaData){
    return new TemplateClass(
      dto?.id,
      JSON.parse(dto.parameters as string),
      dto?.filename,
      dto?.accessLevel,
      dto?.icon
    )
  }
}
