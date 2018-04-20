/**
 * Created by milad on 12/13/17.
 */
import {User} from "../management/userManagement/user";
import {Image} from "../Image";

export class Category {
  id: number;
  // name: string;
  // description: string;
  // categoryUsers: Array<User>;
  // parentCategory: Category;
  // childrenCategory:Set<Category>;
  parentId:number;
  name:string;
  description:string;
  persianName:string;
  image:Image=new Image();
}
