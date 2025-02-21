import { stash } from "./mud/stash";
import { useRecords } from "@latticexyz/stash/react";
import { AccountButton } from "@latticexyz/entrykit/internal";
import { Direction } from "./common";
import mudConfig from "contracts/mud.config";
import { useMemo, useState } from "react";
import { GameMap } from "./game/GameMap";
import { useWorldContract } from "./mud/useWorldContract";
import { Synced } from "./mud/Synced";
import { useSync } from "@latticexyz/store-sync/react";

export function App() {
  const players = useRecords({ stash, table: mudConfig.tables.app__Position });

  const [inputValue, setInputValue] = useState<number | undefined>(undefined);


  const sync = useSync();
  const worldContract = useWorldContract();
  const onMove = useMemo(
    () =>
      sync.data && worldContract
        ? async (direction: Direction) => {
            const tx = await worldContract.write.app__move([mudConfig.enums.Direction.indexOf(direction)]);
            await sync.data.waitForTransaction(tx);
          }
        : undefined,
    [sync.data, worldContract],
  );

    const handlePlaceOrder = useMemo(
    () =>
      sync.data && worldContract
        ? async () => {
            try {
              console.log("Place Order button clicked");
              const tx = await worldContract.write.app__placeOrder([BigInt(inputValue)]);
              await sync.data.waitForTransaction(tx);
              console.log("Order placed successfully");
            } catch (error) {
              console.error("Failed to place order:", error);
            }
          }
        : undefined,
    [sync.data, worldContract, inputValue]
  );

  return (
    <>
      {/* <div className="fixed inset-0 grid place-items-center p-4">
        <Synced
          fallback={({ message, percentage }) => (
            <div className="tabular-nums">
              {message} ({percentage.toFixed(1)}%)…
            </div>
          )}
        >
          <GameMap players={players} onMove={onMove} />
        </Synced>
      </div> */}
      <div className="fixed top-2 right-2">
        <AccountButton />
      </div>
      <div className="fixed right-2">
        <input
          type="number"
          placeholder="Enter a number"
          className="border border-gray-300 rounded px-2 py-1 mb-2"
          onChange={(e) => setInputValue(Number(e.target.value))}
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
