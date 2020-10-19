import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from '../employee.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const empRoutes: Routes=[
  {path: '', component: EmployeeComponent}
]

@NgModule({
  declarations: [
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(empRoutes),
  ]
})
export class EmployeeModule { 
  constructor(){
    console.log("Employee Module");
  }
}
