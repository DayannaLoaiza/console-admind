export const dynamic = "force-dynamic";
import { getTransitionLogs } from "@/lib/actions";
import { InvoicesTableSkeleton } from "@/ui/main/Skeletons";
import TableTransitionLogs from "@/ui/transitionLogs/TableTransitionLogs";
import { Suspense } from "react";

export default async function Page() {
  const logs = await getTransitionLogs();

  return (
    <section className="flex flex-col gap-6">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <TableTransitionLogs logs={logs.data ?? []} />
      </Suspense>
    </section>
  );
}
