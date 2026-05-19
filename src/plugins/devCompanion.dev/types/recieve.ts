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

// should be the same types as ./server/types/send.ts in the companion
export type SearchData =
    | {
        extractType: "id";
        idOrSearch: number;
    }
    | (
        | {
            extractType: "search";
            /**
             * stringified regex
             */
            idOrSearch: string;
            findType: "regex";
        }
        | {
            extractType: "search";
            idOrSearch: string;
            findType: "string";
        }
    );

export type FindOrSearchData =
    | (SearchData & {
        usePatched: boolean | null;
    })
    | ({
        extractType: "find";
    } & _PrefixKeys<_CapitalizeKeys<FindData>, "find">);

export type AnyFindType =
    `find${"Component" | "ByProps" | "CssClasses" | "Store" | "ByCode" | "ModuleId" | "ComponentByCode" | ""}${"Lazy" | ""}`;

export type StringNode = {
    type: "string";
    value: string;
};

export type RegexNode = {
    type: "regex";
    value: {
        pattern: string;
        flags: string;
    };
};

export type FunctionNode = {
    type: "function";
    value: string;
};

export type FindNode = StringNode | RegexNode | FunctionNode;

export type FindData = {
    type: AnyFindType;
    args: FindNode[];
};

export type IncomingMessage = DisablePlugin | RawId | DiffPatch | Reload | ExtractModule | TestPatch | TestFind | AllModules | I18nLookup | Version;
export type FullIncomingMessage = IncomingMessage & { nonce: number; };

export type DisablePlugin = {
    type: "disable";
    data: {
        enabled: boolean;
        pluginName: string;
    };
};

export type I18nLookup = {
    type: "i18n";
    data: {
        hashedKey: string;
    };
};

/**
 * @deprecated use {@link ExtractModule} instead
 */
export type RawId = {
    /**
     * @deprecated use {@link ExtractModule} instead
     */
    type: "rawId";
    data: {
        id: number;
    };
};

export type DiffPatch = {
    type: "diff";
    data: SearchData;
};

export type Reload = {
    type: "reload";
    data: null;
};

export type ExtractModule = {
    type: "extract";
    // FIXME: update client code so you can just pass FindData here
    data: FindOrSearchData;
};

export type Version = {
    type: "version";
    data: {
        // major minor patch
        server_version: [number, number, number];
    };
};

export type TestPatch = {
    type: "testPatch";
    data: (
        | {
            findType: "string";
            find: string;
        }
        | {
            findType: "regex";
            /**
             * stringified regex
             */
            find: string;
        }
    ) & {
        replacement: {
            match: StringNode | RegexNode;
            replace: StringNode | RegexNode;
        }[];
    };
};

export type TestFind = {
    type: "testFind";
    data: FindData;
};

export type AllModules = {
    type: "allModules";
    data: null;
};

type _PrefixKeys<
    T extends Record<string, any>,
    P extends string,
> = string extends P
    ? never
    : {
        [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
    };

type _CapitalizeKeys<T extends Record<string, any>> = {
    [K in keyof T as K extends string ? Capitalize<K> : never]: T[K];
};
