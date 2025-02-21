// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Order } from "./codegen/index.sol";

contract PlaceOrderSystem is System {
  function placeOrder(uint256 price) public returns (uint256) {
    address user = 0x0A772258e2f36999C6aA57B2Ba09B78caF7EbAd3;
    address baseToken = 0x17E42453D681E11a3bB3a9dcA6faF5dE0eF72624;
    address quoteToken = 0xb7427086524627fa8AdF96A04aCF5e3281A929C5;
    uint256 amount = 100;
    uint8 orderSide = 0;
    uint256 timestamp = 1740102394;
    bool active = true;
    uint256 next = 0;
    
    Order.set(user, baseToken, quoteToken, price, amount, orderSide, timestamp, active, next);
    return next;
  }
}
