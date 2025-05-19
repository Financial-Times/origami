// Type definitions for o-comments

/**
 * Options that can be passed when running the auth script
 */
export interface AuthOptions {
/**
   * URL of the comments API. Defaults to 'https://comments-api.ft.com'
   */
  commentsAPIUrl?: string;
  
  /**
   * Custom URL for authentication. Defaults to '/user/auth'
   */
  commentsAuthUrl?: string;
  
  /**
   * Whether to allow only subscribers to comment
   */
  onlySubscribers?: boolean;
  
  /**
   * Display name to use for the user
   */
  displayName?: string;
  
  /**
   * Whether to use the Coral staging environment
   */
  useStagingEnvironment?: boolean;
}

/**
 * Options that can be passed when initializing the o-comments component
 */
export interface CommentsOptions extends AuthOptions {
  /**
   * Article identifier. Required.
   */
  articleId: string;
  
  /**
   * URL of the article. Required.
   */
  articleUrl: string;
  
  /**
   * Title of the article. Required.
   */
  title: string;
  
  /**
   * Additional class name to add to the comments container created by Coral's script
   */
  addClass?: string;
  
  /**
   * Selector for the scrollable container
   */
  scrollContainer?: string;
  
  /**
   * Type of asset (e.g., "article", "video", etc.)
   */
  assetType?: string;
  
  /**
   * Whether to disable o-tracking integration
   */
  disableOTracking?: boolean;
  
  /**
   * Additional options that may be passed to the component
   */
  [key: string]: unknown;
}

/**
 * Options that can be passed when fetching the comment count
 */
export interface CountOptions {
    /**
     * Article identifier
     */
    articleId: string;

    /**
     * URL of the comments API. Defaults to 'https://comments-api.ft.com'
     */
    commentsAPIUrl?: string;

    /**
     * Whether to use the Coral staging environment
     */
    useStagingEnvironment?: boolean;
    
    /**
     * Additional options for count fetching
     */
    [key: string]: unknown;
}

/**
 * Authentication response object
 */
export interface AuthResponse {
  /**
   * Whether the user has a valid session
   */
  userHasValidSession?: boolean;
  
  /**
   * Whether the user is subscribed
   */
  isSubscribed?: boolean;
  
  /**
   * Whether the user is on a trial
   */
  isTrialist?: boolean;
  
  /**
   * Whether the user is registered only
   */
  isRegistered?: boolean;

  /**
   * JWT token (can be empty string if none exists)
   */
  token: string;
  /**
   * User's display name (can be empty string if none exists)
   */
  displayName : string;

  /**
   * Additional properties that may be in the response
   */
  [key: string]: unknown;
}

/**
 * Authentication utilities
 */
export interface Auth {
  /**
   * Fetches a JWT token for the current user
   * 
   * @param options - Options for the JWT fetch
   * @returns A promise that resolves to the auth response
   */
    fetchJsonWebToken(options?: AuthOptions): Promise<AuthResponse>;
}

/**
 * Comments component main class
 */
export default class Comments {
  
  /**
   * Create a new Comments instance
   * 
   * @param rootEl - Element to initialize the comments in
   * @param opts - Options for configuring the component
   */
  constructor(rootEl: HTMLElement, opts?: CommentsOptions);

  /**
   * Get the comment count for a specific article
   * 
   * @param id - Article ID to fetch the count for
   * @param options - Options for the count fetch
   * @returns Promise resolving to the count
   */
  static getCount(id: string, options?: CountOptions): Promise<number>;
  
  /**
   * Initialize the component
   * 
   * @param rootEl - The root element to initialize the component in, or a CSS selector for the root element
   * @param opts - An options object for configuring the component
   * @returns Comments instance(s)
   */
  static init(rootEl?: HTMLElement | string, opts?: CommentsOptions): Comments | Comments[];
}

/**
 * Authentication utility
 */
export const auth: Auth;
