import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SharedModule } from './modules/shared/shared.module';
import { EditImageCollectionModule } from './modules/edit-image-collection/edit-image-collection.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BaseModalComponent } from './ui/components/base-modal/base-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TopbarComponent,
    BaseModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EditImageCollectionModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
  ],
  entryComponents: [
        BaseModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    injector: Injector,
  ) {
    AppComponent.injector = injector;
  }
}
