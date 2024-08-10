export interface GlobalObject {
  items: Repository[]
}
export interface Repository {
  id: number;
  name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
}

export interface RepositoryDetails {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  license: {
    name:string
  };
  topics: string[]
}
