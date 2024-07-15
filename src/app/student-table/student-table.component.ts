import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Student } from '../student';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, MatCardModule,MatRadioModule]
})
export class StudentTableComponent {
  @Input() students: Student[] = [];
  @Output() editStudent = new EventEmitter<Student>();
  @Output() deleteStudent = new EventEmitter<Student>();

  columnDefinitions = [
    {def:'id',label:'id'},
    { def: 'name', label: 'Name' },
    { def: 'rollNumber', label: 'Roll Number' },
    { def: 'age', label: 'Age' },
    {def:'sex', label:'Sex'},
    { def: 'actions', label: 'Actions' },
    
  ];

  displayedColumns = this.columnDefinitions.map(c => c.def);

  editingStudent: Student | null = null;

  startEdit(student: Student) { //starting edit
    this.editingStudent = { ...student };
  }

  cancelEdit() {  //canceling edit
    this.editingStudent = null;
  }

  saveEdit() { // saving edit information and sending the selected student to app component
    if (this.editingStudent) {
      this.editStudent.emit(this.editingStudent);
      this.editingStudent = null;
    }
  }

  onDelete(student: Student) { //sending the selected student to app component
    this.deleteStudent.emit(student);
  }

  isEditValid(): boolean {   //validations when editing
    return !!(this.editingStudent &&
      this.editingStudent.name &&
      this.editingStudent.name.match(/^[a-zA-Z\s]*$/) &&
      this.editingStudent.rollNumber &&
      this.editingStudent.rollNumber.match(/^[0-9]+$/) &&
      this.editingStudent.age &&
      this.editingStudent.age >= 4 &&
      this.editingStudent.age <= 100 &&
      this.editingStudent.sex);
  }
}