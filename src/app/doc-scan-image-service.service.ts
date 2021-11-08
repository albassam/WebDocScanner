import * as Module from '../assets/wasm/main.js'
import '!!file-loader?name=wasm/main.wasm!../assets/wasm/main.wasm';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocScanImageServiceService {

  module: any;
  isLoaded : boolean = false;
  moduleLoaded : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadModule();
  }

  public async loadModule() {
    if(this.isLoaded) return;

    fetch('wasm/main.wasm').then(async wasm => {
      let byteCode = await wasm.arrayBuffer();
      const args = {
        wasmBinary: byteCode,
        onRuntimeInitialized: () => {
          this.moduleLoaded.next(true);
          this.isLoaded = true;
        }
      }
      this.module = Module(args);
    })
      .catch(error => { console.error("error occured while loading wasm files: ", error) });
  }

  isModuleLoaded() : boolean {
    return this.isLoaded;
  }

}
