export interface ITopic {
  id: string;
  created_at: Date;
  created_by: string;
  name: string;
  description: string;
  subtopics: ISubtopic[];
}
export interface ISubtopic {
  id: string;
  created_at: Date;
  created_by: string;
  name: string;
  description: string;
  resources?: IResource[];
}
export interface IResource {
  id: string;
  name: string;
  type: string;
  link: string;
  skill_level: string;
}
