export type TemplateMetaData = {
  id: number;
  filename: string;
  parameters: string;
  accessLevel: string;
  icon: string;
  readme: string;
};

export type TemplateField = {
  name: string;
  label: string;
  isInput: boolean;
  selections: string[];
}

export class TemplateClass {
  constructor(
    readonly id: number,
    readonly parameters: TemplateField[],
    readonly filename: string,
    readonly accessLevel: string,
    readonly icon: string,
    readonly readme: string
  ){ }

  static fromDTO(dto: TemplateMetaData){
    // const params = JSON.parse(dto.parameters as string)
    // let templateParams: TemplateField[] = []
    // params.forEach((param: any) => {
    //   const field: TemplateField = {
    //     name: param.name,
    //     label: param.label,
    //     isInput: param.isInput,
    //     selections: param.selections
    //   }
    //   templateParams.push(field)
    // })

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
