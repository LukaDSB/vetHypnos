/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; // Importe apenas o que precisamos
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { AcoesModalComponent } from '../acoes-modal/acoes-modal.component';
import { Animal } from 'src/app/models/animal.model';

@Component({
  imports: [MatTableModule, RouterModule, MatPaginatorModule, MatDialogModule, MatCheckboxModule, DatePipe, CommonModule],
  templateUrl: 'hdk-tabela.component.html',
  styleUrls: ['hdk-tabela.component.scss'],
  selector: 'hdk-tabela',
  standalone: true
})
export class TabelaComponent<T extends { id: any, nome?: any }> implements AfterViewInit, OnInit {
  private _dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  public isMobile = false;

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
  @Input() exibirAcaoVisualizar = false; 

  @Output() excluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() atualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() visualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() selecionadosChange = new EventEmitter<Animal[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  selecionados: any[] = [];
  
  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}
  
  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1190px)']).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngAfterViewInit() {
    this.connectPaginator();
    console.log(this.dataSource)
  }

  private connectPaginator() {
    if (this._dataSource && this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }
  
  onRowClick(element: T): void {
    if (!this.isMobile) {
      return;
    }

    const dialogRef = this.dialog.open(AcoesModalComponent, {
      width: '280px',
      panelClass: 'acoes-modal-panel', 
      data: { 
        itemName: element.nome || `ID: ${element.id}`,
        showVisualizar: this.exibirAcaoVisualizar 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'visualizar': this.onVisualizar(element); break;
        case 'atualizar': this.onAtualizar(element); break;
        case 'excluir': this.onExcluir(element); break;
      }
    });
  }

  onVisualizar(element: T): void { this.visualizar.emit(element); }
  onExcluir(element: T) { this.excluir.emit(element); }
  onAtualizar(element: T){ this.atualizar.emit(element); }
  onCheckboxChange(element: any, checked: boolean) {
    element.selecionado = checked;
    if (checked) {
      this.selecionados.push(element);
    } else {
      this.selecionados = this.selecionados.filter(e => e !== element);
    }
    this.selecionadosChange.emit(this.selecionados);
  }
}