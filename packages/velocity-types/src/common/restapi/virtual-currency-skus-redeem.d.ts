import { RestRequestData } from "../..";

interface VirtualCurrencyPrice {
    /** @description The amount of currency required */
    amount: number;
    /** @description The currency type, Currently theres only "discord_orb" */
    currency: "discord_orb";
    /** @description The exponent used to express the currency's minor units */
    currency_exponent: number;
    /** @description Per-premium-tier pricing overrides, keyed by premium type integer */
    premium: Record<string, {
        /** @description The discounted amount for this premium tier */
        amount: number;
        /** @description The discount percentage */
        percentage: number;
    }>;
}

interface VirtualCurrencySkuCollectibles {
    /** @description The collectible type identifier */
    type: number;
    item: ?string;
    category_sku_id: ?string;
    /** @description The Nitro premium type required */
    premium_type: number;
    /** @description Seconds after claiming before the item expires, or null if permanent */
    expires_seconds_after_claim: ?number;
    expires_at: ?string;
    variant: ?string;
    option_selector_display_value: ?string;
    orb_price_override: ?number;
}

interface VirtualCurrencySkuTenantMetadata {
    collectibles: VirtualCurrencySkuCollectibles;
}

interface VirtualCurrencySkuSelectedOption {
    option_name: string;
    option_value: string;
}

interface VirtualCurrencySku {
    /** @description The snowflake ID of the SKU */
    id: string;
    /** @description The SKU type (3 = consumable (?)) */
    type: number;
    /** @description The product line this SKU belongs to */
    product_line: number;
    dependent_sku_id: ?string;
    /** @description The application that owns this SKU */
    application_id: string;
    manifest_labels: ?string[];
    /** @description The access type for this SKU */
    access_type: number;
    /** @description The display name of the SKU */
    name: string;
    features: string[];
    release_date: ?string;
    premium: boolean;
    /** @description The URL slug identifier for this SKU */
    slug: string;
    flags: number;
    /** @description The short description shown in the store */
    description: string;
    show_age_gate: boolean;
    price: VirtualCurrencyPrice;
    tenant_metadata: VirtualCurrencySkuTenantMetadata;
    selected_options: VirtualCurrencySkuSelectedOption[];
    /** @description The parent product snowflake ID */
    product_id: string;
    created_at: string;
    updated_at: string;
    position: number;
    hierarchy_order: number;
}

export interface VirtualCurrencyEntitlement {
    /** @description The snowflake ID of the entitlement */
    id: string;
    /** @description The SKU this entitlement grants access to */
    sku_id: string;
    /** @description The application that owns the SKU */
    application_id: string;
    /** @description The user who owns this entitlement */
    user_id: string;
    promotion_id: ?string;
    /** @description The entitlement type (1 = purchase) */
    type: number;
    deleted: boolean;
    gift_code_flags: number;
    starts_at: ?string;
    ends_at: ?string;
    /** @description Whether the entitlement has been consumed/redeemed */
    consumed: boolean;
    sku: VirtualCurrencySku;
    /** @description How the entitlement was granted (5 = virtual currency redemption) */
    source_type: number;
}

interface VirtualCurrencySkusRedeemBody {
    /** @description The checkout session ID from the purchase flow */
    checkout_session_id?: string;
    /** @description Whether to use test mode (only set for user-installed apps) */
    test_mode?: boolean;
}

/** @description The response is an array of granted entitlements */
export type VirtualCurrencySkusRedeemGetResponse = Array<VirtualCurrencyEntitlement>;

/**
 * Allowed methods: `post`
 */
export interface VirtualCurrencySkusRedeemPayload extends RestRequestData<`/virtual-currency/skus/${string}/redeem`> {
    body?: VirtualCurrencySkusRedeemBody;
}
