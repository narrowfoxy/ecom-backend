"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  async create(ctx) {
    const { email } = ctx.state.user;

    const { amount, ShippingAddress, city, state, pin, token, items } =
      ctx.request.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      description: `order by user ${email}`,
      payment_method: "pm_card_visa",
    });

    const order = await strapi.services["order"].create({
      ShippingAddress,
      city,
      pin,
      state,
      token,
      items,
      amount,
      user: email,
    });

    return order;
  },
};
