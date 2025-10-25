/**
 * Server configuration
 *
 * Feature flags and environment-specific settings
 */

export const config = {
  /**
   * Enable document persistence (save/load/delete features)
   * When false, database routes are disabled
   *
   * Set via ENABLE_DOCUMENT_PERSISTENCE environment variable
   * Defaults to false for production use
   */
  enableDocumentPersistence: process.env.ENABLE_DOCUMENT_PERSISTENCE === 'true',
} as const;
