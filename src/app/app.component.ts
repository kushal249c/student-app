
import { Component } from '@angular/core';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { Student } from './student';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [StudentFormComponent, StudentTableComponent]
})
export class AppComponent {
  students: Student[] = [];
  nextId = 1;

  addStudent(student: Omit<Student, 'id'>) {   //adding the student form data to student array
    const newStudent = { ...student, id: this.nextId++ };
    this.students.push(newStudent);
    this.students = [...this.students];
  }

  editStudent(updatedStudent: Student) {   // saving the edited or updated student info
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.students = [...this.students];
    }
  }

  deleteStudent(student: Student) {  //deleting the student from array
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.students = [...this.students];
    }
  }
}