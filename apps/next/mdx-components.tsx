import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Tabs, Tab, Steps, Step,
    ...defaultComponents,
    ...components,
  };
}
