'use strict'
const basket = require('./basket')

console.log(JSON.stringify(basket.basket))

const retCreateItem = basket.createItem(
  '000c8be0-ac2c-44eb-aa74-50f1a3226c63', 'Petite frite',
  2.9, 'EUR', 2)

console.log(JSON.stringify(basket.basket))

const itemId = retCreateItem.itemId

basket.modifyItem(itemId, 3)

console.log(JSON.stringify(basket.basket))

basket.removeItem(itemId)

console.log(JSON.stringify(basket.basket))
