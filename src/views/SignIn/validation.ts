const validation = {
  usernameOrEmail: {
    required: {
      value: true,
      message: 'Wajib diisi'
    },
    minLength: {
      value: 5,
      message: 'Minimal 5 karakter'
    },
    maxLength: {
      value: 99,
      message: 'Minimal 99 karakter'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Wajib diisi'
    },
    minLength: {
      value: 5,
      message: 'Minimal 5 karakter'
    },
    maxLength: {
      value: 99,
      message: 'Minimal 99 karakter'
    }
  }
};

export default validation;
