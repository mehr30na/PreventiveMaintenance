import {ImageStatus} from '../base/helper/enum/ImageStatus';

export class Image {
  id: number;
  extension: string;
  path: string;
  smallPath: string;
  size: number;
  width: number;
  height: number;
  alt: string;
  caption: string;
  imageData: string;
  imageStatus: ImageStatus = ImageStatus.WITHOUT_IMAGE;
}
