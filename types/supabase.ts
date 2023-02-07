export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    auth: {
        Tables: {
            audit_log_entries: {
                Row: {
                    created_at: string | null
                    id: string
                    instance_id: string | null
                    ip_address: string
                    payload: Json | null
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    instance_id?: string | null
                    ip_address?: string
                    payload?: Json | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    instance_id?: string | null
                    ip_address?: string
                    payload?: Json | null
                }
            }
            identities: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    identity_data: Json
                    last_sign_in_at: string | null
                    provider: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id: string
                    identity_data: Json
                    last_sign_in_at?: string | null
                    provider: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    identity_data?: Json
                    last_sign_in_at?: string | null
                    provider?: string
                    updated_at?: string | null
                    user_id?: string
                }
            }
            instances: {
                Row: {
                    created_at: string | null
                    id: string
                    raw_base_config: string | null
                    updated_at: string | null
                    uuid: string | null
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    raw_base_config?: string | null
                    updated_at?: string | null
                    uuid?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    raw_base_config?: string | null
                    updated_at?: string | null
                    uuid?: string | null
                }
            }
            mfa_amr_claims: {
                Row: {
                    authentication_method: string
                    created_at: string
                    id: string
                    session_id: string
                    updated_at: string
                }
                Insert: {
                    authentication_method: string
                    created_at: string
                    id: string
                    session_id: string
                    updated_at: string
                }
                Update: {
                    authentication_method?: string
                    created_at?: string
                    id?: string
                    session_id?: string
                    updated_at?: string
                }
            }
            mfa_challenges: {
                Row: {
                    created_at: string
                    factor_id: string
                    id: string
                    ip_address: unknown
                    verified_at: string | null
                }
                Insert: {
                    created_at: string
                    factor_id: string
                    id: string
                    ip_address: unknown
                    verified_at?: string | null
                }
                Update: {
                    created_at?: string
                    factor_id?: string
                    id?: string
                    ip_address?: unknown
                    verified_at?: string | null
                }
            }
            mfa_factors: {
                Row: {
                    created_at: string
                    factor_type: Database["auth"]["Enums"]["factor_type"]
                    friendly_name: string | null
                    id: string
                    secret: string | null
                    status: Database["auth"]["Enums"]["factor_status"]
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    created_at: string
                    factor_type: Database["auth"]["Enums"]["factor_type"]
                    friendly_name?: string | null
                    id: string
                    secret?: string | null
                    status: Database["auth"]["Enums"]["factor_status"]
                    updated_at: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    factor_type?: Database["auth"]["Enums"]["factor_type"]
                    friendly_name?: string | null
                    id?: string
                    secret?: string | null
                    status?: Database["auth"]["Enums"]["factor_status"]
                    updated_at?: string
                    user_id?: string
                }
            }
            refresh_tokens: {
                Row: {
                    created_at: string | null
                    id: number
                    instance_id: string | null
                    parent: string | null
                    revoked: boolean | null
                    session_id: string | null
                    token: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: number
                    instance_id?: string | null
                    parent?: string | null
                    revoked?: boolean | null
                    session_id?: string | null
                    token?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: number
                    instance_id?: string | null
                    parent?: string | null
                    revoked?: boolean | null
                    session_id?: string | null
                    token?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
            }
            saml_providers: {
                Row: {
                    attribute_mapping: Json | null
                    created_at: string | null
                    entity_id: string
                    id: string
                    metadata_url: string | null
                    metadata_xml: string
                    sso_provider_id: string
                    updated_at: string | null
                }
                Insert: {
                    attribute_mapping?: Json | null
                    created_at?: string | null
                    entity_id: string
                    id: string
                    metadata_url?: string | null
                    metadata_xml: string
                    sso_provider_id: string
                    updated_at?: string | null
                }
                Update: {
                    attribute_mapping?: Json | null
                    created_at?: string | null
                    entity_id?: string
                    id?: string
                    metadata_url?: string | null
                    metadata_xml?: string
                    sso_provider_id?: string
                    updated_at?: string | null
                }
            }
            saml_relay_states: {
                Row: {
                    created_at: string | null
                    for_email: string | null
                    from_ip_address: unknown | null
                    id: string
                    redirect_to: string | null
                    request_id: string
                    sso_provider_id: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    for_email?: string | null
                    from_ip_address?: unknown | null
                    id: string
                    redirect_to?: string | null
                    request_id: string
                    sso_provider_id: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    for_email?: string | null
                    from_ip_address?: unknown | null
                    id?: string
                    redirect_to?: string | null
                    request_id?: string
                    sso_provider_id?: string
                    updated_at?: string | null
                }
            }
            schema_migrations: {
                Row: {
                    version: string
                }
                Insert: {
                    version: string
                }
                Update: {
                    version?: string
                }
            }
            sessions: {
                Row: {
                    aal: Database["auth"]["Enums"]["aal_level"] | null
                    created_at: string | null
                    factor_id: string | null
                    id: string
                    not_after: string | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    aal?: Database["auth"]["Enums"]["aal_level"] | null
                    created_at?: string | null
                    factor_id?: string | null
                    id: string
                    not_after?: string | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    aal?: Database["auth"]["Enums"]["aal_level"] | null
                    created_at?: string | null
                    factor_id?: string | null
                    id?: string
                    not_after?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
            }
            sso_domains: {
                Row: {
                    created_at: string | null
                    domain: string
                    id: string
                    sso_provider_id: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    domain: string
                    id: string
                    sso_provider_id: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    domain?: string
                    id?: string
                    sso_provider_id?: string
                    updated_at?: string | null
                }
            }
            sso_providers: {
                Row: {
                    created_at: string | null
                    id: string
                    resource_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    resource_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    resource_id?: string | null
                    updated_at?: string | null
                }
            }
            users: {
                Row: {
                    aud: string | null
                    banned_until: string | null
                    confirmation_sent_at: string | null
                    confirmation_token: string | null
                    confirmed_at: string | null
                    created_at: string | null
                    email: string | null
                    email_change: string | null
                    email_change_confirm_status: number | null
                    email_change_sent_at: string | null
                    email_change_token_current: string | null
                    email_change_token_new: string | null
                    email_confirmed_at: string | null
                    encrypted_password: string | null
                    id: string
                    instance_id: string | null
                    invited_at: string | null
                    is_sso_user: boolean
                    is_super_admin: boolean | null
                    last_sign_in_at: string | null
                    phone: string | null
                    phone_change: string | null
                    phone_change_sent_at: string | null
                    phone_change_token: string | null
                    phone_confirmed_at: string | null
                    raw_app_meta_data: Json | null
                    raw_user_meta_data: Json | null
                    reauthentication_sent_at: string | null
                    reauthentication_token: string | null
                    recovery_sent_at: string | null
                    recovery_token: string | null
                    role: string | null
                    updated_at: string | null
                }
                Insert: {
                    aud?: string | null
                    banned_until?: string | null
                    confirmation_sent_at?: string | null
                    confirmation_token?: string | null
                    confirmed_at?: string | null
                    created_at?: string | null
                    email?: string | null
                    email_change?: string | null
                    email_change_confirm_status?: number | null
                    email_change_sent_at?: string | null
                    email_change_token_current?: string | null
                    email_change_token_new?: string | null
                    email_confirmed_at?: string | null
                    encrypted_password?: string | null
                    id: string
                    instance_id?: string | null
                    invited_at?: string | null
                    is_sso_user?: boolean
                    is_super_admin?: boolean | null
                    last_sign_in_at?: string | null
                    phone?: string | null
                    phone_change?: string | null
                    phone_change_sent_at?: string | null
                    phone_change_token?: string | null
                    phone_confirmed_at?: string | null
                    raw_app_meta_data?: Json | null
                    raw_user_meta_data?: Json | null
                    reauthentication_sent_at?: string | null
                    reauthentication_token?: string | null
                    recovery_sent_at?: string | null
                    recovery_token?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
                Update: {
                    aud?: string | null
                    banned_until?: string | null
                    confirmation_sent_at?: string | null
                    confirmation_token?: string | null
                    confirmed_at?: string | null
                    created_at?: string | null
                    email?: string | null
                    email_change?: string | null
                    email_change_confirm_status?: number | null
                    email_change_sent_at?: string | null
                    email_change_token_current?: string | null
                    email_change_token_new?: string | null
                    email_confirmed_at?: string | null
                    encrypted_password?: string | null
                    id?: string
                    instance_id?: string | null
                    invited_at?: string | null
                    is_sso_user?: boolean
                    is_super_admin?: boolean | null
                    last_sign_in_at?: string | null
                    phone?: string | null
                    phone_change?: string | null
                    phone_change_sent_at?: string | null
                    phone_change_token?: string | null
                    phone_confirmed_at?: string | null
                    raw_app_meta_data?: Json | null
                    raw_user_meta_data?: Json | null
                    reauthentication_sent_at?: string | null
                    reauthentication_token?: string | null
                    recovery_sent_at?: string | null
                    recovery_token?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            email: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            jwt: {
                Args: Record<PropertyKey, never>
                Returns: Json
            }
            role: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uid: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
        }
        Enums: {
            aal_level: "aal1" | "aal2" | "aal3"
            factor_status: "unverified" | "verified"
            factor_type: "totp" | "webauthn"
        }
    }
    public: {
        Tables: {
            profiles: {
                Row: {
                    avatar_url: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
            }
            recipes: {
                Row: {
                    author_id: string | null
                    category: string
                    created_at: string | null
                    description: string | null
                    id: number
                    ingredients: string[] | null
                    steps: string[] | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    author_id?: string | null
                    category: string
                    created_at?: string | null
                    description?: string | null
                    id?: number
                    ingredients?: string[] | null
                    steps?: string[] | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    author_id?: string | null
                    category?: string
                    created_at?: string | null
                    description?: string | null
                    id?: number
                    ingredients?: string[] | null
                    steps?: string[] | null
                    title?: string
                    updated_at?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
