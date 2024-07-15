import { Component, Output, EventEmitter, ChangeDetectorRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl,FormGroupDirective } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { Student } from '../student';



@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatRadioModule
  ]
})
export class StudentFormComponent {
  
  
  @Output() addStudent = new EventEmitter<Student>();
  studentForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^[a-zA-Z\s]*$/.test(control.value);
      return valid ? null : {'invalidName': {value: control.value}};
    };}

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required,this.nameValidator()]],
      rollNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.min(4), Validators.max(100)]],
      sex:['',Validators.required]
    });


    
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      this.addStudent.emit(newStudent);
      
      this.studentForm.reset();
      this.formGroupDirective.resetForm();
    }
    
      

      
    
    
  }
}