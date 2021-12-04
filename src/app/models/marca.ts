import {ItemPedido} from "./itemPedido";

export class Marca {
  FirmCode = 0;
  FirmName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;

  constructor(item: ItemPedido) {
    this.FirmCode = item.FirmCode;
    this.FirmName = item.FirmName;
  }
}
