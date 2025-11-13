import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { getPermitTypeById } from "@/lib/dal";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function BusinessLicenseContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;
  const permit = await getPermitTypeById(id);

  if (!permit) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BusinessLicenseForm permit={permit} />
    </main>
  );
}

export default function BusinessLicenseApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 py-8">
          <div className="h-96 bg-muted animate-pulse rounded" />
        </main>
      }
    >
      <BusinessLicenseContent paramsPromise={params} />
    </Suspense>
  );
}
