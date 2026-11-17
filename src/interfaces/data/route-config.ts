export interface IRouteConfig {
  href: string;
  title: string;
  linkInactive?: string;
  sublist?: IRouteConfig[];
  className?: string;
}
