import { notFound } from "next/navigation";

// Tangkap URL yang tidak dikenal supaya 404 tetap dirender di dalam layout bahasa.
export default function CatchAll() {
  notFound();
}
