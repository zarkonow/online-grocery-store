import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartItemList, onDeleteItem}) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;

    cartItemList.forEach((element) => {
      total = total + element.amount;
    });

    setSubtotal(total);
  }, [cartItemList]);

  return (
    <div>
      <div className="h-[10] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            className="flex justify-between items-center p-2 mb-5"
            key={index}
          >
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                alt={cart.name}
                width={90}
                height={90}
                className="object-contain bg-green-50"
              />
              <div>
                <h2>{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">$ {cart.amount}</h2>
              </div>
            </div>
            <TrashIcon
              onClick={() => onDeleteItem(cart.id)}
              className=" cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div>
        <div className="absolute w-[90%] bottom-6 flex flex-col">
          <h2 className="text-lg font-bold flex justify-between">
            Subtotal <span>${subtotal}</span>
          </h2>
          <Button>View Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default CartItemList;
