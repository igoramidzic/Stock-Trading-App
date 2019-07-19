import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINLAYOUT_ROUTES } from './main-layout.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    RouterModule.forChild(MAINLAYOUT_ROUTES)
  ],
  exports: [
  ],
  providers: []
})
export class MainLayoutModule { }
