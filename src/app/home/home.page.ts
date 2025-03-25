import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { ItemService, Item } from '../item.service';
import { Auth } from '@angular/fire/auth';

interface Student {
  name: string;
  lastName: string;
  matricula: string;
  email: string;
  grades: {
    damm: number;
    oca: number;
    mate: number;
    pmp: number;
    m3d: number;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  
  studentName = '';
  studentLastName = '';
  studentMatricula = '';
  studentEmail = '';
  studentGrades = {
    damm: 0,
    oca: 0,
    mate: 0,
    pmp: 0,
    m3d: 0
  };
  students: Student[] = []; 

  constructor(private authService: AuthService, private router: Router, private auth: Auth) {}

  ngOnInit() {
    this.checkAuth();
  }

  
  checkAuth() {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  
  addStudent() {
    if (
      this.studentName &&
      this.studentLastName &&
      this.studentMatricula &&
      this.studentEmail &&
      this.studentGrades.damm != null &&
      this.studentGrades.oca != null &&
      this.studentGrades.mate != null &&
      this.studentGrades.pmp != null &&
      this.studentGrades.m3d != null
    ) {
      const newStudent: Student = {
        name: this.studentName,
        lastName: this.studentLastName,
        matricula: this.studentMatricula,
        email: this.studentEmail,
        grades: { ...this.studentGrades }
      };

      this.students.push(newStudent);
      this.resetForm();
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  
  resetForm() {
    this.studentName = '';
    this.studentLastName = '';
    this.studentMatricula = '';
    this.studentEmail = '';
    this.studentGrades = { damm: 0, oca: 0, mate: 0, pmp: 0, m3d: 0 };
  }

  
  async logout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
