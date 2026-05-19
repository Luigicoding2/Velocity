export * from "./users-me-profile";
export * from "./users-me-settings";
export * from "./hypesquad-online";

import { HypeSquadOnlinePayload, UserMeProfilePayload, UserMeSettingsPayload } from "..";

export type PostPayloads = HypeSquadOnlinePayload | UserMeProfilePayload | UserMeSettingsPayload;
