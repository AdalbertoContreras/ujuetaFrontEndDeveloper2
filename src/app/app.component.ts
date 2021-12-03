import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as data from '../assets/json/DATA.json';
import {Item} from "./models/item";
import {Cliente} from "./models/cliente";
import {Marca} from "./models/marca";
import {Vendedor} from "./models/vendedor";
import {Categoria} from "./models/categoria";
import {ListaContenida} from "./models/lista-contenida";

export interface Nivel{
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ujuetaFrontEndDeveloper2';
  niveles: Nivel[] = [
    {name: 'marca'},
    {name: 'categoria'},
    {name: 'cliente'},
    {name: 'articulo'},
  ];

  articulos: Item[] = [];
  clientes: Cliente[] = [];
  marcas: Marca[] = [];
  vendedores: Vendedor[] = [];
  categorias: Categoria[] = [];
  listaContenida: ListaContenida[] = [];


  constructor() {

  }

  existeCliente_actualizar(articulo: Item): boolean {
    return this.clientes.find(item => item.CardCode == articulo.CardCode) != undefined;
  }

  existeMarca_actualizar(articulo: Item): boolean {
    return this.marcas.find(item => item.FirmCode == articulo.FirmCode) != undefined
  }

  existeVendedor_actualizar(articulo: Item): boolean {
    return this.vendedores.find(item => item.SlpCode == articulo.SlpCode) != undefined;
  }

  existeCategoria_actualizar(articulo: Item): boolean {
    return this.categorias.find(item => item.CategoriaCode == articulo.CategoriaCode) != undefined;
  }


  async drop(event: any) {
    moveItemInArray(this.niveles, event.previousIndex, event.currentIndex);
    this.listaContenida = [];
    switch (this.niveles[0].name) {
      case 'marca':
          for(let i = 0; i < this.marcas.length; i ++){
            let listaAux = [];
            let importeVenta = 0;
            let transito = 0;
            let cantidad = 0;
            this.articulos.forEach(item => {
              if(item.FirmCode == this.marcas[i].FirmCode) {
                listaAux.push(item);
                cantidad += +item.Quantity;
                transito += +item.TRANSITO;
                importeVenta += +item.LineTotal;
              }
            });
            let listaItemContenido: ListaContenida = new ListaContenida(this.marcas[i], cantidad, transito, importeVenta);
            this.listaContenida.push(listaItemContenido);
            this.llenarListaContenida(1, listaItemContenido, listaAux);
          }
        break;
      case 'articulo':
        for(let i = 0; i < this.articulos.length; i ++){
          let listaAux = [this.articulos[i]];
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(this.articulos[i], cantidad, transito, importeVenta);
          this.listaContenida.push(listaItemContenido);
          this.llenarListaContenida(1, listaItemContenido, listaAux);
        }
        break;
      case 'categoria':
        for(let i = 0; i < this.categorias.length; i ++){
          let listaAux = [];
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          this.articulos.forEach(item => {
            if(item.CategoriaCode == this.categorias[i].CategoriaCode) {
              listaAux.push(item);
              cantidad += item.Quantity;
              transito += item.TRANSITO;
              importeVenta += item.LineTotal;
            }
          });
          let listaItemContenido: ListaContenida = new ListaContenida(this.categorias[i], cantidad, transito, importeVenta);
          this.listaContenida.push(listaItemContenido);
          this.llenarListaContenida(1, listaItemContenido,listaAux);
        }
        break;
      case 'vendedor':
        for(let i = 0; i < this.vendedores.length; i ++){
          let listaAux = this.articulos.filter(item => item.SlpCode == this.vendedores[i].SlpCode);
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;
          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(this.vendedores[i], cantidad, transito, importeVenta);
          this.listaContenida.push();
          this.llenarListaContenida(1, listaItemContenido, listaAux);
        }
        break;
      case 'cliente':
        for(let i = 0; i < this.clientes.length; i ++){
          let listaAux = this.articulos.filter(item => item.CardCode == this.clientes[i].CardCode);
          let importeVenta = 0;
          let transito = 0;
          let cantidad = 0;

          listaAux.forEach(item => {
            cantidad += item.Quantity;
            transito += item.TRANSITO;
            importeVenta += item.LineTotal;
          });
          let listaItemContenido: ListaContenida = new ListaContenida(this.clientes[i], cantidad, transito, importeVenta);
          this.listaContenida.push(listaItemContenido);
          this.llenarListaContenida(1, listaItemContenido,listaAux);
        }
        break;
      default:
        return;
    }
  }

  async llenarListaContenida(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]){
    if(nivelActual < this.niveles.length) {
      switch (this.niveles[nivelActual].name) {
        case 'marca':
          this.filtrarContenidoPorMarca(nivelActual, lista, listaArticulos);
          break;
        case 'articulo':
            this.filtrarContenidoPorArticulos(nivelActual, lista, listaArticulos);
          break;
        case 'categoria':
          this.filtrarContenidoPorCategoria(nivelActual, lista, listaArticulos);
          break;
        case 'vendedor':
            this.filtrarContenidoPorVendedor(nivelActual, lista, listaArticulos);
          break;
        case 'cliente':
            this.filtrarContenidoPorCliente(nivelActual, lista, listaArticulos);
          break;
        default:
          return;
      }
    }
  }

  filtrarContenidoPorMarca(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]) {
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
          encontrado = true;
        }
      }
      if(encontrado){
        let listaItemContenido: ListaContenida = new ListaContenida(this.marcas[i], cantidad, transito, importeVenta);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  async filtrarContenidoPorCategoria(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]) {
    let encontrado;
    for(let i = 0; i < this.categorias.length; i ++){
      encontrado = false;
      let listaAux = [];
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      for(let j = 0; j < listaArticulos.length; j ++) {
          transito += +listaArticulos[j].TRANSITO;
          importeVenta += +listaArticulos[j].LineTotal;
          cantidad += +listaArticulos[j].Quantity;
        if(this.categorias[i].CategoriaCode == listaArticulos[j].CategoriaCode) {
          encontrado = true;
          listaAux.push(listaArticulos[j]);
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(this.categorias[i], cantidad, transito, importeVenta);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorArticulos(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]) {
    let encontrado = false;
    for(let i = 0; i < this.articulos.length; i ++){
      encontrado = false;
      let importeVenta = 0;
      let transito = 0;
      let cantidad = 0;
      let listaAux = [];
      for(let j = 0; j < listaArticulos.length; j ++) {
        if(this.articulos[i].ItemCode == listaArticulos[j].ItemCode && this.articulos[i].ItemName == listaArticulos[j].ItemName && this.articulos[i].DocNum == listaArticulos[j].DocNum) {
          encontrado = true;
          cantidad += +listaArticulos[j].Quantity;
          transito += +listaArticulos[j].TRANSITO;
          importeVenta += +listaArticulos[j].LineTotal;
          listaAux.push(listaArticulos[j]);
          break;
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(this.articulos[i], cantidad, transito, importeVenta);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorCliente(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]) {
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
          break;
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(this.clientes[i], cantidad, transito, importeVenta);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarListaContenida(nivelActual + 1, listaItemContenido, listaAux);
      }
    }
  }

  filtrarContenidoPorVendedor(nivelActual: number, lista: ListaContenida, listaArticulos: Item[]) {
    let contador = 0;
    let encontrado = false;
    for(let i = 0; i < this.vendedores.length; i ++){
      encontrado = false;
      let listaAux = [];
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
          break;
        }
      }
      if(encontrado){
        let listaItemContenido = new ListaContenida(this.vendedores[i], cantidad, transito, importeVenta);
        lista.itemContenidos.push(listaItemContenido);
        this.llenarListaContenida(nivelActual + 1, listaItemContenido, listaAux);
        contador ++;
      }
    }
  }

  obtenerDescripcionItem(nivel: number, item: any): string {
    switch (this.niveles[nivel].name) {
      case 'marca':
        let marca: Marca = item;
        return marca.FirmCode + " " + marca.FirmName;
      case 'articulo':
        let articulo: Item = item;
        return articulo.ItemCode + " " + articulo.ItemName;
      case 'categoria':
        let categoria: Categoria = item;
        return categoria.CategoriaCode + " " + categoria.CategoriaName;
      case 'vendedor':
        let vendedor: Vendedor = item;
        return vendedor.SlpCode + " " + vendedor.SlpName;
      case 'cliente':
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
    let lista = <Item[]>JSON.parse(JSON.stringify(data));
    for(let i = 0; i < lista.length; i ++) {
      this.articulos.push(lista[i]);
      if(!this.existeCategoria_actualizar(this.articulos[i])) {
        this.categorias.push(new Categoria(this.articulos[i]));
      }
      if(!this.existeCliente_actualizar(this.articulos[i])) {
        this.clientes.push(new Cliente(this.articulos[i]));
      }
      if(!this.existeMarca_actualizar(this.articulos[i])) {
        this.marcas.push(new Marca(this.articulos[i]));
      }
      if(!this.existeVendedor_actualizar(this.articulos[i])) {
        this.vendedores.push(new Vendedor(this.articulos[i]));
      }
    }
  }

}
