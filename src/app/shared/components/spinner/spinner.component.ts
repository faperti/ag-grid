import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() inputSpinnerClass: string;

  // spinnerClass = '';

  constructor() {
    console.log('SPINNER ' + this.inputSpinnerClass);
  }

  // ngOnInit(): void {
  //   this.spinnerClass = this.inputSpinnerClass;
  // }

}
