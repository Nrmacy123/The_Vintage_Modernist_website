// File: js/assets/get_device_type.js

export function getDeviceType() {
  const userAgent = navigator.userAgent;
  // ... (the rest of your getDeviceType function logic)
  if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) return 'iOS';
  if (/Mac/.test(userAgent) && !window.MSStream) return 'Mac';
  if (/Android/i.test(userAgent)) return 'Android';
  if (/Win/.test(userAgent)) return 'Windows';
  return 'Desktop';
}