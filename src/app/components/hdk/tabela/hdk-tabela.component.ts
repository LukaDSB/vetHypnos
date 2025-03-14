import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../models/usuario.model';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TabelaService } from 'src/app/services/tabela.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hdk-tabela',
  styleUrls: ['hdk-tabela.component.scss'],
  templateUrl: 'hdk-tabela.component.html',
  standalone: true,
  imports: [HttpClientModule, MatTableModule, MatPaginatorModule, RouterModule],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'especialidade', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tabelaService: TabelaService) {}

  ngOnInit() {
    this.tabelaService.getUsuarios().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
