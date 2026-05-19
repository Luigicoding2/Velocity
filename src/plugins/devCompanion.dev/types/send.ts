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

import type { ReporterData } from "@debug/reporterData";

export type OutgoingMessage = Base<DiffModule | ExtractModule | ModuleList | RawId | I18nValue | VersionResponse>;
export type FullOutgoingMessage = OutgoingMessage & Nonce;

export type Base<T> = ({
    ok: true;
} & T) | ({
    ok: false;
    data: null;
    error: string;
} & Omit<T, "data">);

export type Nonce = {
    nonce: number;
};
export type ModuleResult = {
    moduleNumber: number;
    /**
     * a list of plugins that patched this module, if it was patched, otherwise an empty array
     *
     * if the module was patched, but the returned module is the original, they array will still be empty
     *
     * if {@link ExtractModule.data|ExtractModule.data.find} is true, this will be a list of what patched the entire module (not just the part that was found)
     */
    patchedBy: string[];
};

// #region valid payloads
export type I18nValue = {
    type: "i18n";
    data: {
        value: string;
    };
};

export type Report = {
    type: "report";
    data: ReporterData;
};

export type DiffModule = {
    type: "diff";
    data: {
        source: string;
        patched: string;
    } & ModuleResult;
};

export type ExtractModule = {
    type: "extract";
    data: {
        module: string;
        /**
         * if the module is incomplete. ie: from a find
         */
        find?: boolean;
    } & ModuleResult;
};

export type ModuleList = {
    type: "moduleList";
    data: {
        modules: string[];
    };
};
/**
 * @deprecated use extractModule with usePatched instead
 */
export type RawId = {
    /**
     * @deprecated use extractModule with usePatched instead
     */
    type: "rawId";
    data: string;
};

export type VersionResponse = {
    type: "version";
    data: {
        clientVersion: readonly [number, number, number];
    };
};
// #endregion
