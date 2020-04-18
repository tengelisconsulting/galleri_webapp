import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionThumbComponent {

  @Input()
  public id: string;

  public imageUrl: string;

  constructor(
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.imageUrl = `/db/user_collection_thumb?collection_id=eq.${this.id}&select=thumb_b64`;
  }

  public onClick(): void {
    this.router.navigate([
      AppRoutePath.APP_PREFIX, AppRoutePath.IMAGE_COLLECTION
    ], {
      queryParams: {
        collectionId: this.id,
      }
    });
  }

}
