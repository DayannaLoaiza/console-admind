"use client";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet";
import Plus from "@/components/svg/Plus";
import { Textarea } from "@/components/Textarea";
import { createOrder } from "@/lib/actions";
import { OrderState, ProductDetail } from "@/lib/definitions";
import { useState } from "react";

export default function CreateOrder() {
  const [products, setProducts] = useState([
    { id: 1, unitPrice: 0, quantity: 1 },
  ]);

  const [open, setOpen] = useState<boolean>(false);

  const total = products.reduce(
    (sum, product) => sum + product.unitPrice * product.quantity,
    0
  );

  const addProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, unitPrice: 0, quantity: 1 },
    ]);
  };

  const handleProductChange = (
    id: number,
    field: "unitPrice" | "quantity",
    value: string
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, [field]: value === "" ? "" : Number(value) }
          : product
      )
    );
  };

  const openHandler = async () => {
    setOpen((prev) => !prev);
    if (open) {
      setProducts([{ id: 1, unitPrice: 0, quantity: 1 }]);
    }
  };

  const formSubmitHandler = async (form: FormData) => {
    const formJson = Object.fromEntries(form);
    const customer = {
      name: formJson.name as string,
      email: formJson.email as string,
    };
    const notes = (formJson.notes as string) || "";
    const productDetails: ProductDetail[] = products.map((product) => ({
      productName: formJson[`productName_${product.id}`] as string,
      quantity: Number(formJson[`quantity_${product.id}`]),
      unitPrice: Number(formJson[`unitPrice_${product.id}`]),
    }));

    const orderInfo = {
      amount: total,
      currentState: "Pending" as OrderState,
      customer,
      productDetails,
      notes,
    };
    await createOrder(orderInfo);
    setOpen(false);
    setProducts([{ id: 1, unitPrice: 0, quantity: 1 }]);
  };

  return (
    <Sheet open={open} onOpenChange={openHandler}>
      <SheetTrigger asChild>
        <Button variant="outline">Crear Nueva Orden</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-[84%] px-10" side={"top"}>
        <SheetHeader>
          <SheetTitle>Crear Orden</SheetTitle>
        </SheetHeader>
        <form className="flex flex-grow flex-row justify-between gap-12 mt-2">
          <div className="flex flex-col gap-4 w-2/3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 justify-between pr-2">
                <SheetDescription className="text-gray-900">
                  Información de la Orden
                </SheetDescription>
                <Button
                  variant="ghost"
                  type="button"
                  className="text-blue-300 hover:text-white-900"
                  onClick={addProduct}
                >
                  <Plus className="cursor-pointer" />
                  Agregar Producto
                </Button>
              </div>
              {products.map((product) => (
                <div key={product.id} className="flex gap-8">
                  <div className="w-2/5">
                    <Input
                      label={`Nombre del Producto ${product.id}`}
                      type="text"
                      name={`productName_${product.id}`}
                      required
                    />
                  </div>
                  <div className="w-1/5">
                    <Input
                      label="Cantidad"
                      type="number"
                      name={`quantity_${product.id}`}
                      value={product.quantity}
                      min="1"
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="w-1/5">
                    <Input
                      label="Precio Unitario"
                      type="number"
                      name={`unitPrice_${product.id}`}
                      value={product.unitPrice}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "unitPrice",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <span className="font-medium text-base content-center text-black-800">
                    ${(product.unitPrice * product.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <label
                htmlFor=""
                className="text-sm border-t border-blue-200 pt-1"
              >
                Notas o Comentarios
              </label>
              <Textarea
                name="notes"
                defaultValue={""}
                rows={3}
                className="resize-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/3 p-4 rounded-lg border border-blue-100 bg-gray-100/10 shadow-sm">
            <div className="flex flex-col gap-1 border-b border-blue-200 pb-3">
              <SheetDescription className="text-gray-900">
                Información del Cliente
              </SheetDescription>
              <Input
                label="Nombre"
                type="text"
                placeholder="Nombre del cliente"
                name="name"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="@gmail.com"
                name="email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col items-end gap-1">
              <span className="font-semibold text-sm text-gray-800">
                Productos ({products.length})
              </span>
              <span className="font-semibold text-lg">Total: ${total}</span>
              <Button type="submit" formAction={formSubmitHandler}>
                Enviar Orden
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
