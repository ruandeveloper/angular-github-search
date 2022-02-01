import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, MatTooltipModule],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
