import * as ErrorType from "../constants/error";

export function handleError(error) {
  const ErrorKeys = Object.keys(ErrorType);
  let isMatched = false;
  for (let i = 0; i < ErrorKeys.length; i += 1) {
    if (ErrorType[ErrorKeys[i]].message === error.message) {
      isMatched = true;
      break;
    }
  }
  if (!isMatched) {
    // console.log(`未知错误: \`${error.errMsg}\``);
  }
  return {
    message: error.message || error.errMsg,
    success: false
  };
}
