import {AbstractControl, ValidationErrors} from "@angular/forms"

export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  const upperCaseCharacters = /[A-Z]+/g
  if (!upperCaseCharacters.test(value)) {
    return {passwordStrength: `Upper case required`};
  }

  const lowerCaseCharacters = /[a-z]+/g
  if (!lowerCaseCharacters.test(value)) {
    return {passwordStrength: `Lower case required`};
  }

  const numberCharacters = /[0-9]+/g
  if (!numberCharacters.test(value)) {
    return {passwordStrength: `Number required`};
  }

  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (!specialCharacters.test(value)) {
    return {passwordStrength: `Special char required`};
  }

  const minLength = 8;
  if (value.length < minLength) {
    return {passwordStrength: `you need at least 8 symbols`};
  }

  return null;
}
