import {ItemPedido} from "./itemPedido";

export class Vendedor {
  SlpCode = 0;
  SlpName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;

  constructor(item: ItemPedido) {
    this.SlpCode = item.SlpCode;
    this.SlpName = item.SlpName;
  }
}
