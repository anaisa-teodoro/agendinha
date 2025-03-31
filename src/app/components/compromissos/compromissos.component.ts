import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompromissoService } from '../../services/compromisso.service';
import { ContatoService } from '../../services/contato.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { Compromisso } from '../../models/compromisso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compromissos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compromissos.component.html',
  styleUrls: ['./compromissos.component.css']
})
export class CompromissosComponent implements OnInit {
  compromissoForm: FormGroup;
  compromissos: Compromisso[] = [];
  contatos: any[] = [];
  locais: any[] = [];
  editId?: number;

  constructor(
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private localService: LocalService,
    private authService: AuthService
  ) {
    this.compromissoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      contatoId: [null, Validators.required],
      localId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadCompromissos();
    this.contatoService.getAll().subscribe(data => this.contatos = data);
    this.localService.getAll().subscribe(data => this.locais = data);
  }

  loadCompromissos() {
    this.compromissoService.getAll().subscribe(data => {
      const user = this.authService.getCurrentUser();
      this.compromissos = this.authService.isAdmin() 
        ? data 
        : data.filter(c => c.usuarioId === user.id);
    });
  }

  onSubmit() {
    const compromisso: Compromisso = {
      ...this.compromissoForm.value,
      usuarioId: this.authService.getCurrentUser().id
    };
    if (this.editId) {
      this.compromissoService.update(this.editId, compromisso).subscribe(() => {
        this.loadCompromissos();
        this.resetForm();
      });
    } else {
      this.compromissoService.create(compromisso).subscribe(() => {
        this.loadCompromissos();
        this.resetForm();
      });
    }
  }

  edit(compromisso: Compromisso) {
    this.editId = compromisso.id;
    this.compromissoForm.patchValue(compromisso);
  }

  delete(id: number) {
    this.compromissoService.delete(id).subscribe(() => this.loadCompromissos());
  }

  resetForm() {
    this.compromissoForm.reset();
    this.editId = undefined;
  }
}