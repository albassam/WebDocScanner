import { Component, OnInit } from '@angular/core';
import { DocScanImageServiceService } from '../doc-scan-image-service.service'

@Component({
  selector: 'app-scanner-view',
  templateUrl: './scanner-view.component.html',
  styleUrls: ['./scanner-view.component.css']
})
export class ScannerViewComponent implements OnInit {

  public isLoaded: boolean = false;
  isLiveCapture: boolean = false;
  constructor(private docScanService : DocScanImageServiceService) { }

  ngOnInit(): void {
    this.docScanService.moduleLoaded.subscribe(isLoaded => {
      if (isLoaded) {
        this.isLoaded = true;
      }
    });
  }

}
