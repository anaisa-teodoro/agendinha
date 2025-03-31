import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './locais.component.html',
  styleUrls: ['./locais.component.css']
})
export class LocaisComponent implements OnInit {
  localForm: FormGroup;
  locais: Local[] = [];
  editId?: number;

  constructor(private fb: FormBuilder, private localService: LocalService) {
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadLocais();
  }

  loadLocais() {
    this.localService.getAll().subscribe(data => this.locais = data);
  }

  onSubmit() {
    const local: Local = this.localForm.value;
    if (this.editId) {
      this.localService.update(this.editId, local).subscribe(() => {
        this.loadLocais();
        this.resetForm();
      });
    } else {
      this.localService.create(local).subscribe(() => {
        this.loadLocais();
        this.resetForm();
      });
    }
  }

  edit(local: Local) {
    this.editId = local.id;
    this.localForm.patchValue(local);
  }

  delete(id: number) {
    this.localService.delete(id).subscribe(() => this.loadLocais());
  }

  resetForm() {
    this.localForm.reset();
    this.editId = undefined;
  }
}