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

type AppointmentRequest = {
  treatment: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
};

export function appointmentRequestMessage({
  treatment,
  date,
  time,
  name,
  phone,
}: AppointmentRequest): string {
  const lines = [
    `Hi, I'd like to request a clinic appointment with TressMarias Aesthetic & Beauty Polyclinic.`,
    ``,
    `Treatment: ${treatment}`,
  ];
  if (date) lines.push(`Preferred date: ${date}`);
  if (time) lines.push(`Preferred time: ${time}`);
  if (name?.trim()) lines.push(`Name: ${name.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  return lines.join("\n");
}
