import { FC, PropsWithChildren } from 'react';

export type Props = {};
export type Nullable<T> = T | null;
export type Optional<T> = T | null | undefined;

export type ReactFC<T extends Props = {}> = FC<PropsWithChildren<T>>;
