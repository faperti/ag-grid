import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() inputSpinnerClas: string;

  // spinnerClass = '';

  // constructor() {
  //   this.spinnerClass = this.inputSpinnerClass;
  //   console.log('SPINNER ' + this.spinnerClass);
  // }
  // ngOnInit(): void {
  //   this.spinnerClass = this.inputSpinnerClass;
  // }

}
