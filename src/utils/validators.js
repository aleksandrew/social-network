export const validate = values => {
  const errors = {};

  if (!values.newPostBody) {
  } else if (values.newPostBody.length > 110) {
    errors.newPostBody = `Must be 110 characters or less!`
  }

  if (!values.newMessageBody) {
    errors.newMessageBody = 'Required'
  } else if (values.newMessageBody.length > 50) {
    errors.newMessageBody = `Must be 50 characters or less`
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (values.email.length > 30) {
    errors.email = `Must be 30 characters or less`
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length > 20) {
    errors.password = `Must be 20 characters or less`
  } else if (values.password.length < 6) {
    errors.password = `Must be 6 characters or more`
  }

  return errors;
};
