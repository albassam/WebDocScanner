import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { DocScanImageServiceService } from '../doc-scan-image-service.service';
import { DocImage} from './scan-service'


@Component({
  selector: 'app-document-scanner',
  templateUrl: './document-scanner.component.html',
  styleUrls: ['./document-scanner.component.css']
})

export class DocumentScannerComponent implements OnInit, OnChanges {

  @Input()
  imageData : DocImage;

  @Output()
  processingFinished : EventEmitter<DocImage> = new EventEmitter<DocImage>();


  constructor(private docScanService : DocScanImageServiceService) { }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      this.processImage();
  }

  ngOnInit(): void {

  }

  processImage() {
    this.docScanService.moduleLoaded.subscribe(isLoaded => {
      if(isLoaded) {
         let module : any = this.docScanService.moduleLoaded;
         
         let buf = module._malloc(this.imageData.length*1); // char-size
         module.HEAPU8.set(this.imageData.data, buf);
         module.grayScale(buf, this.imageData.length);
         let processedImage = module.HEAPU8.subarray(buf, buf+this.imageData.length);
         module._free(buf); 

         
      }
    });
  }



  



  

}
