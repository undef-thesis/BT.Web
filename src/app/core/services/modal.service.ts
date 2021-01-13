import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new Subject<any>();
  private modals: any[] = [];

  public setModalState(isOpen: boolean) {
    this.modalState.next({ isOpen });
  }

  public clearModalState() {
    this.modalState.next();
  }

  public getModalState(): Observable<any> {
    return this.modalState.asObservable();
  }

  public add(modal: any): void {
    this.modals.push(modal);
  }

  public remove(id: string): void {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  public open(id: string): void {
    const modal = this.modals.find((x) => x.id === id);
    this.modalState.next({ isOpen: true });
    modal.open();
  }

  public close(id: string): void {
    const modal = this.modals.find((x) => x.id === id);
    this.modalState.next({ isOpen: false });
    modal.close();
  }
}
