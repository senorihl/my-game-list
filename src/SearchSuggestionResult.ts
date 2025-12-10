export interface SearchSuggestionsResult {
  response: Response
}

export interface Response {
    metadata: Metadata
    ids: Id[]
    store_items: StoreItem[]
}

export interface Metadata {
    total_matching_records: number
    start: number
    count: number
}

export interface Id {
    appid: number
}

export interface StoreItem {
    item_type: number
    id: number
    success: number
    visible: boolean
    name: string
    store_url_path: string
    appid: number
    type: number
    related_items?: RelatedItems
    categories: Categories
    basic_info: BasicInfo
    assets: Assets
    is_coming_soon?: boolean
    best_purchase_option?: BestPurchaseOption
    screenshots: Screenshots
    is_free?: boolean
    content_descriptorids?: number[]
    free_weekend?: FreeWeekend
    is_early_access?: boolean
}

export interface RelatedItems {
    demo_appid?: number[]
    standalone_demo_appid?: number[]
    parent_appid?: number
}

export interface Categories {
    supported_player_categoryids: number[]
    feature_categoryids: number[]
    controller_categoryids?: number[]
}

export interface BasicInfo {
    short_description: string
    publishers: Publisher[]
    developers: Developer[]
    franchises?: Franchise[]
    capsule_headline?: string
}

export interface Publisher {
    name: string
    creator_clan_account_id?: number
}

export interface Developer {
    name: string
    creator_clan_account_id?: number
}

export interface Franchise {
    name: string
    creator_clan_account_id?: number
}

export interface Assets {
    asset_url_format: string
    main_capsule: string
    small_capsule: string
    header: string
    page_background?: string
    hero_capsule: string
    hero_capsule_2x?: string
    library_capsule: string
    library_capsule_2x: string
    library_hero: string
    library_hero_2x?: string
    community_icon: string
    page_background_path: string
    raw_page_background?: string
}

export interface BestPurchaseOption {
    packageid?: number
    purchase_option_name: string
    final_price_in_cents: string
    original_price_in_cents?: string
    formatted_final_price: string
    formatted_original_price?: string
    discount_pct?: number
    active_discounts?: ActiveDiscount[]
    user_can_purchase_as_gift: boolean
    hide_discount_pct_for_compliance: boolean
    included_game_count: number
    must_purchase_as_set: boolean
    bundleid?: number
    bundle_discount_pct?: number
    price_before_bundle_discount?: string
    formatted_price_before_bundle_discount?: string
}

export interface ActiveDiscount {
    discount_amount: string
    discount_description: string
    discount_end_date: number
}

export interface Screenshots {
    all_ages_screenshots: AllAgesScreenshot[]
    mature_content_screenshots?: MatureContentScreenshot[]
}

export interface AllAgesScreenshot {
    filename: string
    ordinal: number
}

export interface MatureContentScreenshot {
    filename: string
    ordinal: number
}

export interface FreeWeekend {
    start_time: number
    end_time: number
}
