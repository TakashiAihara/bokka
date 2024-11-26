import type { LabelSettings } from './shared';

export const settings: LabelSettings = {
  pathConfigs: {
    'architecture:container': ['apps/cores/**/*'],
    'architecture:serverless': ['apps/**/bff/**/*'],

    'framework:react': ['apps/users/client/extension/**/*'],
    'framework:commander': ['apps/**/client/cli/**/*'],
    'framework:hono': ['apps/**/bff/**/*'],
    'framework:nestjs': ['apps/cores/**/*'],

    'tool:biome': ['tools/biome/**/*'],
    'tool:github-actions': ['.github/workflows/**/*'],
    'tool:github-labels': ['.github/labeler.yml'],
    'tool:typescript': ['**/*.ts', '**/*.tsx'],
    'tool:vitest': ['**/vitest.config.*', '**/*.test.ts', '**/*.spec.ts'],

    'doc:readme': ['README.md'],
    'doc:architectures': ['docs/architectures.md'],
    'doc:requirements': ['docs/requirements.md'],

    'experience:cd': ['.github/workflows/**/*-deploy.{yaml,yml}'],
    'experience:ci': ['.github/workflows/**/*'],
    'experience:develop': [
      'tsconfig.json',
      '.npmrc',
      '.gitignore',
      'package.json',
      '.husky/**/*',
      '.vscode/**/*',
    ],
    'experience:docker': [
      'docker-compose.{yaml,yml}',
      '**/docker-compose.{yaml,yml}',
      'Dockerfile',
      '**/Dockerfile',
    ],

    'role:bff': ['apps/**/bff/**/*'],
    'role:client': ['apps/client/**/*'],
    'role:service': ['apps/cores/**/*'],
  },
  labelConfigs: {
    'architecture:container': { color: 'FF4500' },
    'architecture:serverless': { color: 'FF6347' },

    'area:bookmarks': { color: '4B0082' },
    'area:feeds': { color: '8A2BE2' },

    'doc:architectures': { color: '228B22' },
    'doc:readme': { color: '32CD32' },
    'doc:requirements': { color: '90EE90' },

    'domain:cores': { color: '1E90FF' },
    'domain:managers': { color: '4169E1' },
    'domain:users': { color: '6495ED' },

    'environment:development': { color: 'FFD700' },
    'environment:staging': { color: 'FFA500' },
    'environment:production': { color: 'FF8C00' },

    'framework:hono': { color: 'DC143C' },
    'framework:nestjs': { color: 'CD5C5C' },
    'framework:react': { color: 'F08080' },
    'framework:commander': { color: 'E9967A' },

    'package:shared': { color: '2E8B57' },
    'package:db': { color: '3CB371' },
    'package:auth': { color: '66CDAA' },
    'package:ui': { color: '8FBC8F' },
    'package:validators': { color: '20B2AA' },
    'package:grpc': { color: '00FA9A' },

    'role:bff': { color: 'DDA0DD' },
    'role:client': { color: 'DA70D6' },
    'role:service': { color: 'BA55D3' },

    'usage:read': { color: '00CED1' },
    'usage:write': { color: '48D1CC' },

    'experience:ci': { color: 'FF69B4' },
    'experience:cd': { color: 'FF1493' },
    'experience:develop': { color: 'DB7093' },
    'experience:docker': { color: 'C71585' },

    'test:end-to-end': { color: '9370DB' },
    'test:unit': { color: '8A2BE2' },
    'test:integration': { color: '9400D3' },
    'test:visual-regression': { color: '9932CC' },
    'test:performance': { color: 'BA55D3' },

    'service:analyzer': { color: 'FFA07A' },
    'service:organizer': { color: 'FF7F50' },
    'service:streamer': { color: 'FF6347' },
    'service:explorer': { color: 'FF4500' },
    'service:scheduler': { color: 'FF8C00' },

    'nonFunctionalItem:security': { color: '6B8E23' },
    'nonFunctionalItem:performance': { color: '556B2F' },
    'nonFunctionalItem:reliability': { color: '8FBC8F' },
    'nonFunctionalItem:maintainability': { color: '2E8B57' },

    'tool:biome': { color: '4682B4' },
    'tool:github-actions': { color: '5F9EA0' },
    'tool:github-labels': { color: '6495ED' },
    'tool:typescript': { color: '7B68EE' },
    'tool:vitest': { color: '4169E1' },

    'operation:monitoring': { color: 'BDB76B' },
    'operation:logging': { color: 'DAA520' },
  },
};
