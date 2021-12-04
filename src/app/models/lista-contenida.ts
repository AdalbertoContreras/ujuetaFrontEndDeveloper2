import {ItemPedido} from "./itemPedido";
import {Marca} from "./marca";
import {Vendedor} from "./vendedor";
import {Cliente} from "./cliente";
import {Articulo} from "./articulo";
import {Categoria} from "./categoria";

export class ListaContenida {
  itemActual: ItemPedido = null;
  itemContenidos: ListaContenida[] = [];
  visible = false;

  constructor(cantidad, transito, importeVenta) {
    this.itemActual = new ItemPedido();
    this.itemActual.Quantity = cantidad;
    this.itemActual.TRANSITO = transito;
    this.itemActual.LineTotal = importeVenta;
  }

  setMarca(marca: Marca) {
    if(this.itemActual) {
      this.itemActual.FirmCode = marca.FirmCode;
      this.itemActual.FirmName = marca.FirmName;
    }
    return this;
  }

  setVendedor(vendedor: Vendedor) {
    if(this.itemActual) {
      this.itemActual.SlpCode = vendedor.SlpCode;
      this.itemActual.SlpName = vendedor.SlpName;
    }
    return this;
  }

  setCliente(cliente: Cliente) {
    if(this.itemActual) {
      this.itemActual.CardName = cliente.CardName;
      this.itemActual.CardName = cliente.CardName;
    }
    return this;
  }

  setArticulo(articulo: Articulo) {
    if(this.itemActual) {
      this.itemActual.ItemCode = articulo.ItemCode;
      this.itemActual.ItemName = articulo.ItemName;
    }
    return this;
  }

  setcategoria(categoria: Categoria) {
    if(this.itemActual) {
      this.itemActual.CategoriaCode = categoria.CategoriaCode;
      this.itemActual.CategoriaName = categoria.CategoriaName;
    }
    return this;
  }
}
