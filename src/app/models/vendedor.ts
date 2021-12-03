import {Item} from "./item";

export class Vendedor {
  SlpCode = 0;
  SlpName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;

  constructor(item: Item) {
    this.SlpCode = item.SlpCode;
    this.SlpName = item.SlpName;
  }
}
