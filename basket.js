'use strict'
const crypto = require('node:crypto')

const epoch = Math.floor(Date.now() / 1000) /* seconds */
console.log(`epoch = ${epoch}`)

const userId = 'f3ed8c7d-c350-4c7d-b1ed-590e58144032'
const userName = 'Elvis Presley'

/* INTERNAL STORAGE */
const basket = {
  id: crypto.randomUUID(),
  from: {
    id: userId,
    name: userName
  },
  items: [],
  createdAt: epoch,
  lastModifiedAt: epoch
}
function whereId(item) {
  return (item.id == this)
}
/* INTERNAL STORAGE (END) */

function createItem(productId, productName, unitPriceAmount, unitPriceCurrency, quantity) {
  const epoch = Math.floor(Date.now() / 1000) /* seconds */
  console.log(`[createItemToBasket] epoch = ${epoch}`)

  const item = {
    id: crypto.randomUUID(),
    product: {
      productId: productId,
      productName: productName
    },
    unitPrice: {
      amount: unitPriceAmount,
      currency: unitPriceCurrency
    },
    quantity: quantity,
    price: {
      amount: unitPriceAmount * quantity,
      currency: unitPriceCurrency
    },
    createdAt: epoch,
    lastModifiedAt: epoch
  }
  basket.items.push(item)

  return { code: 0, itemId: item.id}
}

function modifyItem(itemId, quantity) {
  const epoch = Math.floor(Date.now() / 1000) /* seconds */
  console.log(`[modifyItemInBasket] epoch = ${epoch}`)

  const itemIndex = basket.items.findIndex(whereId, itemId)

  basket.items[itemIndex].quantity = quantity
  basket.items[itemIndex].price.amount = basket.items[itemIndex].unitPrice.amount * quantity
  basket.items[itemIndex].lastModifiedAt = epoch
  basket.lastModifiedAt = epoch

  return { code: 0 }
}

function removeItem(itemId) {
  const epoch = Math.floor(Date.now() / 1000) /* seconds */
  console.log(`[removeItem] epoch = ${epoch}`)

  const itemIndex = basket.items.findIndex(whereId, itemId)

  basket.items.splice(itemIndex, 1)
  basket.lastModifiedAt = epoch

  const ret = { code: 0 }
  console.log(`[removeItem] return ${JSON.stringify(ret)}`)
  return ret
}

exports.basket = basket
exports.createItem = createItem
exports.modifyItem = modifyItem
exports.removeItem = removeItem
