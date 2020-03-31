import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ModalAnchorProtoComponent } from './prototype/modal-anchor-proto/modal-anchor-proto.component';
import { CollectionDisplayComponent } from './modules/shared/collection-display/collection-display.component';
import { SharedModule } from './modules/shared/shared.module';


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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
