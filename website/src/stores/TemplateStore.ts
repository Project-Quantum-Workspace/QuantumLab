import { TemplateClass } from "@/utils/types/TemplateTypes"
import create from "zustand"
export type TemplateStore = {
  currentTemplate: TemplateClass
  setCurrentTemplate: (template: TemplateClass | undefined) => void
}

const useTemplateStore = create<TemplateStore>((set) => ({
  currentTemplate: new TemplateClass(0, [], '', 0, '', ''),
  setCurrentTemplate: (template: TemplateClass | undefined) => {
    set({currentTemplate: template})
  }
}))

export default useTemplateStore