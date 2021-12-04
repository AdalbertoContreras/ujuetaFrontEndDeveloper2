import {ItemPedido} from "./itemPedido";

export class Articulo {
  ItemCode = 0;
  ItemName = "";
  constructor(item: ItemPedido) {
    this.ItemCode = item.ItemCode;
    this.ItemName = item.ItemName;
  }
}
