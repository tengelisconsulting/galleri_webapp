import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from 'src/app/modules/shared/spinner/spinner.service';
import { CollectionService } from 'src/app/core/data/collection.service';

@Component({
  selector: 'app-collection-delete',
  templateUrl: './collection-delete.component.html',
  styleUrls: ['./collection-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionDeleteComponent {

  @Input()
  private collectionId: string;

  @Output()
  // true on confirm
  public onSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private collectionService: CollectionService,
    private spinnerService: SpinnerService,
  ) { }

  public async confirm(): Promise<void> {
    this.spinnerService.showSpinner();
    await this.collectionService.deleteCollection(this.collectionId);
    this.spinnerService.hideSpinner();
    this.onSubmit.emit(true);
  }

  public cancel(): void {
    this.onSubmit.emit(false);
  }

}
