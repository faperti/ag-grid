import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input() src: string;

  constructor( ) { }

  ngOnInit() {
    console.log('ATTACHMENT COMPONENT');
    this.src = 'http://localhost:4200/assets/12345.pdf';
  }

}
