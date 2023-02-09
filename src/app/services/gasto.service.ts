import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Gasto } from '../models/gasto';
import { Observable } from 'rxjs';

const baseUrl='http://localhost:3000/api/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  
  selectedGasto: Gasto;
  
  gastos:Gasto[]=[];

  constructor(private http: HttpClient) {
  this.selectedGasto=new Gasto();
  }
  
  
  getGastos(){
    return this.http.get('http://localhost:3000/api/gastos');
  }
    
  postGasto(Gasto: Gasto){
    return this.http.post(baseUrl,Gasto);
  }

  /*putGasto(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }*/
  
  putGasto(Gasto: Gasto){
    return this.http.put(baseUrl+'/$(gasto._id)',Gasto);
  }
  deleteGasto(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  /*deleteGasto(_id:string){
    return this.http.delete(this.baseUrl+'/${gasto._id}');
  }*/



}
