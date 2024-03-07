export type IHookStateInitialSetter<S> = () => S;
export type IHookStateInitAction<S> = S | IHookStateInitialSetter<S>;
export type IHookStateSetter<S> = ((prevState: S) => S) | (() => S);
export type IHookStateSetAction<S> = S | IHookStateSetter<S>;
export type IHookStateResolvable<S> = S | IHookStateInitialSetter<S> | IHookStateSetter<S>;
export declare function resolveHookState<S>(nextState: IHookStateInitAction<S>): S;
export declare function resolveHookState<S, C extends S>(nextState: IHookStateSetAction<S>, currentState?: C): S;
export declare function resolveHookState<S, C extends S>(nextState: IHookStateResolvable<S>, currentState?: C): S;
//# sourceMappingURL=hookState.d.ts.map