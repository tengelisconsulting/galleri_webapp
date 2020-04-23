import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ModalAnchorProtoComponent } from './prototype/modal-anchor-proto/modal-anchor-proto.component';
import { SharedModule } from './modules/shared/shared.module';
import { EditImageCollectionModule } from './modules/edit-image-collection/edit-image-collection.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TopbarComponent,
    ModalAnchorProtoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EditImageCollectionModule,
    BrowserAnimationsModule,
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
