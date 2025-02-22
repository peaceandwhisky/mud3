import { AccountButton } from "@latticexyz/entrykit/internal";
import { useMemo, useState } from "react";
import { useWorldContract } from "./mud/useWorldContract";
import { useSync } from "@latticexyz/store-sync/react";

export function App() {

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);



  const sync = useSync();
  const worldContract = useWorldContract();

    const handlePlaceOrder = useMemo(
    () =>
      sync.data && worldContract
        ? async () => {
            try {
              if (amount !== undefined && price !== undefined) {
                const tx = await worldContract.write.app__placeOrder([
                  "0x17E42453D681E11a3bB3a9dcA6faF5dE0eF72624",
                  "0xb7427086524627fa8AdF96A04aCF5e3281A929C5",
                  BigInt(amount),
                  BigInt(price)
                ]);
                await sync.data.waitForTransaction(tx);
                console.log("Order placed successfully");
              } else {
                console.error("Input value is not valid");
              }
            } catch (error) {
              console.error("Failed to place order:", error);
            }
          }
        : undefined,
    [sync.data, worldContract, amount, price]
  );

  return (
    <>
      <div className="fixed top-2 right-2">
        <AccountButton />
      </div>
      <div className="fixed top-16 right-2">
        <input
          type="number"
          placeholder="Enter a amount"
          className="border border-gray-300 rounded px-2 py-1 mb-2"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Enter a price"
          className="border border-gray-300 rounded px-2 py-1 mb-2"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>      
    </>
  );
}
