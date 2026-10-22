import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

// Sementara. Diisi di langkah 4.
export default function HomePage({ params }: { params: { locale: Locale } }) {
  return <div className="page py-24">{t(params.locale).nav.work}</div>;
}
