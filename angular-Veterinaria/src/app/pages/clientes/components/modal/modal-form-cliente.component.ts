import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesServiceFAKE } from '../../services/clientesFAKE.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

enum Action {
    EDIT = 'edit',
    NEW = 'new',
}

@Component({
    selector: 'modal-form-cliente',
    templateUrl: './modal-form-cliente.component.html',
    styleUrls: ['./modal-form-cliente.component.css']
})
export class ModalFormClientComponent implements OnInit {

    action = Action.NEW;

    public formaCliente = this.fb.group({
        id_usuario: [0],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        direccion: ['', Validators.required],
        nombreMascota: ['', Validators.required],
    });

    get id_usuario() { return this.formaCliente.get('id_usuario'); }
    get nombre() { return this.formaCliente.get('nombre'); }
    get apellido() { return this.formaCliente.get('apellido'); }
    get correo() { return this.formaCliente.get('correo'); }
    get direccion() { return this.formaCliente.get('direccion'); }
    get nombreMascota() { return this.formaCliente.get('nombreMascota'); }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private clienteService: ClientesServiceFAKE
    ) { }

    ngOnInit(): void {
        if (this.data?.hasOwnProperty('id_usuario')) {
            this.action = Action.EDIT;
            this.pathFormData();
        }
    }

    public onSave(): void {
        const formValue = this.formaCliente.value;

        if (this.action == Action.NEW) {
            this.clienteService.new(formValue).subscribe({
                next: (data) => {
                    console.log('Cliente: ', data)
                },
                error: (err) => { console.error(err); }
            });
        } else {
            this.clienteService.update(formValue).subscribe({
                next: (data) => {
                    console.log('Cliente: ', data)
                },
                error: (err) => { console.error(err); }
            });
        }
    }

    private pathFormData(): void {
        this.formaCliente.patchValue({
            id_usuario: this.data?.id_usuario,
            nombre: this.data?.nombre,
            apellido: this.data?.apellido,
            correo: this.data?.correo,
            direccion: this.data?.direccion,
            nombreMascota: this.data?.nombreMascota,
        });
    }
}
