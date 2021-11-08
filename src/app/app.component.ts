import { Component } from '@angular/core';
import * as Module from '../assets/wasm/main.js'
import '!!file-loader?name=wasm/main.wasm!../assets/wasm/main.wasm';
import { BehaviorSubject } from 'rxjs';
import { DocScanImageServiceService } from './doc-scan-image-service.service.js';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScanCam - Browser Camera Scanner';
  collapse : boolean = true;

  module: any;
  wasmReady = new BehaviorSubject<boolean>(false)
    public isLoaded: boolean = false;
  isLiveCapture: boolean = false;

  constructor(docScanService: DocScanImageServiceService,
    private spinner: NgxSpinnerService) {

    // show different component for ios devices
    let isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    //this.isLiveCapture = !isiOS;

    spinner.show();
    docScanService.moduleLoaded.subscribe(isLoaded => {
      if (isLoaded) {
        spinner.hide();
        this.isLoaded = true;
        /* Testing 
        console.log(docScanService.module._square(5));
        let memoryBlock = docScanService.module._malloc(20);
        docScanService.module._free(memoryBlock);
        */


      }
    });


  }
}

