export   const validateInputs = (name: string, password: string) => {
  if (!name.trim() || !password.trim()) {
    return "Username and password cannot be empty";
  }

  if (name.trim().length < 6) {
    return "Username must be at least 6 characters long.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }

  return null;
};
