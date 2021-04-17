function returnKeyType(key_num) {
  let key = "";
  switch (key_num) {
    case 1:
      key = "copper";
    break;
    case 2:
      key = "silver";
    break;
    case 3:
      key = "gold";
    break;
  }
  return key;
}

export {returnKeyType};
