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
        user: "address",
        baseToken: "address",
        quoteToken: "address",
        price: "uint256",
        amount: "uint256",
        orderSide: "uint8",
        timestamp: "uint256",
        active: "bool",
        next: "uint256",
      },
      key: ["user","baseToken", "quoteToken", "price", "amount"],
    },
  },
});
