export const convertDigitsToArabic = (enDigit: string) => {
  let newValue = "";
  for (let i = 0; i < enDigit.length; i++) {
    let ch = enDigit.charCodeAt(i);
    if (ch >= 48 && ch <= 57) {
      let newChar = ch + 1584;
      newValue = newValue + String.fromCharCode(newChar);
    } else
      newValue = newValue + String.fromCharCode(ch);
  }
  return newValue;
}
