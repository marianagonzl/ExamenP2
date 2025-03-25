import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { ItemService , Item } from '../item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  itemText = ''; 
  marketItem = '';
  items$: Observable<Item[]> = new Observable(); // Cambiar a Observable para Firestore
  editingItemId: string | null = null; 

  constructor(private itemService: ItemService, private authService: AuthService, private router: Router) {} 

  ngOnInit() {
    this.items$ = this.itemService.getItems(); // Obtener tareas desde Firestore
  }

  addSong() {
    console.log('Agregando canción:', this.itemText);
    if (this.itemText.trim()) {
      const newItem: Item = { title: this.itemText, done: false };

      if (this.editingItemId) {
        this.itemService.updateItem(this.editingItemId, { title: this.itemText }).then(() => {
          this.editingItemId = null; 
          this.itemText = '';
        });
      } else {
        this.itemService.addItem(newItem).then(() => {
          this.itemText = '';
        });
      }
    }
  }

  editItem(item: Item) {
    this.itemText = item.title;
    this.editingItemId = item.id || null;
  }

  deleteSong(itemId: string) {
    this.itemService.deleteItem(itemId);
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
  addItem() {
    this.addSong(); // Reusa tu lógica
  }
  
}