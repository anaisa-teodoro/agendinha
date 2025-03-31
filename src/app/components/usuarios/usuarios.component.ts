import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  usuarios: Usuario[] = [];
  editId?: number;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]], // Adicionado minLength
      nivelAcesso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getAll().subscribe(data => this.usuarios = data);
  }

  onSubmit() {
    const usuario: Usuario = this.usuarioForm.value;
    if (this.editId) {
      this.usuarioService.update(this.editId, usuario).subscribe({
        next: () => {
          this.loadUsuarios();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao atualizar usuário:', err);
          alert('Erro ao atualizar usuário');
        }
      });
    } else {
      this.usuarioService.create(usuario).subscribe({
        next: () => {
          this.loadUsuarios();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao criar usuário:', err);
          const errorMessage = err.error?.message || 'Verifique os dados e tente novamente';
          alert(`Erro ao criar usuário: ${errorMessage}`);
        }
      });
    }
  }

  edit(usuario: Usuario) {
    this.editId = usuario.id;
    this.usuarioForm.patchValue(usuario);
  }

  delete(id: number) {
    this.usuarioService.delete(id).subscribe({
      next: () => this.loadUsuarios(),
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        alert('Erro ao deletar usuário');
      }
    });
  }

  resetForm() {
    this.usuarioForm.reset();
    this.editId = undefined;
  }
}