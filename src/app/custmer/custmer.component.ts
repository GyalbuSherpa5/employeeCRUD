import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custmer',
  templateUrl: './custmer.component.html',
  styleUrls: ['./custmer.component.scss']
})
export class CustmerComponent {

  EmployeeArray : any[]= [];

  name : string = "";
  address : string = "";
  phone : string = "";
  currentEmpId = "";

  constructor(private http: HttpClient){
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.http.get("http://localhost:8080/employees/getAll")

    .subscribe(
      (resultData : any)=>{
        console.log(resultData);
        this.EmployeeArray = resultData;
      }
    );
  }

  register(){

    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
    }

    this.http.post("http://localhost:8080/employees/save",bodyData,{responseType: "text"}).subscribe((resultSet: any) => {
      console.log(resultSet);
      alert("Employee saved successfully");
      
      this.getAllCustomer();
      this.name = "";
      this.address = "";
      this.phone = "";
      this.currentEmpId = "";
    })

  }

  clear(){
    this.name = "";
    this.address = "";
    this.phone = "";
    this.currentEmpId = "";
  }

  setUpdate(data : any){
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.currentEmpId = data.empId;
  }

  updateRecords(){
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone":this.phone
    };

    this.http.put("http://localhost:8080/employees/update" + "/"+ bodyData.name,
      bodyData,
      {responseType:'text'}).subscribe((resultData)=>{
          console.log(resultData);

          alert("Employee updated successfully");
          this.getAllCustomer();
          this.name = "";
          this.address = "";
          this.phone = "";
          this.currentEmpId = "";
      });
      
  }


  save(){
    if(this.currentEmpId == ""){
      this.register();
    }
    else{
      this.updateRecords();
    }

  }

  setDelete(data : any){
    this.http.delete(
      "http://localhost:8080/employees/delete" + "/"+data.name,
      {responseType:'text'}).subscribe((resultData)=>{
        console.log(resultData);
        alert("employee deleted successfully");

        this.getAllCustomer();
        this.name = "";
        this.address = "";
        this.phone = "";
      })
  }

}
