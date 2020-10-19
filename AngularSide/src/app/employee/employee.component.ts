import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, private messageservice : MessageService ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        console.log("PUT")
        this.resetForm(form);
        this.refreshEmployeeList();
        this.messageservice.showSuccess("Data updated successfully !!", "EmployeeCrud.com")
      },(err)=>{
        this.messageservice.showError("Something is wrong", "EmployeeCrud.com")
      });
    }
    else {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        console.log("POST")
        this.messageservice.showSuccess("Data posted successfully !!", "EmployeeCrud.com")
      },(err)=>{
        this.messageservice.showError("Something is wrong", "EmployeeCrud.com")
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    },(err)=>{
      this.messageservice.showError("Something is wrong", "EmployeeCrud.com")
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        this.messageservice.showSuccess("Record deleted successfully !!", "EmployeeCrud.com")
      },(err)=>{
        this.messageservice.showError("Something is wrong", "EmployeeCrud.com")
      });
    }
  }

}
