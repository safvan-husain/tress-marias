export const WHATSAPP_NUMBER = "971566472317";

export function bookingMessage(serviceName?: string): string {
  if (serviceName) {
    return `Hi, I'd like to book: ${serviceName} with Tres Marias Beauty & Wellness.`;
  }
  return "Hi, I'd like to book a service with Tres Marias Beauty & Wellness.";
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
