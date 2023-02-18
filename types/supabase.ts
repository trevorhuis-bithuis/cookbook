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
          is_owner: boolean
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          is_owner?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_owner?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      recipe_categories: {
        Row: {
          id: number
          name: string | null
          recipe_id: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          recipe_id?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          recipe_id?: number | null
        }
      }
      recipes: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          ingredients: string[] | null
          steps: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          ingredients?: string[] | null
          steps?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
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
      get_recipe_categories: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
