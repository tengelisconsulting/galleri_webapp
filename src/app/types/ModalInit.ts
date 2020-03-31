import { Type } from '@angular/core';
import { ModalComponent } from './ModalComponent';

export interface ModalInit {
  component: Type<any>;
  init?: (component: ModalComponent<any>) => void;
}
