import { AbstractControl } from '@angular/forms';

export class commonValidation {

  static checkPassword(control: AbstractControl): { [key: string]: boolean } | null {
  console.log("****",control.parent); 
  let parent = control.parent
  if (parent) {
    let password = parent.get('password').value;
    let confirmPassword = control.value;

    if (password != confirmPassword) {
      return { pass: true };
    } else {
      return {
        pass:null
      };
    }
  } else {
   
 
    return {
      pass:null
    };
  }
}
static checkOption(control: AbstractControl): { [key: string]: boolean } | null {
  //console.log("****",control.value); 
 if(control.value.length >1 && control.value.length<7)
 {
   return {
     optionerror: false
   };
 }
 else{
  return {
    optionerror: true
  };
 }
 
}

}