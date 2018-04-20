import {DocumentFile} from "./documentFile";

/**
 * Created by milad on 12/14/17.
 */
export class Document {
  id: number;
  name: string;
  extension: string;
  path: string;
  size: number;
  caption: string;
  contentType: string;
  documentFiles: Array<DocumentFile>;
  serial: string;
  description: string;
  dateOfRegistration: Date;
}
