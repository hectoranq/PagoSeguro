import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  otpLength = 4;
  otpValues: string[] = Array(this.otpLength).fill('');
  otpArray = new Array(this.otpLength);
  
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Enfocar el primer input
    this.otpInputs.first.nativeElement.focus();
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length > 1) {
      input.value = value.charAt(0);
    }

    this.otpValues[index] = input.value;

    // Ir al siguiente input
    if (value && index < this.otpLength - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    // Emitir el código completo si ya está lleno
    if (this.otpValues.every(v => v !== '')) {
      const otpCode = this.otpValues.join('');
      console.log('Código OTP:', otpCode);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }
}
