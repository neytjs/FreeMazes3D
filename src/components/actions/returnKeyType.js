function returnKeyType(key_num, global_language) {
  let key = "";
  switch (key_num) {
    case 1:
      key = global_language.text.global.key_types.copper;
    break;
    case 2:
      key = global_language.text.global.key_types.silver;
    break;
    case 3:
      key = global_language.text.global.key_types.gold;
    break;
  }
  return key;
}

export {returnKeyType};
