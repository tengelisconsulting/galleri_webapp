/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

export namespace OpenAPI2 {
  export interface user_image_thumb {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    image_id?: string;
    created?: string;
    /**
     * Note:
     * This is a Foreign Key to `ac_user.user_id`.<fk table='ac_user' column='user_id'/>
     */
    user_id?: string;
    thumb?: string;
  }
  export interface user_image_collection {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    collection_id?: string;
    collection_name?: string;
    created?: string;
    /**
     * Note:
     * This is a Foreign Key to `ac_user.user_id`.<fk table='ac_user' column='user_id'/>
     */
    user_id?: string;
  }
  export interface user_image {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    image_id?: string;
    ordinal?: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    collection_id?: string;
    created?: string;
    /**
     * Note:
     * This is a Foreign Key to `ac_user.user_id`.<fk table='ac_user' column='user_id'/>
     */
    user_id?: string;
    href?: string;
    description?: string;
  }
  export interface user_collection_thumb {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    collection_id?: string;
    collection_name?: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    image_id?: string;
    thumb?: string;
  }
}
