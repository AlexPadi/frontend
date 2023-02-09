import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';
declare var M: any;

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [GastoService]
})
export class GastosComponent implements OnInit {
  constructor(public gastoService: GastoService) { }
  ngOnInit(): void {
    this.getGastos();
  }
  getGastos() {
    this.gastoService.getGastos()
      .subscribe(res => {
        this.gastoService.gastos = res as Gasto[];
        console.log(res);
      })
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }
  addGasto(form: NgForm) {
    if (form.value._id) {
      this.gastoService.putGasto(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Gasto Actualizado' });
          this.getGastos();
        })
    } else {
      this.gastoService.postGasto(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Gasto Actualizado' });
          this.getGastos();
        })
    }
  }

  editGasto(gasto: Gasto){
    this.gastoService.selectedGasto=gasto;
  }
  
  deleteGasto(_id: string){
    if (confirm('¿Estás seguro de que quieres borrar?')) {
      this.gastoService.deleteGasto(_id)
      .subscribe(res =>{
        console.log(res);
        M.toast({html:'Gasto Eliminado'});
        this.getGastos;
      });
    }
  }

}
