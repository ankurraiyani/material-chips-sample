import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';


export interface Email {
  emailList: JsonObject[];
  errorMsg: string;
  placeHolder: string;
}

@Component({
  selector: 'app-mat-chips',
  templateUrl: './mat-chips.component.html',
  styleUrls: ['./mat-chips.component.css']
})
export class MatChipsComponent {

  readonly separatorKeysCodes = [ENTER, COMMA, SEMICOLON] as const;
  readonly EMAIL_PLACEHOLDER = 'Enter upto 5 emails...';

  toEmailObj: Email = {emailList: [], errorMsg: '', placeHolder: this.EMAIL_PLACEHOLDER};
  
  ccEmailObj: Email = {emailList: [], errorMsg: '', placeHolder: this.EMAIL_PLACEHOLDER};

  addEmail(event: MatChipInputEvent, emailObj: Email): void {
    const value = (event.value || '').trim().toLowerCase();

    if (value) {

      //Once a value is placed, remove place holder
      emailObj.placeHolder = '';

      //Allow users to enter only 5 email ids
      if (emailObj.emailList.length == 5) {
        emailObj.errorMsg = 'You can enter only upto 5 email ids';
        return;
      }

      //add value to the list as mark it as invalid
      let newObj = {
        email: value,
        isValid: false,
      };

      newObj.isValid = this.validateEmail(newObj, emailObj);

      emailObj.emailList.push(newObj);

    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeEmail(toEmail: JsonObject, emailObj: Email): void {

    const index = emailObj.emailList.indexOf(toEmail);

    //if object is in the list then remove using splice method
    if (index >= 0) {
      emailObj.emailList.splice(index, 1);
    }

    //If all the values are removed from list then show placeholder
    //Else again validate all invalid objects
    if (emailObj.emailList.length == 0) {
      emailObj.placeHolder = this.EMAIL_PLACEHOLDER;
    } else {
      //validate all the invalid objects
      this.validateInvalid(emailObj);
    }
  }

  /**
   * Validate all the invalid email objects and set error message accordingly.
   * 
   * @param emailList 
   * @param erroObj 
   */
  validateInvalid(emailObj: Email): void {

    //Reset error message
    emailObj.errorMsg = '';

    emailObj.emailList.forEach(email => {
      //For invalid objects, validate again
      if (!email.isValid)
        email.isValid = this.validateEmail(email, emailObj);

    });
  }
  
  /**
   * Validate email value and check for duplicate as well.
   * Set the error message accordingly in give errorObj.
   * 
   * @param newEmailObj 
   * @param emailList 
   * @param erroObj 
   * @returns 
   */
  validateEmail(newEmailObj: JsonObject, emailObj: Email): boolean {

    //Validate the value is an email id
    let isValid = this.isValidEmail(newEmailObj.email as string);

    //If it's not email value then set error message
    //othewise if is an email in list then check for duplicate value
    if (!isValid) {
      emailObj.errorMsg = 'Please enter a valid email address.';
    } else if (emailObj.emailList.length > 0) {
      isValid = !this.isDuplicateEmail(newEmailObj, emailObj.emailList);

      //If it's duplicate value then set error message.
      if (!isValid)
        emailObj.errorMsg = '"' + newEmailObj.email + '" already exists.';
    }

    return isValid;
  }

  isValidEmail(value: string): boolean {
    const regexp = new RegExp(/^[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,4}(?:,[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,4}){0,4}$/);
    return regexp.test(value);
  }

  isDuplicateEmail(emailObj: JsonObject, emailList: JsonObject[]): boolean {
    return emailList.some(email => {
      return email != emailObj && email.email == emailObj.email;
    });
  }

}
