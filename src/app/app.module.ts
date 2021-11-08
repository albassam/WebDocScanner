import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CaptureImageComponent } from './capture-image/capture-image.component';
import { ImageFileSelectorComponent } from './image-file-selector/image-file-selector.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DocumentScannerComponent } from './document-scanner/document-scanner.component';
import { ImagesPaneComponent } from './images-pane/images-pane.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ScannerViewComponent } from './scanner-view/scanner-view.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    CaptureImageComponent,
    ImageFileSelectorComponent,
    DocumentScannerComponent,
    ImagesPaneComponent,
    ScannerViewComponent,
    AboutComponent,
    SettingsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
