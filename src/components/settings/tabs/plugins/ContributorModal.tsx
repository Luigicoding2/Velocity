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

import "./ContributorModal.css";

import { useSettings } from "@api/Settings";
import { Margins } from "@components/margins";
import { Paragraph } from "@components/Paragraph";
import { DevsById } from "@utils/constants";
import { classNameFactory } from "@utils/css";
import { fetchUserProfile, openUserProfile } from "@utils/discord";
import { classes, pluralise } from "@utils/misc";
import type { ModalPropsRender, User } from "@velocity-types";
import { Forms, Icons, Modal, openModal, showToast, Tooltip, useEffect, useMemo, UserProfileStore, useStateFromStores } from "@webpack/common";

import Plugins from "~plugins";

import { SectionHeader } from "../SectionHeader";
import { PluginCard } from "./PluginCard";

const cl = classNameFactory("vc-author-modal-");

export function openContributorModal(user: User) {
    openModal(modalProps => <ContributorModal user={user} modalProps={modalProps} />);
}

function ContributorModal({ user, modalProps }: { user: User; modalProps: ModalPropsRender; }) {
    useSettings();

    const profile = useStateFromStores([UserProfileStore], () => UserProfileStore.getUserProfile(user.id));

    useEffect(() => {
        if (!profile && !user.bot && user.id)
            fetchUserProfile(user.id);
    }, [user.id, user.bot, profile]);

    const { plugins, apiPlugins, corePlugins, hasApiPlugins, totalPlugins, totalSettings, isCore } = useMemo(() => {
        const allPlugins = Object.values(Plugins);
        const devId = DevsById[user.id];

        const pluginsByAuthor = devId
            ? allPlugins.filter(p => p.authors.includes(devId))
            : allPlugins.filter(p => p.authors.some(a => a.name === user.username));

        const apiPlugins = pluginsByAuthor.filter(p => p.name.endsWith("API"));
        const corePlugins = pluginsByAuthor.filter(p => !p.name.endsWith("API") && p.required);
        const plugins = pluginsByAuthor.filter(p => !p.name.endsWith("API") && !p.required);

        return {
            plugins,
            apiPlugins,
            corePlugins,
            hasApiPlugins: apiPlugins.length > 0,
            totalPlugins: pluginsByAuthor.length,
            totalSettings: plugins.reduce((acc, p) => acc + (p.settings ? Object.keys(p.settings.def).length : 0), 0),
            isCore: corePlugins.length > 0
        };
    }, [user.id, user.username]);

    return (
        <Modal
            {...modalProps}
            title={
                <div className={cl("header")}>
                    <div className={cl("avatar-wrap")}>
                        <img
                            className={cl("avatar")}
                            src={user.getAvatarURL(void 0, 512, true)}
                            onClick={() => openUserProfile(user.id)}
                            draggable={false}
                            alt=""
                        />
                        {isCore && (
                            <Tooltip text="Contributes to core plugins">
                                {props => (
                                    <div {...props} className={cl("core-badge")}>
                                        <Icons.StarIcon size="xs" color="currentColor" />
                                    </div>
                                )}
                            </Tooltip>
                        )}
                    </div>

                    <div className={cl("info")}>
                        <div className={cl("name-row")}>
                            <Forms.FormTitle tag="h2" className={cl("name")}>{user.username}</Forms.FormTitle>
                        </div>

                        <div className={cl("stats")}>
                            <SectionHeader
                                title={pluralise(totalPlugins, "Plugin")}
                                titleColor="text-muted"
                                titleVariant="text-sm/normal"
                                tooltip={`${pluralise(totalPlugins, "Plugin")} authored`}
                                tooltipIcon={false}
                                icon={() => <Icons.ListViewIcon size="xs" color="var(--text-muted)" />}
                                tag="p"
                            />
                            {totalSettings > 0 && (
                                <SectionHeader
                                    title={pluralise(totalSettings, "Setting")}
                                    titleColor="text-muted"
                                    titleVariant="text-sm/normal"
                                    tooltip="Total configurable settings across their plugins"
                                    tooltipIcon={false}
                                    icon={() => <Icons.SettingsIcon size="xs" color="var(--text-muted)" />}
                                    tag="p"
                                />
                            )}
                        </div>
                        {hasApiPlugins && (
                            <div className={cl("badge-section")}>
                                <SectionHeader
                                    title="API contributor"
                                    titleColor="text-muted"
                                    titleVariant="text-sm/normal"
                                    tooltip="Contributes to API plugins"
                                    tooltipIcon={false}
                                    icon={() => <Icons.WrenchIcon size="xs" color="var(--text-muted)" />}
                                    tag="p"
                                    className={cl("badge")}
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
            subtitle={
                totalPlugins > 0
                    ? <Paragraph>This person has contributed to {pluralise(totalPlugins, "plugin")}!</Paragraph>
                    : <Paragraph color="text-muted">This contributor hasn't authored any plugins.</Paragraph>
            }
        >
            {totalPlugins > 0 && <Forms.FormDivider className={classes(Margins.top8, Margins.bottom8)} />}

            <div className={cl("plugins")}>
                {corePlugins.length > 0 && (
                    <div className={cl("plugin-section")}>
                        <SectionHeader
                            title="CORE"
                            titleColor="text-muted"
                            titleVariant="text-sm/normal"
                            icon={() => <Icons.ShieldIcon size="xs" color="var(--text-muted)" />}
                            tag="p"
                        />
                        {corePlugins.map(p =>
                            <PluginCard key={p.name} plugin={p} disabled={true} onRestartNeeded={() => showToast("Restart to apply changes!")} />
                        )}
                    </div>
                )}
                {apiPlugins.length > 0 && (
                    <div className={cl("plugin-section")}>
                        <SectionHeader
                            title="API"
                            titleColor="text-muted"
                            titleVariant="text-sm/normal"
                            icon={() => <Icons.WrenchIcon size="xs" color="var(--text-muted)" />}
                            tag="p"
                        />
                        {apiPlugins.map(p =>
                            <PluginCard key={p.name} plugin={p} disabled={true} onRestartNeeded={() => showToast("Restart to apply changes!")} />
                        )}
                    </div>
                )}
                {plugins.length > 0 && (
                    <div className={cl("plugin-section")}>
                        <SectionHeader
                            title="Plugins"
                            titleColor="text-muted"
                            titleVariant="text-sm/normal"
                            icon={() => <Icons.ListViewIcon size="xs" color="var(--text-muted)" />}
                            tag="p"
                        />
                        {plugins.map(p =>
                            <PluginCard key={p.name} plugin={p} disabled={false} onRestartNeeded={() => showToast("Restart to apply changes!")} />
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
}
