"use client";

import { OrderInfo, OrderState, ProductDetail } from "@/lib/definitions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/Command";
import { updateOrderState } from "@/lib/actions";

type Status = {
  value: OrderState;
  label: string;
};

type StateTransition = {
  [key in OrderState]: {
    nextStates: OrderState[];
    actions: { label: string; value: OrderState }[];
  };
};

const stateMachine: StateTransition = {
  Pending: {
    nextStates: ["In Preparation", "In Review", "Cancelled"],
    actions: [
      { label: "Start Preparation", value: "In Preparation" },
      { label: "Review Order", value: "In Review" },
      { label: "Cancel Order", value: "Cancelled" },
    ],
  },
  "In Review": {
    nextStates: ["In Preparation", "Cancelled"],
    actions: [
      { label: "Start Preparation", value: "In Preparation" },
      { label: "Cancel Order", value: "Cancelled" },
    ],
  },
  "In Preparation": {
    nextStates: ["Shipped", "Cancelled"],
    actions: [
      { label: "Send Order", value: "Shipped" },
      { label: "Cancel Order", value: "Cancelled" },
    ],
  },
  Shipped: {
    nextStates: ["Delivered"],
    actions: [{ label: "Confirm Delivery", value: "Delivered" }],
  },
  Delivered: {
    nextStates: [],
    actions: [],
  },
  Cancelled: {
    nextStates: [],
    actions: [],
  },
};

export default function UpdateOrder({
  order,
  open,
  setOpen,
}: {
  order: OrderInfo;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const openHandler = async () => {
    setOpen((prev) => !prev);
  };

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [openState, setOpenState] = useState(false);

  const getAvailableActions = () => {
    const currentState = order.currentState as OrderState;
    const transitions = stateMachine[currentState];
    return transitions.actions.filter((action) => {
      if (
        currentState === "Pending" &&
        action.value === "In Preparation" &&
        order.amount > 1000
      ) {
        return false;
      }
      if (
        currentState === "Pending" &&
        action.value === "In Review" &&
        order.amount <= 1000
      ) {
        return false;
      }
      return true;
    });
  };

  const formHandler = async (form: FormData) => {
    if (selectedStatus) {
      await updateOrderState(
        order._id!,
        order.currentState,
        selectedStatus.value,
        selectedStatus.label
      );
    }
    setOpen(false);
    return;
  };

  return (
    <Sheet open={open} onOpenChange={openHandler}>
      <SheetContent className="overflow-y-auto h-[100%]" side={"right"}>
        <SheetHeader>
          <SheetTitle>Actualizar estado</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-gray-900">
          Haz cambios del estado de tu pedido aquí. Haz clic en Actualizar
          Estado cuando hayas terminado.
        </SheetDescription>
        <form className="flex flex-grow flex-col gap-1 mt-2">
          <div className="flex flex-row gap-2">
            <label className="text-black-800 font-medium w-1/4">Cliente:</label>
            <span className="w-3/4">{order.customer.name}</span>
          </div>
          <div className="flex flex-row gap-2">
            <label className="text-black-800 font-medium w-1/4">Email:</label>
            <span className="w-3/4">{order.customer.email}</span>
          </div>
          <div className="flex flex-row gap-2">
            <label className="text-black-800 font-medium w-1/4">Estado:</label>
            <span className="w-3/4">{order.currentState}</span>
          </div>
          <div className="p-2 border border-blue-400 rounded-lg shadow">
            {order.productDetails.map((product: ProductDetail) => (
              <div
                key={product._id}
                className="flex flex-row gap-2 border-b border-blue-200 py-1"
              >
                <label className="text-blue-400 font-medium w-1/3 text-sm break-words whitespace-normal">
                  {product.productName}
                </label>
                <span className="w-1/3 flex items-center justify-center text-sm">
                  Cantidad:{product.quantity}
                </span>
                <span className="w-1/3 flex items-center justify-center font-medium">
                  ${product.unitPrice * product.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-2 items-center justify-between mt-4">
            <span className="font-semibold text-sm text-gray-900">
              Productos ({order.productDetails.length})
            </span>
            <span className="font-semibold text-lg">
              Total: ${order.amount}
            </span>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[150px] justify-start rounded-r-none"
                >
                  {selectedStatus ? <>{selectedStatus.label}</> : <>+ Estado</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <StatusList
                  setOpen={setOpenState}
                  setSelectedStatus={setSelectedStatus}
                  availableActions={getAvailableActions()}
                />
              </PopoverContent>
            </Popover>
            <Button
              formAction={formHandler}
              disabled={!selectedStatus}
              className="rounded-l-none"
            >
              Actualizar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  availableActions,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  availableActions: { label: string; value: OrderState }[];
}) {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>Sin acciones.</CommandEmpty>
        <CommandGroup>
          {availableActions.map((action) => (
            <CommandItem
              key={action.value}
              value={action.value}
              onSelect={(value) => {
                setSelectedStatus({ label: action.label, value: action.value });
                setOpen(false);
              }}
            >
              {action.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
