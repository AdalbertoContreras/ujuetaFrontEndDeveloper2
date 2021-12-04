import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as data from '../assets/json/DATA.json';
import {ItemPedido} from "./models/itemPedido";
import {Cliente} from "./models/cliente";
import {Marca} from "./models/marca";
import {Vendedor} from "./models/vendedor";
import {Categoria} from "./models/categoria";
import {ListaContenida} from "./models/lista-contenida";
import {Articulo} from "./models/articulo";

export interface Nivel{
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ////niveles
  niveles: Nivel[] = [
    {id: 1, name: 'MARCA'},
    {id: 5, name: 'ARTICULO'},
    {id: 2, name: 'CATEGORIA'},
    {id: 4, name: 'VENDEDOR'},
    {id: 3, name: 'CLIENTE'},
  ];

  //estadistica total
  cantidadTotal: number = 0;
  importeVentaTotal: number = 0;
  transitoTotal: number = 0;


  //nombre de niveles
  MARCA = this.niveles[0].name;
  ARTICULO = this.niveles[1].name;
  CATEGORIA = this.niveles[2].name;
  VENDEDOR = this.niveles[3].name;
  CLIENTE = this.niveles[4].name;

  //listas
  itemPedido: ItemPedido[] = [];
  articulos: Articulo[] = [];
  clientes: Cliente[] = [];
  marcas: Marca[] = [];
  vendedores: Vendedor[] = [];
  categorias: Categoria[] = [];
  listaContenida: ListaContenida[] = [];

  //procesandoLista
  procesandoLista = false;

  existeCliente(articulo: ItemPedido): boolean {
    return this.clientes.find(item => item.CardCode == articulo.CardCode) != undefined;
  }

  existeMarca(articulo: ItemPedido): boolean {
    return this.marcas.find(item => item.FirmCode == articulo.FirmCode) != undefined
  }

  existeVendedor(articulo: ItemPedido): boolean {
    return this.vendedores.find(item => item.SlpCode == articulo.SlpCode) != undefined;
  }

  existeArticulo(articulo: ItemPedido): boolean {
    return this.articulos.find(item => item.ItemCode == articulo.ItemCode) != undefined;
  }

  existeCategoria(articulo: ItemPedido): boolean {
    return this.categorias.find(item => item.CategoriaCode == articulo.CategoriaCode) != undefined;
  }

  procesarLista() {
    this.procesandoLista = true;
    this.listaContenida = [];
    switch (this.niveles[0].name) {
      case this.MARCA:
        for(let i = 0; i < this.marcas.length; i ++){
          let listaAux = [];
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          this.itemPedido.forEach(item => {
            if(item.FirmCode == this.marcas[i].FirmCode) {
              listaAux.push(item);
              cantidad += +item.Quantity;
              transito += +item.TRANSITO;
              importeVenta += +item.LineTotal;
            }
          });
          let listaItemContenido: ListaContenida = new ListaContenida( cantidad, transito, importeVenta).setMarca(this.marcas[i]);
          this.listaContenida.push(listaItemContenido);
          this.llenarNivelesListaContenida(1, listaItemContenido, listaAux);
        }
        break;
      case this.ARTICULO:
        for(let i = 0; i < this.articulos.length; i ++){
          let listaAux = this.itemPedido.filter(item => item.ItemCode == this.articulos[i].ItemCode);
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(cantidad, transito, importeVenta).setArticulo(this.itemPedido[i]);
          this.listaContenida.push(listaItemContenido);
          this.llenarNivelesListaContenida(1, listaItemContenido, listaAux);
        }
        break;
      case this.CATEGORIA:
        for(let i = 0; i < this.categorias.length; i ++){
          let listaAux = [];
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          this.itemPedido.forEach(item => {
            if(item.CategoriaCode == this.categorias[i].CategoriaCode) {
              listaAux.push(item);
              cantidad += item.Quantity;
              transito += item.TRANSITO;
              importeVenta += item.LineTotal;
            }
          });
          let listaItemContenido: ListaContenida = new ListaContenida(cantidad, transito, importeVenta).setcategoria(this.categorias[i]);
          this.listaContenida.push(listaItemContenido);
          this.llenarNivelesListaContenida(1, listaItemContenido,listaAux);
        }
        break;
      case this.VENDEDOR:
        for(let i = 0; i < this.vendedores.length; i ++){
          let listaAux = this.itemPedido.filter(item => item.SlpCode == this.vendedores[i].SlpCode);
          console.log(listaAux);
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(cantidad, transito, importeVenta).setVendedor(this.vendedores[i]);
          this.listaContenida.push(listaItemContenido);
          this.llenarNivelesListaContenida(1, listaItemContenido, listaAux);
        }
        break;
      case this.CLIENTE:
        for(let i = 0; i < this.clientes.length; i ++){
          let listaAux = this.itemPedido.filter(item => item.CardCode == this.clientes[i].CardCode);
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;

          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(cantidad, transito, importeVenta).setCliente(this.clientes[i]);
          this.listaContenida.push(listaItemContenido);
          this.llenarNivelesListaContenida(1, listaItemContenido,listaAux);
        }
        break;
      default:
        return;
    }
    this.procesandoLista = false;
  }


  drop(event: any) {
    moveItemInArray(this.niveles, event.previousIndex, event.currentIndex);
    this.procesarLista()
  }

  llenarNivelesListaContenida(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]){
    if(nivelActual < this.niveles.length) {
      switch (this.niveles[nivelActual].name) {
        case this.MARCA:
          this.filtrarContenidoPorMarca(nivelActual, lista, listaArticulos);
          break;
        case this.ARTICULO:
            this.filtrarContenidoPorArticulos(nivelActual, lista, listaArticulos);
          break;
        case this.CATEGORIA:
          this.filtrarContenidoPorCategoria(nivelActual, lista, listaArticulos);
          break;
        case this.VENDEDOR:
            this.filtrarContenidoPorVendedor(nivelActual, lista, listaArticulos);
          break;
        case this.CLIENTE:
            this.filtrarContenidoPorCliente(nivelActual, lista, listaArticulos);
          break;
        default:
          return;
      }
    }
  }

  filtrarContenidoPorMarca(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]) {
    let encontrado;
    for(let i = 0; i < this.marcas.length; i ++){
      let listaAux = [];
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      encontrado = false;
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.marcas[i].FirmCode == listaArticulos[j].FirmCode) {
          cantidad += +listaArticulos[j].Quantity;
          transito += +listaArticulos[j].TRANSITO;
          importeVenta += +listaArticulos[j].LineTotal;
          listaAux.push(listaArticulos[j]);
          encontrado = true;
        }
      }
      if(encontrado){
        let listaItemContenido: ListaContenida = new ListaContenida(cantidad, transito, importeVenta).setMarca(this.marcas[i]);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarNivelesListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorCategoria(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]) {
    let encontrado = false;
    let importeVenta = 0;
    let transito = 0;
    let cantidad = 0;
    let listaAux = [];
    for(let i = 0; i < this.categorias.length; i ++){
      encontrado = false;
      listaAux = [];
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.categorias[i].CategoriaCode == listaArticulos[j].CategoriaCode) {
          encontrado = true;
          listaAux.push(listaArticulos[j]);
        }
      }
      if(encontrado){
        importeVenta = 0;
        transito = 0;
        cantidad = 0;
        for(let j = 0; j < listaAux.length; j ++) {
          transito += +listaAux[j].TRANSITO;
          importeVenta += +listaAux[j].LineTotal;
          cantidad += +listaAux[j].Quantity;
        }
        let listaItemContenido = new ListaContenida(cantidad, transito, importeVenta).setcategoria(this.categorias[i]);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarNivelesListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorArticulos(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]) {
    let encontrado = false;
    for(let i = 0; i < this.articulos.length; i ++){
      encontrado = false;
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      let listaAux = [];
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.articulos[i].ItemCode == listaArticulos[j].ItemCode ) {
          encontrado = true;
          cantidad += +listaArticulos[j].Quantity;
          transito += +listaArticulos[j].TRANSITO;
          importeVenta += +listaArticulos[j].LineTotal;
          listaAux.push(listaArticulos[j]);
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(cantidad, transito, importeVenta).setArticulo(this.itemPedido[i]);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarNivelesListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorCliente(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]) {
    let encontrado = false;
    for(let i = 0; i < this.clientes.length; i ++){
      encontrado = false;
      let listaAux = [];
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.clientes[i].CardCode == listaArticulos[j].CardCode) {
          encontrado = true;
          listaAux.push(listaArticulos[j]);
          cantidad += +listaArticulos[j].Quantity;
          transito += +listaArticulos[j].TRANSITO;
          importeVenta += +listaArticulos[j].LineTotal;
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(cantidad, transito, importeVenta).setCliente(this.clientes[i]);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarNivelesListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorVendedor(nivelActual: number, lista: ListaContenida, listaArticulos: ItemPedido[]) {
    let contador = 0;
    let encontrado = false;
    for(let i = 0; i < this.vendedores.length; i ++){
      encontrado = false;
      let listaAux : ItemPedido[] = [];
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.vendedores[i].SlpCode == listaArticulos[j].SlpCode) {
          encontrado = true;
          listaAux.push(listaArticulos[j]);
          cantidad += listaArticulos[j].Quantity;
          transito += listaArticulos[j].TRANSITO;
          importeVenta += listaArticulos[j].LineTotal;
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(cantidad, transito, importeVenta).setVendedor(this.vendedores[i]);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarNivelesListaContenida(nivelActual + 1, listaItemContenido, listaAux);
        contador ++;
      }
    }
  }

  obtenerDescripcionItem(nivel: number, item: any): string {
    switch (this.niveles[nivel].name) {
      case this.MARCA:
        let marca: Marca = item;
        return marca.FirmCode + " " + marca.FirmName;
      case this.ARTICULO:
        let articulo: ItemPedido = item;
        return articulo.ItemCode + " " + articulo.ItemName;
      case this.CATEGORIA:
        let categoria: Categoria = item;
        return categoria.CategoriaCode + " " + categoria.CategoriaName;
      case this.VENDEDOR:
        let vendedor: Vendedor = item;
        return vendedor.SlpCode + " " + vendedor.SlpName;
      case this.CLIENTE:
        let cliente: Cliente= item;
        return cliente.CardCode + " " + cliente.CardName;
      default:
        return '';
    }
  }

  setVisible(lista: ListaContenida) {
    lista.visible = !lista.visible;
  }

  ngOnInit(): void {
    //agrupar categorias, marcas, vendedores, clientes, articulos
    let lista = <ItemPedido[]>JSON.parse(JSON.stringify(data));
    for(let i = 0; i < lista.length; i ++) {
      this.itemPedido.push(lista[i]);
      if(!this.existeCategoria(this.itemPedido[i])) {
        this.categorias.push(new Categoria(this.itemPedido[i]));
      }
      if(!this.existeCliente(this.itemPedido[i])) {
        this.clientes.push(new Cliente(this.itemPedido[i]));
      }
      if(!this.existeMarca(this.itemPedido[i])) {
        this.marcas.push(new Marca(this.itemPedido[i]));
      }
      if(!this.existeVendedor(this.itemPedido[i])) {
        this.vendedores.push(new Vendedor(this.itemPedido[i]));
      }
      if(!this.existeArticulo(this.itemPedido[i])) {
        this.articulos.push(new Articulo(this.itemPedido[i]));
      }
      this.cantidadTotal += this.itemPedido[i].Quantity;
      this.importeVentaTotal += this.itemPedido[i].LineTotal;
      this.transitoTotal+= this.itemPedido[i].TRANSITO;
    }
    this.procesarLista();
  }

}
