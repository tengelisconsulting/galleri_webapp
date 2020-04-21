import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public static THUMBNAIL_HEIGHT = 250;
  public static THUMBNAIL_WIDTH = 404;

  constructor() { }

  public getImageB64(
    file: File,
    height: number,
    width: number,
    quality: number
  ): Promise<string> {
    return new Promise((resolve, _reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (ev) => {
        const imageBlob = new Blob([(ev.target as any).result]);
        const blobURL = URL.createObjectURL(imageBlob);
        const image = new Image();
        image.src = blobURL;
        image.onload = () => {
          const resized = this.resizeImageToB64(
            image, height, width, quality
          );
          const dataB64 = resized.match(/data:image\/jpeg;base64,(.*)/)[1]
          URL.revokeObjectURL(blobURL);
          resolve(dataB64);
        }
      }
    });
  }

  public resizeImageToB64(
    im: CanvasImageSource,
    height: number,
    width: number,
    quality: number
  ): string {
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(im, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
  }
}
