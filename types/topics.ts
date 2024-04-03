export interface TopicsData {
  topics: ITopic[];
}
export interface IResource {
  type: string;
  name: string;
  link: string;
  seniority_level: string;
}

export interface ISubtopic {
  name: string;
  description: string;
  resources?: IResource[];
}

export interface ITopic {
  name: string;
  description: string;
  subtopics: ISubtopic[];
}

export interface ITopicsData {
  topics: ITopic[];
}
