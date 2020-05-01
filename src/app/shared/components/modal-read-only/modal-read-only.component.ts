import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-read-only',
  templateUrl: './modal-read-only.component.html',
  styleUrls: ['./modal-read-only.component.scss']
})
export class ModalReadOnlyComponent {
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() modalText: string;
}
