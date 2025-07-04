import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HdkModalComponent } from '../modal/hdk-modal.component';
import { DateMaskPipe } from './pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  imports:[MatTableModule, RouterModule, MatPaginatorModule, MatDialogModule, DateMaskPipe, MatCheckboxModule],
  templateUrl: 'hdk-tabela.component.html',
  styleUrls: ['hdk-tabela.component.scss'],
  selector: 'hdk-tabela',
  standalone: true
})
export class TabelaComponent<T> implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() pageSizeOptions: number[] = [10, 20];
  @Input() displayedColumns?: string[];

  @Output() excluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() atualizar: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onExcluir(element: T) {
    this.excluir.emit(element);
  }

  onAtualizar(element: T){
    this.atualizar.emit(element);
  }

  constructor(public dialog: MatDialog) {}

  abrirModal(): void {
    const dialogRef = this.dialog.open(HdkModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  fecharModal(): void{
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}