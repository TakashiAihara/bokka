import type {
  architectures,
  areas,
  docs,
  domains,
  environments,
  experiences,
  frameworks,
  nonFunctionalItems,
  operations,
  packages,
  roles,
  services,
  tests,
  tools,
  usages,
} from './constants';

export type Domain = (typeof domains)[number];
export type Environment = (typeof environments)[number];
export type Area = (typeof areas)[number];
export type Framework = (typeof frameworks)[number];
export type Package = (typeof packages)[number];
export type Architecture = (typeof architectures)[number];
export type Doc = (typeof docs)[number];
export type Role = (typeof roles)[number];
export type Usage = (typeof usages)[number];
export type Experience = (typeof experiences)[number];
export type Test = (typeof tests)[number];
export type Service = (typeof services)[number];
export type NonFunctionalItem = (typeof nonFunctionalItems)[number];
export type Tool = (typeof tools)[number];
export type Operation = (typeof operations)[number];
