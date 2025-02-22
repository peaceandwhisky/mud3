// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Order, OrderCounter } from "./codegen/index.sol";

contract PlaceOrderSystem is System {
  function placeOrder(address baseToken, address quoteToken, uint256 amount, uint256 price) public {
    address user = msg.sender;
    bool isBuy = true;
    uint256 timestamp = block.timestamp;
    bool active = true;

    uint256 currentOrderCount = OrderCounter.get();
    OrderCounter.set(currentOrderCount + 1);
    
    Order.set(currentOrderCount, user, baseToken, quoteToken, price, amount, isBuy, active, timestamp);
  }
}
