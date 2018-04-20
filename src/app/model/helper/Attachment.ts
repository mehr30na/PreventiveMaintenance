import {FileStatus} from '../../base/helper/enum/FileStatus';

export class Attachment {
  extension: string;
  path: string;
  size: number;
  caption: string;
  fileStatus: FileStatus;
  fileData: string;
}
