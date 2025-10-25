/**
 * Application configuration
 *
 * Feature flags and environment-specific settings
 */

export const config = {
  /**
   * Enable document persistence (save/load/delete features)
   * When false, the app runs in "create and print only" mode
   *
   * Set via VITE_ENABLE_DOCUMENT_PERSISTENCE environment variable
   * Defaults to false for production use
   */
  enableDocumentPersistence: import.meta.env.VITE_ENABLE_DOCUMENT_PERSISTENCE === 'true',
} as const;
