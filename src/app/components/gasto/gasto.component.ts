import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';

declare var M:any;
@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css'],
  providers:[GastoService]
})
export class GastoComponent implements OnInit {

  constructor(public gastoService:GastoService) { }

  ngOnInit(): void {
    this.getGastos();
  }
  getGastos()
  {
    this.gastoService.getGastos()
    .subscribe(res=>{
      this.gastoService.gastos=res as Gasto[];
      console.log(res);
    })
  }
  
  addGasto(form:NgForm)
  {
    if(form.value._id){
        this.gastoService.putGasto(form.value._id)
        .subscribe(res=>{
          console.log('id'+form.value._id);
        console.log(res);
        this.resetForm(form);
        M.toast({html:'Gasto Actualizado'});
        this.getGastos();
        })
    }else{
    this.gastoService.postGasto(form.value)
    .subscribe(res=>{
      console.log('id'+form.value._id);
      console.log(res);
      this.resetForm(form);
      M.toast({html:'Gasto Guardado'});
      this.getGastos();
      })
    }
  }

  editGasto(gasto: Gasto){
    this.gastoService.selectedGasto=gasto;
    
  }

  deleteGasto(_id: string)
  {
    if(confirm('Estás seguro de quieres borrar?')){
        this.gastoService.deleteGasto(_id)
        .subscribe(res =>{
          console.log(res);
          M.toast({html:'Gasto Eliminado'});
          this.getGastos();        
        });
    }
  }
  resetForm(form?:NgForm)
  {
    if(form)
    {
      form.reset();
      this.gastoService.selectedGasto=new Gasto();
    }
  }
}
