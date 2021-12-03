import {Item} from "./item";

export class Categoria {
  CategoriaCode = 0;
  CategoriaName = '';
  transito = 0;
  importeVenta = 0;
  cantidad = 0;


  constructor(item: Item) {
    this.CategoriaCode = item.CategoriaCode;
    this.CategoriaName = item.CategoriaName;
  }
}
