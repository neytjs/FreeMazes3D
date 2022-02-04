function assignKeyCode(key) {
  let key_num = 0;
  switch (key) {
    case "a":
      key_num = 65;
    break;
    case "b":
      key_num = 66;
    break;
    case "c":
      key_num = 67;
    break;
    case "d":
      key_num = 68;
    break;
    case "e":
      key_num = 69;
    break;
    case "f":
      key_num = 70;
    break;
    case "g":
      key_num = 71;
    break;
    case "h":
      key_num = 72;
    break;
    case "i":
      key_num = 73;
    break;
    case "j":
      key_num = 74;
    break;
    case "k":
      key_num = 75;
    break;
    case "l":
      key_num = 76;
    break;
    case "m":
      key_num = 77;
    break;
    case "n":
      key_num = 78;
    break;
    case "o":
      key_num = 79;
    break;
    case "p":
      key_num = 80;
    break;
    case "q":
      key_num = 81;
    break;
    case "r":
      key_num = 82;
    break;
    case "s":
      key_num = 83;
    break;
    case "t":
      key_num = 84;
    break;
    case "u":
      key_num = 85;
    break;
    case "v":
      key_num = 86;
    break;
    case "w":
      key_num = 87;
    break;
    case "x":
      key_num = 88;
    break;
    case "y":
      key_num = 89;
    break;
    case "z":
      key_num = 90;
    break;
    case ",":
      key_num = 188;
    break;
    case ".":
      key_num = 190;
    break;
    case "/":
      key_num = 191;
    break;
    case ";":
      key_num = 186;
    break;
    case "'":
      key_num = 222;
    break;
    case "[":
      key_num = 219;
    break;
    case "]":
      key_num = 221;
    break;
    case "`":
      key_num = 192;
    break;
    case "1":
      key_num = 49;
    break;
    case "2":
      key_num = 50;
    break;
    case "3":
      key_num = 51;
    break;
    case "4":
      key_num = 52;
    break;
    case "5":
      key_num = 53;
    break;
    case "6":
      key_num = 54;
    break;
    case "7":
      key_num = 55;
    break;
    case "8":
      key_num = 56;
    break;
    case "9":
      key_num = 57;
    break;
    case "0":
      key_num = 48;
    break;
    case "-":
      key_num = 189;
    break;
    case "=":
      key_num = 187;
    break;
    case "space":
      key_num = 32;
    break;
    case "ctrl":
      key_num = 17;
    break;
    case "control":
      key_num = 17;
    break;
    case "alt":
      key_num = 18;
    break;
    default:
      key_num = 1337;
    break;
  }

  return key_num;
}

export {assignKeyCode};
