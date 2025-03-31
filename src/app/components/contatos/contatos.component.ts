// src/app/components/contatos/contatos.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
  contatoForm: FormGroup;
  contatos: Contato[] = [];
  editId?: number;

  constructor(private fb: FormBuilder, private contatoService: ContatoService) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadContatos();
  }

  loadContatos() {
    this.contatoService.getAll().subscribe(data => this.contatos = data);
  }

  onSubmit() {
    const contato: Contato = this.contatoForm.value;
    if (this.editId) {
      this.contatoService.update(this.editId, contato).subscribe(() => {
        this.loadContatos();
        this.resetForm();
      });
    } else {
      this.contatoService.create(contato).subscribe(() => {
        this.loadContatos();
        this.resetForm();
      });
    }
  }

  edit(contato: Contato) {
    this.editId = contato.id;
    this.contatoForm.patchValue(contato);
  }

  delete(id: number) {
    this.contatoService.delete(id).subscribe(() => this.loadContatos());
  }

  resetForm() {
    this.contatoForm.reset();
    this.editId = undefined;
  }
}