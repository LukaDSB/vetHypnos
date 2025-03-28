
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  imports:[MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: 'hdk-tabela.component.html',
  styleUrls: ['hdk-tabela.component.scss'],
  selector: 'hdk-tabela',
  standalone: true
})
export class TabelaComponent<T> implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() pageSizeOptions: number[] = [10, 20];
  @Input() displayedColumns?: string[];
  @Input() customTemplates: {[key: string]: (element: T) => string} = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}