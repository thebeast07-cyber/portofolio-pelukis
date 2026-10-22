// Validasi form inquiry. Dipakai di browser (pesan error cepat) dan di API (sumber kebenaran).
// Field mengikuti PRD dan tidak boleh ditambah: karya (otomatis), nama, email, negara, pesan (opsional).

export type InquiryType = "inquiry" | "commission";

export type InquiryInput = {
  type: InquiryType;
  artworkSlug?: string;
  name: string;
  email: string;
  country: string;
  message?: string;
  /** Honeypot anti-spam: input tersembunyi, manusia tidak mengisinya. */
  website?: string;
};

export type InquiryField = "name" | "email" | "country" | "message";
export type InquiryError = "required" | "email" | "tooLong";
export type InquiryErrors = Partial<Record<InquiryField, InquiryError>>;

const limits: Record<InquiryField, number> = { name: 120, email: 254, country: 80, message: 4000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateInquiry(raw: unknown):
  | { ok: true; data: InquiryInput }
  | { ok: false; errors: InquiryErrors } {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data: InquiryInput = {
    type: body.type === "commission" ? "commission" : "inquiry",
    artworkSlug: str(body.artworkSlug) || undefined,
    name: str(body.name),
    email: str(body.email),
    country: str(body.country),
    message: str(body.message) || undefined,
    website: str(body.website) || undefined,
  };

  const errors: InquiryErrors = {};
  for (const field of ["name", "email", "country"] as const) {
    if (!data[field]) errors[field] = "required";
  }
  if (data.email && !emailPattern.test(data.email)) errors.email = "email";
  for (const field of Object.keys(limits) as InquiryField[]) {
    if ((data[field]?.length ?? 0) > limits[field]) errors[field] = "tooLong";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
