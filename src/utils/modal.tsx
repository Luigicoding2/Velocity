/*
 * Velocity, a modification for Discord's desktop app
 * Copyright (c) 2025 RoScripter999 and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { ModalTransitionState } from "@velocity-types";
import { filters, mapMangledModuleLazy } from "@webpack";
import type { ComponentType, PropsWithChildren, Ref } from "react";

import { LazyComponent } from "./react";

export const enum ModalSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    DYNAMIC = "dynamic",
}

export type ModalCloseSize =
    | "xxs"
    | "xs"
    | "sm"
    | "refresh_sm"
    | "md"
    | "lg"
    | "custom";

interface Modals {
    ModalRoot: ComponentType<PropsWithChildren<{
        transitionState: ModalTransitionState;
        size?: ModalSize;
        role?: "alertdialog" | "dialog";
        className?: string;
        fullscreenOnMobile?: boolean;
        hideShadow?: boolean;
        "aria-label"?: string;
        "aria-labelledby"?: string;
        onAnimationEnd?(): void;
        animation?: "default" | "subtle";
        returnRef?: Ref<HTMLElement>;
        parentComponent?: string;
    }>>;
    ModalHeader: ComponentType<PropsWithChildren<{
        /** FlexClasses.Justify.START */
        justify?: string;
        /** FlexClasses.Direction.HORIZONTAL */
        direction?: string;
        /** FlexClasses.Align.CENTER */
        align?: string;
        /** FlexClasses.Wrap.NO_WRAP */
        wrap?: string;
        separator?: boolean;
        id?: string;
        className?: string;
        headerId?: string;
    }>>;
    /** This also accepts Scroller props but good luck with that */
    ModalContent: ComponentType<PropsWithChildren<{
        className?: string;
        scrollerRef?: Ref<HTMLElement>;
        scrollbarType?: "auto" | "thin" | "none";
        "data-migration-pending"?: boolean;
        [prop: string]: any;
    }>>;
    ModalFooter: ComponentType<PropsWithChildren<{
        /** FlexClasses.Justify.START */
        justify?: string;
        /** FlexClasses.Direction.HORIZONTAL_REVERSE */
        direction?: string;
        /** FlexClasses.Align.STRETCH */
        align?: string;
        /** FlexClasses.Wrap.NO_WRAP */
        wrap?: string;
        separator?: boolean;
        "data-migration-pending"?: boolean;
        className?: string;
    }>>;
    ModalCloseButton: ComponentType<{
        focusProps?: any;
        onClick(): void;
        withCircleBackground?: boolean;
        hideOnFullscreen?: boolean;
        className?: string;
        innerClassName?: string;
        variant?: "default" | "icon-only";
        size?: ModalCloseSize;
        "aria-label"?: string;
        "data-migration-pending"?: boolean;
    }>;
}

/** @deprecated Migrate to new Modals */
export const Modals: Modals = mapMangledModuleLazy(".MODAL_ROOT_LEGACY,", {
    ModalRoot: filters.componentByCode("({headerId:"),
    ModalHeader: filters.componentByCode(",id:"),
    ModalContent: filters.componentByCode("scrollbarType:"),
    ModalFooter: filters.componentByCode(".HORIZONTAL_REVERSE,"),
    ModalCloseButton: filters.componentByCode(".withCircleBackground")
});

/** @deprecated Migrate to new Modals */
export const ModalRoot = LazyComponent(() => Modals.ModalRoot);
/** @deprecated Migrate to new Modals */
export const ModalHeader = LazyComponent(() => Modals.ModalHeader);
/** @deprecated Migrate to new Modals */
export const ModalContent = LazyComponent(() => Modals.ModalContent);
/** @deprecated Migrate to new Modals */
export const ModalFooter = LazyComponent(() => Modals.ModalFooter);
/** @deprecated Migrate to new Modals */
export const ModalCloseButton = LazyComponent(() => Modals.ModalCloseButton);
