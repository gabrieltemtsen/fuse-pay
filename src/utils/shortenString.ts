export function shortenString(inputString: string): string {
  if (inputString.length <= 8) {
    return inputString;
  } else {
    return inputString.slice(0, 30) + "….";
  }
}
