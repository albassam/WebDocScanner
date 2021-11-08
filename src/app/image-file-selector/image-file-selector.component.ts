import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DocScanImageServiceService } from '../doc-scan-image-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image-file-selector',
  templateUrl: './image-file-selector.component.html',
  styleUrls: ['./image-file-selector.component.css']
})
export class ImageFileSelectorComponent implements OnInit {

  @ViewChild('imageFileInput', { static: false }) imageFileInput: ElementRef;
  @ViewChild('previewCanvas', { static: false }) previewCanvas: ElementRef;
  previewContext: CanvasRenderingContext2D;
  height : number;
  width : number;
  imagePath : any;
  generatedPDF : any = undefined;


  constructor(private docScanService : DocScanImageServiceService,
             private spinner: NgxSpinnerService) {
   }


  ngOnInit(): void {
      this.imagePath = "assets/document.png"
  }

  ngOnAfterViewInit() {
    this.takePicture();
  }

  takePicture() {
    this.imageFileInput.nativeElement.click();
  }

  ngAfterViewInit(): void {
    this.previewContext = (<HTMLCanvasElement>this.previewCanvas.nativeElement).getContext('2d');
  }

  fileSelectedEvent(fileSelected) {
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      let fileReader: FileReader = new FileReader();
      let context = this.previewContext;
      let canvas = this.previewCanvas.nativeElement;
      context.imageSmoothingEnabled = true;
      let img = new Image();
      let element = this;
      fileReader.onload = function (event) {
        img.onload = function () {
            element.height = img.height;
            element.width = img.width;
            context.canvas.height= element.height;
            context.canvas.width= element.width;
            context.drawImage(img, 0, 0 );
            console.log("image dims="+img.width,","+img.height);
            element.wasmTest();

        
        }
        img.src = event.target.result as string;
        element.imagePath = fileReader.result;

      }

      fileReader.readAsDataURL(fileSelected.target.files[0]); 
    }
  }

  wasmTest() {

     let element = this;
     let module : any = element.docScanService.module;
     let imageData = element.previewContext.getImageData(0, 0, element.width, element.height);
     let data = imageData.data;
     let len = element.height*element.width*4;
     let buf = module._malloc(len); // char-size
     module.HEAPU8.set(data, buf);
     module._edgeDetection(buf, element.width, element.height);
     let outputBuffer = module._malloc(len); // char-size
     let outputLength = module._generatePDF(buf,element.width, element.height, outputBuffer);
     this.generatedPDF = new Uint8ClampedArray(module.HEAPU8.buffer, outputBuffer, outputLength);
     module._free(buf);
     module._free(outputBuffer);
     let newImageData = new ImageData(new Uint8ClampedArray(module.HEAPU8.buffer, buf, len), element.width,element.height)
     element.previewContext.putImageData(newImageData,0, 0);
     element.imagePath = element.previewCanvas.nativeElement.toDataURL();
    }

    download() {
      let filename = ""+Date.now()+".pdf";
      let element = document.createElement('a');
      let blob = new Blob([this.generatedPDF], {type: "application/pdf"});
      element.setAttribute('download', filename)
      element.setAttribute('href', URL.createObjectURL(blob));  
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();   
      document.body.removeChild(element);
      
    }
   // });
 // }
}

 
