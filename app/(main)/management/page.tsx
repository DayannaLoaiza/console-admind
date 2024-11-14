export const dynamic = "force-dynamic";
import { getOrders } from "@/lib/actions";
import CreateOrder from "@/ui/main/CreateOrder";
import { InvoicesTableSkeleton } from "@/ui/main/Skeletons";
import TableOrder from "@/ui/main/TableOrder";
import { Suspense } from "react";

export default async function Page() {
  const orders = await getOrders();

  return (
    <main className="flex flex-col gap-6">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="text-2xl font-semibold text-black-800">Pedidos</h1>
        <CreateOrder />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <TableOrder orders={orders.data ?? []} />
      </Suspense>
    </main>
  );
}
