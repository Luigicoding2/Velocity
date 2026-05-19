import { FluxStore, Sticker } from "..";

export namespace StickersStore {
    export interface StickerPack {
        id: string;
        stickers: Sticker[];
        name: string;
        sku_id?: string;
        description?: string;
        cover_sticker_id?: string;
        banner_asset_id?: string;
    }

    export interface StickerMetadata {
        type: number;
        value: string | number;
    }
}

export class StickersStore extends FluxStore {
    get isLoaded(): boolean;
    get loadState(): number;
    getStickerMetadataArrays(): Array<Map<string, StickersStore.StickerMetadata[]>>;
    get hasLoadedStickerPacks(): boolean;
    get isFetchingStickerPacks(): boolean;
    getStickerById(stickerId: string): Sticker | undefined;
    getStickerPack(packId: string): StickersStore.StickerPack | undefined;
    getPremiumPacks(): StickersStore.StickerPack[];
    isPremiumPack(packId: string): boolean;
    getRawStickersByGuild(): Map<string, StickersStore.Sticker[]>;
    getAllGuildStickers(): Map<string, StickersStore.Sticker[]>;
    getAllPackStickers(): Map<string, StickersStore.Sticker[]>;
    getStickersByGuildId(guildId: string): StickersStore.Sticker[] | undefined;
}
