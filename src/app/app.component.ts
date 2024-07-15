// import { Component } from '@angular/core';
// import { Student } from './student';
// import { StudentFormComponent } from './student-form/student-form.component';
// import { StudentTableComponent } from './student-table/student-table.component';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   imports: [StudentFormComponent, StudentTableComponent],
//   standalone: true
// })
// export class AppComponent {
  

//   students: Student[] = [];
//   constructor(private dialog:MatDialog){

//   }

//   addStudent(student: Student) {
//     console.log(student);
//     console.log("in app component")
//     this.students.push(student);
//   // Create a new array reference to trigger change detection
//   this.students = [...this.students];
//   }

  
//     deleteStudent(student: Student) {
//       const index = this.students.findIndex(s => s.rollNumber === student.rollNumber);
//       if (index !== -1) {
//         this.students.splice(index, 1);
//         this.students = [...this.students];
//       }
//     }

//     editStudent(student: Student) {
//       const dialogRef = this.dialog.open(StudentFormComponent, {
//         width: '250px',
//         data: { ...student }
//       });
  
//       dialogRef.afterClosed().subscribe(result => {
//         if (result) {
//           const index = this.students.findIndex(s => s.rollNumber === student.rollNumber);
//           if (index !== -1) {
//             this.students[index] = { ...result, rollNumber: student.rollNumber};
//             this.students = [...this.students];
//           }
//         }
//       });
//     }
  
// }


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

  addStudent(student: Omit<Student, 'id'>) {
    const newStudent = { ...student, id: this.nextId++ };
    this.students.push(newStudent);
    this.students = [...this.students];
  }

  editStudent(updatedStudent: Student) {
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.students = [...this.students];
    }
  }

  deleteStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.students = [...this.students];
    }
  }
}