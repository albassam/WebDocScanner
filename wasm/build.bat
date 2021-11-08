emcc main.c  -o main.html -s EXPORTED_FUNCTIONS=['square'] -s ENVIRONMENT='web'

emcc -Os main.c -s -s WASM=1 -s MODULARIZE=1 -o main.wasm;

 -s WASM=1 -s MODULARIZE=1 -o
 
 emcc main.c -Os -s WASM=1 -s MODULARIZE=1 -s ENVIRONMENT='web' -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_FUNCTIONS="['_free', '_malloc']" -o main.js 