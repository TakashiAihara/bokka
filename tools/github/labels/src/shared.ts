import {
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
} from '@packages/shared';

export type Context = typeof contexts;
export type ContextKey = keyof typeof contexts;
export type PatternGenerator = (value: string) => string[];

type ToUnion<T extends readonly string[]> = T[number];

type ContextMap = {
  [K in ContextKey]: ToUnion<Context[K]>;
};

type LabelKey = {
  [K in ContextKey]: `${K}:${ContextMap[K]}`;
}[ContextKey];

export type PathConfig = {
  [K in LabelKey]?: string[];
};

export type LabelConfig = {
  [K in LabelKey]: {
    color: string;
    description?: string;
  };
};

export type LabelSettings = {
  pathConfigs: PathConfig;
  labelConfigs: LabelConfig;
};

export const contexts = {
  domain: domains,
  environment: environments,
  area: areas,
  framework: frameworks,
  package: packages,
  architecture: architectures,
  doc: docs,
  role: roles,
  usage: usages,
  experience: experiences,
  test: tests,
  service: services,
  nonFunctionalItem: nonFunctionalItems,
  tool: tools,
  operation: operations,
} as const;
