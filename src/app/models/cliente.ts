import {ItemPedido} from "./itemPedido";

export class Cliente {
  CardCode = "";
  CardName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;

  constructor(item: ItemPedido) {
    this.CardCode = item.CardCode;
    this.CardName = item.CardName;
  }
}
