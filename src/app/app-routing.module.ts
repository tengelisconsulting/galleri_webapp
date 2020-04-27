import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePath } from './core/routing/AppRoutePath';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/routing/auth.guard';


const routes: Routes = [
  {
    path: AppRoutePath.APP_PREFIX,
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: AppRoutePath.YOUR_GALLERY, pathMatch: 'full' },
      {
        path: AppRoutePath.YOUR_GALLERY,
        loadChildren: () => import('./modules/your-gallery/your-gallery.module')
          .then((m) => m.YourGalleryModule),
      }, {
        path: AppRoutePath.EDIT_IMAGE_COLLECTION,
        loadChildren: () => import("./modules/edit-image-collection/edit-image-collection.module")
          .then((m) => m.EditImageCollectionModule),
      }, {
        path: AppRoutePath.IMAGE_COLLECTION,
        loadChildren: () => import("./modules/image-collection/image-collection.module")
          .then((m) => m.ImageCollectionModule),
      }, {
        path: AppRoutePath.YOUR_IMAGE_COLLECTION,
        loadChildren: () => import("./modules/your-image-collection/your-image-collection.module")
          .then((m) => m.YourImageCollectionModule),
      }
    ],
  },
  {
    path: AppRoutePath.LOGIN,
    loadChildren: () => import('./modules/login/login.module')
      .then((m) => m.LoginModule)
  },
  { path: '**', redirectTo: AppRoutePath.LOGIN, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
