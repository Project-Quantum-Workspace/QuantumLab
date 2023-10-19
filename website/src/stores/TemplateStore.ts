import { TemplateClass } from "@/utils/types/TemplateTypes"
import { create } from "zustand"
export type TemplateStore = {
  fetchedTemplates: TemplateClass[]
  currentTemplate: TemplateClass | undefined
  setFetchedTemplates: (templates: TemplateClass[] | undefined) => void
  setCurrentTemplate: (template: TemplateClass | undefined) => void
}

const useTemplateStore = create<TemplateStore>((set) => ({
  fetchedTemplates: [],
  currentTemplate: undefined,
  setFetchedTemplates: (templates: TemplateClass[] | undefined) => {
    set({fetchedTemplates: templates})
  },
  setCurrentTemplate: (template: TemplateClass | undefined) => {
    set({currentTemplate: template})
  }
}))

export default useTemplateStore