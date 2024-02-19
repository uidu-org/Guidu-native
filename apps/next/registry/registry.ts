import { Registry } from '../registry/schema'

const example: Registry = [
  {
    name: 'accordion-demo',
    type: 'components:example',
    registryDependencies: ['accordion'],
    files: ['src/docs/components/example/accordion-demo.tsx'],
  },
  {
    name: 'alert-demo',
    type: 'components:example',
    registryDependencies: ['alert'],
    files: ['src/docs/components/example/alert-demo.tsx'],
  },
  {
    name: 'alert-destructive',
    type: 'components:example',
    registryDependencies: ['alert'],
    files: ['src/docs/components/example/alert-destructive.tsx'],
  },
  {
    name: 'alert-dialog-demo',
    type: 'components:example',
    registryDependencies: ['alert-dialog', 'button'],
    files: ['src/docs/components/example/alert-dialog-demo.tsx'],
  },
  {
    name: 'avatar-demo',
    type: 'components:example',
    registryDependencies: ['avatar'],
    files: ['src/docs/components/example/avatar-demo.tsx'],
  },
  {
    name: 'badge-demo',
    type: 'components:example',
    registryDependencies: ['badge'],
    files: ['src/docs/components/example/badge-demo.tsx'],
  },
  {
    name: 'badge-destructive',
    type: 'components:example',
    registryDependencies: ['badge'],
    files: ['src/docs/components/example/badge-destructive.tsx'],
  },
  {
    name: 'badge-outline',
    type: 'components:example',
    registryDependencies: ['badge'],
    files: ['src/docs/components/example/badge-outline.tsx'],
  },
  {
    name: 'badge-secondary',
    type: 'components:example',
    registryDependencies: ['badge'],
    files: ['src/docs/components/example/badge-secondary.tsx'],
  },
  {
    name: 'button-demo',
    type: 'components:example',
    registryDependencies: ['button'],
    files: ['src/docs/components/example/button-demo.tsx'],
  },
  // {
  //   name: 'button-secondary',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-secondary.tsx'],
  // },
  // {
  //   name: 'button-destructive',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-destructive.tsx'],
  // },
  // {
  //   name: 'button-outline',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-outline.tsx'],
  // },
  // {
  //   name: 'button-ghost',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-ghost.tsx'],
  // },
  // {
  //   name: 'button-link',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-link.tsx'],
  // },
  // {
  //   name: 'button-with-icon',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-with-icon.tsx'],
  // },
  // {
  //   name: 'button-loading',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-loading.tsx'],
  // },
  // {
  //   name: 'button-icon',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-icon.tsx'],
  // },
  // {
  //   name: 'button-as-child',
  //   type: 'components:example',
  //   registryDependencies: ['button'],
  //   files: ['example/button-as-child.tsx'],
  // },
]

export const registry: Registry = [...example]
