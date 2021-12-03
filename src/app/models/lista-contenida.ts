export class ListaContenida {
  itemActual: any = null;
  itemContenidos: ListaContenida[] = [];
  visible = false;

  constructor(itemActual: any, cantidad, transito, importeVenta) {
    this.itemActual = itemActual;
    this.itemActual.cantidad = cantidad;
    this.itemActual.transito = transito;
    this.itemActual.importeVenta = importeVenta;
  }
}
