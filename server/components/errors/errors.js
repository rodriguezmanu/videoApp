'use strict';

module.exports = {
  SUCCESS: {
    code: 0,
    message: 'success'
  },
  WRONG_PASSWORD: {
    code: 1,
    message: 'This password is not correct.'
  },
  WRONG_EMAIL: {
    code: 2,
    message: 'This email is not registered.'
  },
  NOT_PASSWORD_RESET_TOKEN: {
    code: 3,
    message: 'Password reset token is invalid or has expired.'
  },
  NON_EMAIL_TEMPLATE: {
    code: 4,
    message: 'Error reading email template.'
  },
  EMAIL_NOT_SENT: {
    code: 5,
    message: 'Error sending email.'
  },
  INVALID_ORIGIN: {
    code: 6,
    message: 'The Origin is not valid. The entity can not be found.'
  },
  ORIGIN_ERROR: {
    code: 7,
    message: 'Something were wrong calling Origins API.'
  },
  ERROR_GETTING_ENTITY: {
    code: 8,
    message: 'Something were wrong trying to get the entity.'
  },
  INVALID_ORIGIN_ACTION: {
    code: 9,
    message: 'The Origin Actions is not supported.'
  },
  GENEREAL_ERROR_ORIGIN_ACTION: {
    code: 10,
    message: 'Something were wrong trying to perform the Origin Action.'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error.'
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: 'Unprocessable entity.'
  },
  NO_CONTENT: {
    code: 204,
    message: 'There are no content to return.'
  },
  FORBIDDEN: {
    code: 403,
    message: 'Forbidden.'
  },
  NOT_FOUND: {
    code: 404,
    message: 'The entity can not be found.'
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Access is denied due to invalid credentials.'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'The request cannot be fulfilled due to bad syntax, validation errors or missing data.'
  }
};