import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myProject';

  // empForm :any;
  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel= new EmployeeModel();
  employeeList: EmployeeModel[] =[];

  constructor(){
    this.createForm();
    debugger;
    const oldDta =localStorage.getItem("EmpData");
    if(oldDta!=null){
      const parseData =JSON.parse(oldDta);
      this.employeeList = parseData;

    }

  }

  createForm(){
    this.employeeForm =new FormGroup({
      gstin : new FormControl(this.employeeObj.gstin),
      pan : new FormControl(this.employeeObj.pan),
      code : new FormControl(this.employeeObj.code),
      name : new FormControl(this.employeeObj.name,[Validators.required,Validators.minLength(4)]),
      address : new FormControl(this.employeeObj.address),
      pin : new FormControl(this.employeeObj.pin),
      country : new FormControl(this.employeeObj.country),
      state : new FormControl(this.employeeObj.state),
      city : new FormControl(this.employeeObj.city),
      mobile : new FormControl(this.employeeObj.mobile),
      email : new FormControl(this.employeeObj.email,[Validators.email]),
      longitude : new FormControl(this.employeeObj.longitude),
      latitude : new FormControl(this.employeeObj.latitude),
      currency : new FormControl(this.employeeObj.currency),

    })
  }

  onSave() {
    if (this.employeeForm.valid) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData != null) {
        const parsedData = JSON.parse(oldData);
        this.employeeForm.controls['empid'].setValue(parsedData.length + 1);
        this.employeeList = [...parsedData];
      } else {
        this.employeeForm.controls['empid'].setValue(1); // Assign the first ID
      }

      // Add the new employee data to the list
      this.employeeList.unshift(this.employeeForm.value);

      // Save the updated list to localStorage
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));

      // Reset the form after saving
      this.employeeForm.reset();
    } else {
      console.error('Form is invalid. Please fill all required fields.');
    }
  }
}
