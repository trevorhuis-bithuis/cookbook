export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
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
                    categories: string[] | null
                    created_at: string | null
                    description: string | null
                    id: number
                    ingredients: string[] | null
                    steps: string[] | null
                    title: string
                    updated_at: string | null
                    image_url: string | null
                }
                Insert: {
                    author_id?: string | null
                    categories: string[] | null
                    created_at?: string | null
                    description?: string | null
                    id?: number
                    ingredients?: string[] | null
                    steps?: string[] | null
                    title: string
                    updated_at?: string | null
                    image_url: string | null
                }
                Update: {
                    author_id?: string | null
                    categories: string[] | null
                    created_at?: string | null
                    description?: string | null
                    id?: number
                    ingredients?: string[] | null
                    steps?: string[] | null
                    title?: string
                    updated_at?: string | null
                    image_url: string | null
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
