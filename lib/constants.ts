export const CMS_NAME = "Mămălagel's Bagels";
export const DOZEN_NAME = "Baker's Dozen"; // used when the dozen_name ACF field is empty
// A baker's dozen is 12 picked bagels + 1 from the baker. Setting dozen_name to
// e.g. "Dozen" in WordPress drops the extra bagel from every order listing.
export const bakersBonus = (dozenName?: string | null) =>
  /baker/i.test(dozenName || DOZEN_NAME) ? '+ 1 from the baker' : '';
