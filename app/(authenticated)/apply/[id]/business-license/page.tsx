import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { getPermitTypeById } from "@/lib/dal";
import { notFound } from "next/navigation";

export default async function BusinessLicenseApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
