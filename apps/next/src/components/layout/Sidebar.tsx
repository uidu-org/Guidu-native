"use client";

import { useFocusRing } from "@react-aria/focus";
import { usePress } from "@react-aria/interactions";
import { useSelectableCollection } from "@react-aria/selection";
import { Item as BaseItem } from "@react-stately/collections";
import { TreeCollection, TreeState, useTreeState } from "@react-stately/tree";
import { CollectionBase, Expandable, ItemProps, MultipleSelection, Node } from "@react-types/shared";
import { isEmpty } from "lodash";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, Key, useMemo, useRef } from "react";

import { getRoutePaths } from "@/utils/sidebarRoutes";
import { ScrollArea } from "@uidu/scroll-area-ui";
import clsx from "clsx";
import { ChevronUpIcon } from "lucide-react";


export interface Route {
    key?: string;
    title?: string;
    subtitle?: string;
    section?: string;
    heading?: boolean;
    keywords?: string;
    iconSrc?: string;
    defaultOpen?: boolean;
    path?: string;
    routes?: Route[];
    updated?: boolean;
    newPost?: boolean;
    comingSoon?: boolean;
}

type Booleanish = boolean | "true" | "false";
export const dataAttr = (condition: boolean | undefined) =>
    (condition ? "true" : undefined) as Booleanish;

export interface Props<T> extends Omit<ItemProps<T>, "title">, Route {
    slug?: string;
    tag?: string;
}

export type BaseItemProps<T extends object> = Props<T>;

const Item = BaseItem as <T extends object>(props: BaseItemProps<T>) => JSX.Element;

/**
 * @internal
 */
interface TreeItemProps<T> {
    item: Node<T>;
    state: TreeState<T>;
    level?: number;
    spaceLeft?: any;
}

const spacesByLevel = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
};

function TreeItem<T>(props: TreeItemProps<T>) {
    const { item, state, level = 1, spaceLeft = 0, } = props;
    const { key, rendered, childNodes } = item;

    const paths = item.props.path
        ? getRoutePaths(item.props.path, item.props?.tag)
        : {
            pagePath: "",
            pathname: "",
        };

    const router = useRouter();
    const pathname = usePathname();


    const isNew = item.props?.newPost;
    const isUpdated = item.props?.updated;

    const isExpanded = state.expandedKeys.has(key);

    const ref = useRef<any>(null);

    const hasChildNodes = !isEmpty([...childNodes]);

    const Component = hasChildNodes ? "ul" : "li";

    const { pressProps } = usePress({
        onPress: () => {
            if (hasChildNodes) {
                state.toggleKey(item.key);
            } else {
                // router.push(paths.pathname);
            }
        },
    });

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();

    return (
        <Component
            {...focusProps}
            ref={ref}
            aria-expanded={dataAttr(hasChildNodes ? isExpanded : undefined)}
            //   aria-selected={dataAttr(isSelected)}
            className={clsx(
                "flex flex-col gap-3outline-none w-full tap-highlight-transparent",

                hasChildNodes ? "mb-4" : "first:mt-4",
                // focus ring
                // ...dataFocusVisibleClasses,
            )}
            data-focus-visible={isFocusVisible}
            data-focused={isFocused}
            role="treeitem"
        >
            <div className="flex items-center gap-3 cursor-pointer" {...pressProps}>
                {/* <Spacer x={spaceLeft} /> */}
                {hasChildNodes ? (
                    <span className="flex items-center gap-3">
                        <span>{rendered}</span>
                        <ChevronUpIcon
                            className={clsx("transition-transform", {
                                "-rotate-90": isExpanded,
                            })}
                        />
                    </span>
                ) : (
                    <Link
                        className={clsx(
                            "w-full",
                            "font-normal",
                            "before:mr-4",
                            "before:content-['']",
                            "before:block",
                            "before:bg-default-300",
                            "before:w-1",
                            "before:h-1",
                            "before:rounded-full",
                        )}
                        color="foreground"
                        href={paths.pathname}
                    >
                        <span
                            className={clsx(
                            )}
                        >
                            {rendered}
                        </span>
                        {isUpdated && (
                            <span
                                className="ml-1 py-1 text-tiny text-default-400 bg-default-100/50"

                            >
                                Updated
                            </span>
                        )}
                        {isNew && (
                            <span className="ml-1 py-1 text-tiny" >
                                New
                            </span>
                        )}
                        {item.props?.comingSoon && (
                            <span className="ml-1 py-1 text-tiny">
                                Coming soon
                            </span>
                        )}
                    </Link>
                )}
                {/* Workaround to avoid scrollbar overlapping */}

            </div>
            {isExpanded && hasChildNodes && (
                <div className="flex flex-col gap-3 items-start" role="group">
                    {[...childNodes].map((item) => {
                        return (
                            <TreeItem
                                key={item.key}
                                item={item}
                                level={level + 1}
                                spaceLeft={spacesByLevel[level] ?? 0}
                                state={state}
                                {...item.props}
                            />
                        );
                    })}
                </div>
            )}
        </Component>
    );
}

function TreeHeading({ item }: { item: any }) {
    return <div>{item.rendered}</div>;
}

function Tree<T extends object>(props: CollectionBase<T> & Expandable & MultipleSelection) {
    let state = useTreeState(props);

    let ref = useRef<HTMLDivElement>(null);

    let keyboardDelegate = useMemo(
        // @ts-expect-error
        () => new TreeKeyboardDelegate(state.collection, state.disabledKeys),
        [state.collection, state.disabledKeys],
    );

    let { collectionProps } = useSelectableCollection({
        ref,
        selectionManager: state.selectionManager,
        keyboardDelegate,
    });

    return (
        <ScrollArea
            ref={ref}
            className="h-full lg:max-h-[calc(100vh_-_64px)]"
            role="tree"
            {...collectionProps}
        >
            {[...state.collection].map((item) => {
                if (item.type === "section") {
                    return <TreeHeading key={item.key} item={item} />;
                }

                return <TreeItem key={item.key} item={item} state={state} />;
            })}
        </ScrollArea>
    );
}

export interface DocsSidebarProps {
    routes?: Route[];
    tag?: string;
    slug?: string;
    className?: string;
}

export const DocsSidebar: FC<DocsSidebarProps> = ({ routes, slug, tag, className }) => {
    const expandedKeys = routes?.reduce((keys, route) => {
        if (route.defaultOpen) {
            keys.push(route.key as string);
        }

        return keys;
    }, [] as string[]);

    return (
        <div className={clsx("lg:fixed lg:top-20 mt-2 z-0 lg:h-[calc(100vh-121px)]", className)}>
            <Tree defaultExpandedKeys={expandedKeys} items={routes || []}>
                {(route) => (
                    <Item
                        childItems={route.routes}
                        slug={slug}
                        tag={tag}
                        {...route}
                        key={route.key || route.title}
                    >
                        {route.title}
                    </Item>
                )}
            </Tree>
        </div>
    );
};
export class TreeKeyboardDelegate<T> {
    collator: Intl.Collator;
    collection: TreeCollection<T>;
    disabledKeys: Set<Key>;

    constructor(collection: TreeCollection<T>, disabledKeys: Set<Key>) {
        this.collator = new Intl.Collator("en");
        this.collection = collection;
        this.disabledKeys = disabledKeys;
    }

    getKeyAbove(key: Key) {
        let { collection, disabledKeys } = this;
        let keyBefore = collection.getKeyBefore(key);

        while (keyBefore !== null) {
            let item = collection.getItem(keyBefore);

            if (item?.type === "item" && !disabledKeys.has(item.key)) {
                return keyBefore;
            }

            keyBefore = collection.getKeyBefore(keyBefore);
        }

        return null;
    }

    getKeyBelow(key: Key) {
        let { collection, disabledKeys } = this;
        let keyBelow = collection.getKeyAfter(key);

        while (keyBelow !== null) {
            let item = collection.getItem(keyBelow);

            if (item?.type === "item" && !disabledKeys.has(item.key)) {
                return keyBelow;
            }

            keyBelow = collection.getKeyAfter(keyBelow);
        }

        return null;
    }

    getFirstKey() {
        let { collection, disabledKeys } = this;
        let key = collection.getFirstKey();

        while (key !== null) {
            let item = collection.getItem(key);

            if (item?.type === "item" && !disabledKeys.has(item.key)) {
                return key;
            }

            key = collection.getKeyAfter(key);
        }

        return null;
    }

    getLastKey() {
        let { collection, disabledKeys } = this;
        let key = collection.getLastKey();

        while (key !== null) {
            let item = collection.getItem(key);

            if (item?.type === "item" && !disabledKeys.has(item.key)) {
                return key;
            }

            key = collection.getKeyBefore(key);
        }

        return null;
    }

    getKeyForSearch(search: string, fromKey = this.getFirstKey()) {
        let { collator, collection } = this;
        let key = fromKey;

        while (key !== null) {
            let item = collection.getItem(key);

            if (
                item?.textValue &&
                collator.compare(search, item.textValue.slice(0, search.length)) === 0
            ) {
                return key;
            }

            key = this.getKeyBelow(key);
        }

        return null;
    }
}
