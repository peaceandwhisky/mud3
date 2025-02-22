import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "app",
  enums: {
    Direction: ["North", "East", "South", "West"],
  },
  tables: {
    Position: {
      schema: { player: "address", x: "int32", y: "int32", message: "string" },
      key: ["player"],
    },
    Order: {
      schema: {
        orderId: "bytes32",
        user: "address",
        baseToken: "address",
        quoteToken: "address",
        price: "uint256",
        amount: "uint256",
        isBuy: "bool",
        active: "bool",
        timestamp: "uint256",
      },
      key: ["orderId"],
    },
  },
});
