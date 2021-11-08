#include <emscripten.h>
#include <stdlib.h>
#include <string.h>
#include "pdfgen.h"


EMSCRIPTEN_KEEPALIVE void convertToGrayscale (unsigned char* data, int width, int height) {
  int length = width*height*4;
  for (unsigned int i = 0; i < length; i += 4) {
	char g = (float)(data[i]+data[i+1]+data[i])/3.0;
    data[i] = g;
    data[i+1] = g;
    data[i+2] = g;
  }

}

unsigned char* convertToBW (unsigned char* data, int width, int height) {
  int length = width*height*4;
  unsigned char* bw = malloc(width * height);
  for (unsigned int i = 0; i < length; i += 4) {
     unsigned char g = (float)(data[i]+data[i+1]+data[i+2])/3.0;

  
	g = g<126 ? 0 : 254;
	bw[i/4] = g;
    data[i] = g;
    data[i+1] = g;
    data[i+2] = g;
	
  }
  
  return bw;

}


EMSCRIPTEN_KEEPALIVE int generatePDF(unsigned char* data, int width, int height, char* buffer)
{
	unsigned char* bw = convertToBW (data, width, height);
	

	if(width > height) {
		int temp = width;
		width = height;
		height = temp;
	}
	
	float doc_width = 550.0;
	float doc_height = doc_width*(height/(float)width);
	if(width < doc_width) {
		doc_width = width;
		doc_height = doc_width*(height/(float)width);
	}
	
	// expect data to be grayscale
       struct pdf_info info = {.creator = "ScanCam.xyz",
                            .producer = "ScanCam.xyz",
                            .title = "-",
                            .author = "-",
                            .subject = "-"};
    struct pdf_doc *pdf = pdf_create(PDF_A4_WIDTH, PDF_A4_HEIGHT, &info);

    pdf_set_font(pdf, "Times-Roman");
    pdf_append_page(pdf);
	pdf_add_raw_image(pdf, NULL, 20, 100,doc_width,doc_height,
                bw, width, height);

	pdf_add_text(pdf, NULL, "Scanned by ScanCam.xyz - the offline camera scanner", 10, 20, 30, PDF_RGB(0, 0,0xff));
    
	
	size_t size = 0;
	char* pdfData = pdf_save_buffer(pdf, &size);
	memcpy(buffer, pdfData, size);
	free(bw);
    free(pdfData);
	
    pdf_destroy(pdf);
	return (int) size;
}



EMSCRIPTEN_KEEPALIVE void drawBoundary (unsigned char* data, int width, int height) {
// 
	
}


char convoluteAt(unsigned int x, unsigned  int y, 
               unsigned char* data, unsigned  int width, unsigned  int height, 
			   unsigned char* kernel, unsigned short kw, unsigned short kh) {
	int si = 0;
	int sj = 0;
	if(x < kw/2) {
		si = kw/2-x;
	}
	if(y < kh/2) {
		sj = kh/2-y;
	}
	
	int ei = kw;
	int ej = kh;
	if(width-x-1 < kw/2) {
		ei = kw - width-x-1;
	}
	
	if(height-y-1 < kh/2) {
		ej = kh - height-y-1;
	}
	int sum = 0;
	for (unsigned int i = si; i < ei ; i++) 
		for (unsigned int j = sj; j < ej ; j++) {
			sum += data[(y+j-kh/2)*width+(i+si-kw/2)]*kernel[j*ei+i];
		}
	
	return (char)(sum/159.0); // TODO factor 
		  
}


void convolute(unsigned char* data, unsigned int width, unsigned int height, unsigned char* kernel, unsigned short kw, unsigned short kh) {
	
	char* pImagePost = (char*)malloc(width*height);
	
	for (unsigned int i = 0; i < width ; i++) 
		for (unsigned int j = 0; j < height ; j++) {
			pImagePost[j*width+i] = convoluteAt(i,j, data, width, height, kernel, kw, kh);
		}
    memcpy(data, pImagePost, width*height);
	free(pImagePost);
}


EMSCRIPTEN_KEEPALIVE void edgeDetection(unsigned char* data, unsigned int width, unsigned int height) {
	unsigned char kernel[] = {2, 4, 5, 4, 2,
	                 4, 9,12, 9, 4,
				     5,12,15,12, 5,
				     4, 9,12, 9, 4,
	                 2, 4, 5, 4, 2}; 
	float factor = 159;
	//convolute(data, width,height, kernel, 5, 5);
}

void houghLinesDetection(unsigned char* data, unsigned int width, unsigned int height) {
	

}