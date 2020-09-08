import { ModalService } from './../../core/services/modal.service';
import {
  Component,
  OnInit,
  ViewChild,
  ContentChild,
  TemplateRef,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ContentChild(TemplateRef) modal: TemplateRef<any>;
  @Input() title: string;
  @Input() id: string;

  public isModalOpen: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.add(this);
  }

  @ViewChild('modalElement') modalElement;
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement): void {
    const clickedInside = this.modalElement.nativeElement.contains(
      targetElement
    );

    if (clickedInside && this.isModalOpen) {
      this.close();
    }
  }

  open(): void {
    this.isModalOpen = true;
  }

  close(): void {
    this.modalService.setModalState(false);
    this.isModalOpen = false;
  }
}
