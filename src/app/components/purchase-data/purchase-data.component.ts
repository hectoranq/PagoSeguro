import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-data.component.html',
  styleUrls: ['./purchase-data.component.scss']
})
export class PurchaseDataComponent {

  productImage: string | null = null;


  form: FormGroup = this.formBuilder.group({
    sellerPhone: ['', Validators.required],
    productName: ['', Validators.required],
    agreedPrice: ['', Validators.required],
    productImage: [''] // opcional, podrías manejar la imagen como base64 si lo deseas
  });

  constructor(private formBuilder: FormBuilder) {}

 
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  searchSellerPhone(): void {
    alert(`Buscando vendedor con número: `);
    // Aquí puedes implementar la lógica de búsqueda real (API, filtrado, etc.)
  }

  handleImageUpload(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
