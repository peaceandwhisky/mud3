// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Order } from "./codegen/index.sol";

contract PlaceOrderSystem is System {
  function placeOrder(address baseToken, address quoteToken, uint256 amount, uint256 price) public {
    address user = msg.sender;
    bool isBuy = true;
    uint256 timestamp = block.timestamp;
    bool active = true;

    bytes32 orderId = keccak256(abi.encodePacked(user, baseToken, quoteToken, price, amount, isBuy, timestamp));
    
    Order.set(orderId, user, baseToken, quoteToken, price, amount, isBuy, active, timestamp);
  }
}
