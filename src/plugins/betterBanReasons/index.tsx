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

import { definePluginSettings } from "@api/Settings";
import { Flex } from "@components/Flex";
import { Margins } from "@components/margins";
import { Paragraph } from "@components/Paragraph";
import { copyToClipboard } from "@utils/clipboard";
import { Devs } from "@utils/constants";
import { classNameFactory } from "@utils/css";
import { getIntlMessage, openUserProfile } from "@utils/discord";
import definePlugin, { OptionType } from "@utils/types";
import type { Guild, ModalPropsRender, User } from "@velocity-types";
import { Avatar, Buttons, Clickable, DateUtils, Forms, GuildActions, HelpMessage, Icons, Modal, Text, TextInput, Tooltip, useState } from "@webpack/common";

const cl = classNameFactory("vc-bbr-");

interface BanModalProps extends ModalPropsRender {
    guild: Guild;
    user: User;
    ban: { reason: string | null; };
}

function ReasonsComponent() {
    const { reasons } = settings.use(["reasons"]);

    return (
        <div>
            {reasons.map((r, i) => (
                <Flex className={Margins.bottom16} flexDirection="row" gap="0.5em" key={i}>
                    <TextInput
                        placeholder={getIntlMessage("BAN_REASON")}
                        value={r}
                        onChange={v => {
                            const list = [...reasons];
                            list[i] = v;
                            settings.store.reasons = list;
                        }}
                        trailing={{
                            type: "icon",
                            tooltip: getIntlMessage("REMOVE"),
                            disabled: reasons.length <= 1,
                            icon: () => <Icons.TrashIcon color={reasons.length <= 1 ? "var(--icon-muted)" : "var(--icon-feedback-critical)"} size="sm" />,
                            onClick: () => {
                                const list = [...reasons];
                                list.splice(i, 1);
                                settings.store.reasons = list;
                            }
                        }}
                    />
                </Flex>
            ))}

            <Buttons.Button
                text="Add Reason"
                variant="secondary"
                size="sm"
                icon={() => <Icons.PlusSmallIcon />}
                onClick={() => {
                    settings.store.reasons = [...reasons, ""];
                }}
            />
        </div>
    );
}

function BanModalComponent({ guild, user, ban, ...modalProps }: BanModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleUnban = async () => {
        setError(null);
        setLoading(true);
        try {
            await GuildActions.unbanUser(guild.id, user.id);
            modalProps.onClose();
        } catch (e: any) {
            setError(e.body?.message);
            setLoading(false);
        }
    };

    const copyUsername = () => {
        copyToClipboard(user.username);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal
            actions={[
                {
                    text: getIntlMessage("CLOSE"),
                    variant: "secondary",
                    onClick: modalProps.onClose
                },
                {
                    variant: "critical-primary",
                    text: getIntlMessage("REVOKE_BAN"),
                    icon: () => Icons.HammerIcon({ color: "currentColor", size: "refresh_sm" }),
                    onClick: handleUnban,
                    loading: loading
                }
            ]}
            actionsFullWidth={false}
            title={
                <Flex alignItems="center" gap="12px">
                    <Clickable onContextMenu={() => openUserProfile(user.id)} style={{ cursor: "pointer" }}>
                        <Avatar src={user.getAvatarURL(guild.id, 96)} size="SIZE_80" />
                    </Clickable>
                    <section className={cl("ban-user-details")}>
                        {copied ? (
                            <Tooltip text={getIntlMessage("COPIED")} color="green" forceOpen={true}>
                                {props => (
                                    <Text
                                        {...props}
                                        variant="heading-xl/semibold"
                                        onClick={copyUsername}
                                        style={{ cursor: "pointer" }}
                                    >
                                        @{user.username}
                                    </Text>
                                )}
                            </Tooltip>
                        ) : (
                            <Text
                                variant="heading-xl/semibold"
                                onClick={copyUsername}
                                style={{ cursor: "pointer" }}
                            >
                                @{user.username}
                            </Text>
                        )}
                        {user.globalName && <Text variant="text-md/normal" color="text-subtle">{user.globalName}</Text>}
                        {!user.hasUniqueUsername() && <Text variant="text-md/normal" color="text-subtle">#{user.discriminator}</Text>}
                    </section>
                </Flex>
            }
            {...modalProps}
        >
            <div>
                <Forms.FormSection tag="h4" title={getIntlMessage("BAN_REASON")}>
                    <Text selectable variant="text-sm/normal">{ban?.reason || getIntlMessage("NO_BAN_REASON")}</Text>
                </Forms.FormSection>

                <Forms.FormSection className={Margins.top16} tag="h4" title="User Info">
                    <Paragraph selectable variant="text-xs/normal" color="text-muted">User ID: {user.id}</Paragraph>
                    {user.globalName && <Paragraph selectable variant="text-xs/normal" color="text-muted">{getIntlMessage("DISPLAY_NAME")}: {user.globalName}</Paragraph>}
                    <Paragraph selectable variant="text-xs/normal" color="text-muted">{getIntlMessage("USER_PROFILE_DISCORD_MEMBER_SINCE")}: {DateUtils.calendarFormat(user.createdAt)}</Paragraph>

                    {error && <HelpMessage className={Margins.top8} messageType="danger">{error}</HelpMessage>}
                </Forms.FormSection>
            </div>
        </Modal>
    );
}

const settings = definePluginSettings({
    reasons: {
        description: "Racist, Gay etc..",
        type: OptionType.COMPONENT,
        default: [] as string[],
        component: ReasonsComponent
    },
    betterModal: {
        description: "Redesigns the user ban modal from the guild ban list",
        type: OptionType.BOOLEAN,
        default: true,
        restartNeeded: true
    },
    isOtherDefault: {
        type: OptionType.BOOLEAN,
        description: "Selects the other option by default. (Shows a text input)"
    }
});

export default definePlugin({
    name: "BetterBanReasons",
    description: "Create custom reasons to use in the Discord ban modal, and/or show a text input by default instead of the options.",
    authors: [Devs.RoScripter999],
    searchTerms: ["BetterGuildBans"],
    tags: ["Utility", "Servers", "Organisation"],
    settings,

    patches: [
        {
            find: "#{intl::FORM_LABEL_REASON_BAN}",
            lazy: true,
            replacement: [
                {
                    match: /\[({name:.+?,value:.+?},){2}{name:.+?,value:"other"}\]/,
                    replace: "$self.getReasons($1)"
                },
                {
                    match: /(?:\w+\.)?useState\(""\)(?=.{0,200}isArchivedThread)/,
                    replace: "useState($self.getDefaultState())"
                }
            ]
        },
        {
            find: "#{intl::REVOKE_BAN})",
            lazy: true,
            replacement: {
                match: /return\(0,(\w+)\.jsx\)\((\w+)\.Modal,/,
                replace: "return(0,$1.jsx)($self.renderBanModal,{...arguments[0]},"
            },
            predicate: () => settings.store.betterModal
        }
    ],

    renderBanModal(props: BanModalProps) {
        return <BanModalComponent {...props} />;
    },

    getReasons() {
        const storedReasons = settings.store.reasons.filter((r: string) => r.trim());
        const reasons: string[] = storedReasons.length
            ? storedReasons
            : [
                getIntlMessage("BAN_REASON_OPTION_SPAM_ACCOUNT"),
                getIntlMessage("BAN_REASON_OPTION_HACKED_ACCOUNT"),
                getIntlMessage("BAN_REASON_OPTION_BREAKING_RULES")
            ];
        return reasons.map(s => ({ name: s, value: s })).concat({ name: getIntlMessage("BAN_REASON_OPTION_OTHER"), value: "other" });
    },

    getDefaultState: () => settings.store.isOtherDefault ? "other" : ""
});
