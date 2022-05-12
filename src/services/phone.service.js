const config = require('../config/config');

// eslint-disable-next-line import/order
const client = require('twilio')(config.accountSid, config.authToken);

/**
 * create sms otp phone number from twillo service
 * @param {string} phoneNumber
 * @param {string} channel
 */
const createVerityPhoneNumber = (phoneNumber, channel) => {
  return client.verify.services(config.serviceId).verifications.create({
    to: phoneNumber,
    channel,
  });
};

/**
 * create sms otp phone number from twillo service
 * @param {string} phoneNumber
 * @param {string} code
 */
const verityPhoneNumber = (phoneNumber, code) => {
  return client.verify.services(config.serviceId).verificationChecks.create({
    to: phoneNumber,
    code,
  });
};

module.exports = { createVerityPhoneNumber, verityPhoneNumber };
