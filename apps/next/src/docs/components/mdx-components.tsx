/* eslint-disable react/display-name */
import NextImage from "next/image";

// import * as DocsComponents from "@/docs/components/utils";
import clsx from "clsx";
import Link from "next/link";
import { VirtualAnchor, virtualAnchorEncode } from "./virtual-anchor";

export interface LinkedHeadingProps {
    as: keyof JSX.IntrinsicElements;
    id?: string;
    linked?: boolean;
    children?: React.ReactNode;
    className?: string;
}

const linkedLevels: Record<string, number> = {
    h1: 0,
    h2: 1,
    h3: 2,
    h4: 3,
};

const LinkedHeading: React.FC<LinkedHeadingProps> = ({
    as,
    linked = true,
    id: idProp,
    className,
    ...props
}) => {
    const Component = as;

    const level = linkedLevels[as] || 1;

    let id = idProp || virtualAnchorEncode(props.children as string);

    return (
        <Component
            className={clsx({ "linked-heading": linked }, linked ? {} : className)}
            data-id={id}
            data-level={level}
            data-name={props.children}
            id={id}
            {...props}
        >
            {linked ? <VirtualAnchor id={id}>{props.children}</VirtualAnchor> : <>{props.children}</>}
        </Component>
    );
};

export const MDXComponents = {
    /**
     * Next.js components
     */
    NextImage,
    /**
     * Docs components
     */
    // ...DocsComponents,
    /**
     * Markdown components
     */
    // ...Icons,
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <LinkedHeading as="h1" linked={false} {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h2" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h3" {...props} />,
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h4" {...props} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-medium" {...props} />
    ),
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
    // blockquote: (props: Omit<React.HTMLAttributes<HTMLElement>, "color">) => (
    //     <DocsComponents.Blockquote {...props} />
    // ),
    Steps: ({ ...props }) => (
        <div
            className="[&>h3]:step [&>h3>a]:pt-0.5 [&>h4]:step [&>h4>a]:pt-0.5 mb-12 ml-4 relative border-l border-default-100 pl-[1.625rem] [counter-reset:step]"
            {...props}
        />
    ),
    // Block,
} as unknown as Record<string, React.ReactNode>;
