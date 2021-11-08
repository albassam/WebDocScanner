import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.css']
})
export class CaptureImageComponent implements OnInit {

  @ViewChild('previewCanvas', { static: false }) previewCanvas: ElementRef;
  @ViewChild('video', { static: false }) video: ElementRef;
  isStreaming: boolean = false;
  height: number = 0;
  width: number = 320;
  previewContext: CanvasRenderingContext2D;
  showVideo: boolean = true;


  constructor() {
  }

  ngAfterViewInit(): void {
    this.previewContext = (<HTMLCanvasElement>this.previewCanvas.nativeElement).getContext('2d');
    let videoElement = this.video.nativeElement;
    videoElement.onloadedmetadata = function(e) {
      videoElement.play();
    };
    const constraints = {
      audio: false,
      video: {
       facingMode: 'environment'
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('playsinline', '');
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }

  ngOnInit(): void {

  }

  public playing($event) {
    if (!this.isStreaming) {
      this.height = this.video.nativeElement.videoHeight / (this.video.nativeElement.videoWidth / this.width);

      this.video.nativeElement.setAttribute('width', this.width);
      this.video.nativeElement.setAttribute('height', this.height);
      this.previewCanvas.nativeElement.setAttribute('width', this.width);
      this.previewCanvas.nativeElement.setAttribute('height', this.height);
      this.isStreaming = true;
    }
  }

  public takePicture() {

    if (this.width && this.height) {
      this.previewCanvas.nativeElement.width = this.width;
      this.previewCanvas.nativeElement.height = this.height;
      this.previewContext.drawImage(this.video.nativeElement, 0, 0, this.width, this.height);
    }
    this.video.nativeElement.pause();
    this.video.nativeElement.removeAttribute('src'); // empty source
    this.video.nativeElement.load();
    this.showVideo = false;
  }


}
