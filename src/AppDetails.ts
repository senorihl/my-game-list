export interface AppDetails {
    success: boolean
    data: Data
}

export interface Data {
    type: string
    name: string
    steam_appid: number
    required_age: number
    is_free: boolean
    dlc: number[]
    detailed_description: string
    about_the_game: string
    short_description: string
    supported_languages: string
    header_image: string
    capsule_image: string
    capsule_imagev5: string
    website: string
    pc_requirements: PcRequirements
    mac_requirements: MacRequirements
    linux_requirements: LinuxRequirements
    legal_notice: string
    drm_notice: string
    ext_user_account_notice: string
    developers: string[]
    publishers: string[]
    price_overview: PriceOverview
    packages: number[]
    package_groups: PackageGroup[]
    platforms: Platforms
    categories: Category[]
    genres: Genre[]
    screenshots: Screenshot[]
    movies: Movie[]
    recommendations: Recommendations
    achievements: Achievements
    release_date: ReleaseDate
    support_info: SupportInfo
    background: string
    background_raw: string
    content_descriptors: ContentDescriptors
    ratings: Ratings
}

export interface PcRequirements {
    minimum: string
    recommended: string
}

export interface MacRequirements {
    minimum: string
    recommended: string
}

export interface LinuxRequirements {
    minimum: string
    recommended: string
}

export interface PriceOverview {
    currency: string
    initial: number
    final: number
    discount_percent: number
    initial_formatted: string
    final_formatted: string
}

export interface PackageGroup {
    name: string
    title: string
    description: string
    selection_text: string
    save_text: string
    display_type: number
    is_recurring_subscription: string
    subs: Sub[]
}

export interface Sub {
    packageid: number
    percent_savings_text: string
    percent_savings: number
    option_text: string
    option_description: string
    can_get_free_license: string
    is_free_license: boolean
    price_in_cents_with_discount: number
}

export interface Platforms {
    windows: boolean
    mac: boolean
    linux: boolean
}

export interface Category {
    id: number
    description: string
}

export interface Genre {
    id: string
    description: string
}

export interface Screenshot {
    id: number
    path_thumbnail: string
    path_full: string
}

export interface Movie {
    id: number
    name: string
    thumbnail: string
    webm: Webm
    mp4: Mp4
    dash_av1: string
    dash_h264: string
    hls_h264: string
    highlight: boolean
}

export interface Webm {
    "480": string
    max: string
}

export interface Mp4 {
    "480": string
    max: string
}

export interface Recommendations {
    total: number
}

export interface Achievements {
    total: number
    highlighted: Highlighted[]
}

export interface Highlighted {
    name: string
    path: string
}

export interface ReleaseDate {
    coming_soon: boolean
    date: string
}

export interface SupportInfo {
    url: string
    email: string
}

export interface ContentDescriptors {
    ids: any[]
    notes: any
}

export interface Ratings {
    esrb: Esrb
    pegi: Pegi
    usk: Usk
    oflc: Oflc
    nzoflc: Nzoflc
    cero: Cero
    kgrb: Kgrb
    dejus: Dejus
    fpb: Fpb
    csrr: Csrr
    crl: Crl
}

export interface Esrb {
    rating: string
    descriptors: string
}

export interface Pegi {
    rating: string
    descriptors: string
}

export interface Usk {
    rating: string
}

export interface Oflc {
    rating: string
    descriptors: string
}

export interface Nzoflc {
    rating: string
    descriptors: string
}

export interface Cero {
    rating: string
    descriptors: string
}

export interface Kgrb {
    rating: string
    descriptors: string
}

export interface Dejus {
    rating: string
    descriptors: string
    use_age_gate: string
    required_age: string
}

export interface Fpb {
    rating: string
}

export interface Csrr {
    rating: string
    descriptors: string
}

export interface Crl {
    rating: string
}
