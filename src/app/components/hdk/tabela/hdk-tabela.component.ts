/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HdkModalComponent } from '../modal/hdk-modal.component';
import { DateMaskPipe } from './pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Animal } from 'src/app/models/animal.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  imports: [MatTableModule, RouterModule, MatPaginatorModule, MatDialogModule, DateMaskPipe, MatCheckboxModule, DatePipe, CommonModule],
  templateUrl: 'hdk-tabela.component.html',
  styleUrls: ['hdk-tabela.component.scss'],
  selector: 'hdk-tabela',
  standalone: true
})
export class TabelaComponent<T> implements AfterViewInit {
  private _dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  @Input()
  set dataSource(data: MatTableDataSource<T>) {
    this._dataSource = data;
    this.connectPaginator();
  }
  get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  @Input() displayedColumns?: string[];
  @Input() pageSize = 10;
  // --- ALTERAÇÃO: Nova propriedade para controlar a visibilidade do ícone ---
  @Input() exibirAcaoVisualizar = false; // Por padrão, o ícone não é exibido

  @Output() excluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() atualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() visualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() selecionadosChange = new EventEmitter<Animal[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selecionados: any[] = [];
  
  constructor(public dialog: MatDialog) {}
  
  ngAfterViewInit() {
    this.connectPaginator();
  }

  private connectPaginator() {
    if (this._dataSource && this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

  onVisualizar(element: T): void {
    this.visualizar.emit(element);
  }

  onCheckboxChange(element: any, checked: boolean) {
    element.selecionado = checked;
    if (checked) {
      this.selecionados.push(element);
    } else {
      this.selecionados = this.selecionados.filter(e => e !== element);
    }
    this.selecionadosChange.emit(this.selecionados);
  }
  
  onExcluir(element: T) {
    this.excluir.emit(element);
  }

  onAtualizar(element: T){
    this.atualizar.emit(element);
  }
  
  abrirModal(): void {
    const dialogRef = this.dialog.open(HdkModalComponent, { width: '400px', data: {} });
    dialogRef.afterClosed().subscribe(() => { console.log('The dialog was closed'); });
  }

  fecharModal(): void {}
}