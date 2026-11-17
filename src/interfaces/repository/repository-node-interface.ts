import { RepositoryNodeType } from "src/enums/repository-node-type";

export interface IRepositoryTreeNode {
  title: string;
  nodeType: RepositoryNodeType;
  link?: string;
  children?: IRepositoryTreeNode[];
  hidden?: boolean;
}
