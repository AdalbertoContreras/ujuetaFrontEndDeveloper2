import {ItemPedido} from "./itemPedido";

export class Categoria {
  CategoriaCode = 0;
  CategoriaName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;


  constructor(item: ItemPedido) {
    this.CategoriaCode = item.CategoriaCode;
    this.CategoriaName = item.CategoriaName;
  }
}
