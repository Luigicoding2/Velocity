import { DiscordLocale, RestRequestData, Status, Theme } from "../..";
import { StickerAnimationSetting, StickerFormatType } from "../../../enums";

/** Interface for the Custom Status  */
interface CustomStatus {
    text?: string;
    /** Must provide a native unicode emoji (✈️). If provided a text like "skull" will fallback to null */
    emoji_name?: string;
    emoji_id?: string;
    expires_at?: string;
}

interface UserSettingsBody {
    /** @description The overall presence status of the user, synced across clients (online, idle, dnd, invisible) */
    status?: Status;

    /**
     * @description Custom status shown on the user's profile.
     * If this field is empty, Discord removes the custom status.
     */
    custom_status?: CustomStatus;

    /**
     * @description The UI color theme of the Discord client
     * @see {@link Theme}
     */
    theme?: Theme;

    /**
     * @description The language the Discord UI is displayed in, as an ISO 639-1 region code
     * @default "en-US"
     */
    locale?: DiscordLocale;

    // Server Organization
    /** @description Guild folders shown in the sidebar. If id is null and guild_ids has one element, it represents a single guild's position rather than a folder */
    guild_folders?: Array<{
        guild_ids: string[];
        id: number | null;
        name: string | null;
        color: number | null;
    }>;

    /** @description IDs of guilds you will not receive DMs from */
    restricted_guilds?: string[];

    /** @description Whether to automatically disable DMs from members of new guilds you join */
    default_guilds_restricted?: boolean;

    /** @description Whether GIFs are automatically played when the Discord client is in focus */
    gif_auto_play?: boolean;

    /** @description Whether animated emoji play in chat */
    animate_emoji?: boolean;

    /**
     * @description Controls when stickers animate in chat
     * @see {@link StickerAnimationSetting}
     */
    animate_stickers?: StickerAnimationSetting;

    /** @description Whether to display attachments inline when they are uploaded in chat */
    inline_attachment_media?: boolean;

    /** @description Whether to display videos and images from links posted in chat */
    inline_embed_media?: boolean;

    /** @description Whether to render message embeds (link preview cards) */
    render_embeds?: boolean;

    /** @description Whether to render emoji reactions below messages */
    render_reactions?: boolean;

    /** @description Whether to use compact display mode on messages */
    message_display_compact?: boolean;

    /** @description Whether to convert emoticons like :) into emoji automatically */
    convert_emoticons?: boolean;

    /**
     * @description Explicit content filter applied to all direct messages
     * - 0: Off
     * - 1: Filter from non-friends
     * - 2: Filter from everyone
     */
    explicit_content_filter?: number;

    /** @description Whether to show NSFW guilds on iOS (has no effect on desktop) */
    view_nsfw_guilds?: boolean;

    /** @description Whether NSFW application slash commands are shown in DMs */
    view_nsfw_commands?: boolean;

    /** @description Bitmask of friend discovery options (e.g. allow finding via phone contacts or linked accounts) */
    friend_discovery_flags?: number;

    /** @description Whether developer mode is enabled, which adds "Copy ID" to right-click context menus */
    developer_mode?: boolean;

    /** @description Controls profile visibility (undocumented enum, behavior may vary) */
    profile_visibility?: number;

    /** @description Whether your currently active game or app is shown in your presence status, GameActivityToggle plugin can do this */
    show_current_game?: boolean;

    /** @description Whether Discord automatically detects accounts from services like Steam and Blizzard on client launch */
    detect_platform_accounts?: boolean;

    /** @description Duration in seconds of inactivity before the client marks you as AFK or idle */
    afk_timeout?: number;

    /** @description Your timezone offset from UTC in minutes, used for features like scheduled events */
    timezone_offset?: number;
}

export interface UserMeSettingsGetResponse {
    /** @description The language the Discord UI is displayed in, as an ISO 639-1 region code */
    locale: DiscordLocale;
    /** @description The UI color theme of the Discord client */
    theme: Theme;
    /** @description The overall presence status of the user, synced across clients */
    status: Status;
    /** @description The user's currently active custom status, or null if none is set */
    custom_status: ?{
        /** @description The custom status text */
        text: ?string;
        /** @description ISO8601 timestamp when the status expires, or null if it does not expire */
        expires_at: ?string;
        /** @description The snowflake ID of the custom emoji used in the status */
        emoji_id: ?string;
        /** @description The unicode or custom emoji name used in the status */
        emoji_name: ?string;
    };

    // Privacy & visibility
    /** @description Whether your currently active game or app is shown in your presence status */
    show_current_game: boolean;
    /** @description Whether Discord automatically detects accounts from services like Steam and Blizzard on client launch */
    detect_platform_accounts: boolean;
    /** @description Whether phone contact syncing is enabled */
    contact_sync_enabled: boolean;
    /** @description Whether native phone integration is enabled on mobile */
    native_phone_integration_enabled: boolean;
    /** @description Whether Discord is allowed to detect accessibility tools running on the device */
    allow_accessibility_detection: boolean;
    /** @description Whether the account uses passwordless (passkey) login */
    passwordless: boolean;
    /** @description Whether developer mode is enabled, which adds "Copy ID" to users context menus */
    developer_mode: boolean;
    /** @description Controls profile visibility (undocumented enum, behavior may vary) */
    profile_visibility: any;
    /** @description Whether NSFW guilds are shown on iOS */
    view_nsfw_guilds: boolean;
    /** @description Whether NSFW application slash commands are shown in DMs */
    view_nsfw_commands: boolean;

    // Messaging
    /** @description Whether attachments are displayed inline when uploaded in chat */
    inline_attachment_media: boolean;
    /** @description Whether videos and images from links posted in chat are displayed inline */
    inline_embed_media: boolean;
    /** @description Whether GIFs are automatically played when the Discord client is in focus */
    gif_auto_play: boolean;
    /** @description Whether message embeds (link preview cards) are rendered */
    render_embeds: boolean;
    /** @description Whether emoji reactions are rendered below messages */
    render_reactions: boolean;
    /** @description Whether animated emoji play in chat */
    animate_emoji: boolean;
    /** @description Controls when stickers animate in chat */
    animate_stickers: StickerAnimationSetting;
    /** @description Whether the /tts command is enabled */
    enable_tts_command: boolean;
    /** @description Whether compact display mode is used for messages */
    message_display_compact: boolean;
    /** @description Whether emoticons like :) are automatically converted to emoji */
    convert_emoticons: boolean;
    /**
     * @description Explicit content filter applied to direct messages
     * - 0: Off
     * - 1: Filter from non-friends
     * - 2: Filter from everyone
     */
    explicit_content_filter: number;

    // Activity & presence
    /** @description Whether stream notifications from followed users are shown */
    stream_notifications_enabled: boolean;
    /** @description Whether the games/activity tab is hidden in the Discord client */
    disable_games_tab: boolean;
    /** @description Whether friends can join your activity */
    allow_activity_party_privacy_friends: boolean;
    /** @description Whether users in the same voice channel can join your activity */
    allow_activity_party_privacy_voice_channel: boolean;
    /** @description IDs of guilds where activity status is restricted */
    activity_restricted_guild_ids: string[];
    /** @description IDs of guilds where joining your activity via invite is restricted */
    activity_joining_restricted_guild_ids: string[];
    /** @description Controls whether in-game DMs are received via the Slayer SDK */
    slayer_sdk_receive_dms_in_game: number;

    // Server & friend organization
    /** @description IDs of guilds you will not receive DMs from */
    restricted_guilds: string[];
    /** @description Whether to automatically disable DMs from members of new guilds you join */
    default_guilds_restricted: boolean;
    /** @description Guild folders shown in the sidebar. If id is null and guild_ids has one element, it represents a single guild's position rather than a folder */
    guild_folders: Array<{
        guild_ids: string[];
        id: ?number;
        name: ?string;
        color: ?number;
    }>;
    /** @description Bitmask of friend discovery options (e.g. allow finding via phone contacts or linked accounts) */
    friend_discovery_flags: number;
    /** @description Controls which sources other users can use to send you friend requests */
    friend_source_flags: {
        /** @description Allow friend requests from anyone */
        all?: boolean;
        /** @description Allow friend requests from mutual friends */
        mutual_friends?: boolean;
        /** @description Allow friend requests from members of mutual guilds */
        mutual_guilds?: boolean;
    };

    /** @description Duration in seconds of inactivity before the client marks you as AFK */
    afk_timeout: number;
    /** @description Your timezone offset from UTC in minutes */
    timezone_offset: number;
    /** @description Your IANA timezone name, or null if not set */
    timezone_name: ?string;
    /** @description Per-application settings keyed by application ID */
    application_settings: Record<string, any>;
}

/**
 * Allowed methods: `get`, `patch`
 */
export interface UserMeSettingsPayload extends RestRequestData<"/users/@me/settings"> {
    body: UserSettingsBody;
}
