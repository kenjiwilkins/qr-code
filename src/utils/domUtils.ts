/**
 * DOM utility functions
 */

/**
 * Triggers file input click
 */
export function triggerFileInput(inputId: string): void {
  const input = document.getElementById(inputId)
  input?.click()
}

/**
 * Opens URL in new tab
 */
export function openInNewTab(url: string): void {
  window.open(url, '_blank')
}

/**
 * Shows alert message (can be replaced with toast in future)
 */
export function showAlert(message: string): void {
  alert(message)
}