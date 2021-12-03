import {Item} from "./item";

export class Marca {
  FirmCode = 0;
  FirmName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;

  constructor(item: Item) {
    this.FirmCode = item.FirmCode;
    this.FirmName = item.FirmName;
  }
}
