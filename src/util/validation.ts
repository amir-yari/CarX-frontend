export const validateName = (value: string) => {
  const nameRegex = /^[a-z ,.'-]+$/i;
  return nameRegex.test(value);
};

export const validateEmail = (value: string) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|mil|co|io|info|biz|me|us|ca|uk|de|fr|it|es|nl|ru|cn|br|in|au|jp|kr|mx)$/i;
  return emailRegex.test(value);
};

export const validatePassword = (value: string) => {
  return value.length >= 8;
};
