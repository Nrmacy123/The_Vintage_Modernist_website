// File: js/assets/maps.js

// Import the utility function
import { getDeviceType } from './get_device_type.js';

/**
 * Opens the native map app on Apple devices or Google Maps on others.
 * @param {string} address - The destination address.
 */
export function openMapsForDevice(address) {
  const device = getDeviceType();
  const encodedAddress = encodeURIComponent(address);

  // If the device is an iPhone or a Mac, use Apple Maps.
  if (device === 'iOS' || device === 'Mac') {
    window.location.href = `maps://?q=${encodedAddress}`;
  } else {
    // For Android, Windows, Linux, etc., default to Google Maps in a browser.
    window.location.href = `https://maps.google.com/maps?q=${encodedAddress}`;
  }
}