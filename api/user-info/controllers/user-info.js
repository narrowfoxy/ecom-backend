"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    // Retrieve the current authenticated user's username

    const { id: UserId = "" } = ctx.state.user || { id: "" };

    const allItems = await strapi.services["user-info"].find({});

    const currentUserDetails = allItems.find((item) => item.UserId == UserId);

    const id = currentUserDetails?.id || "";

    var updated;

    if (!id) {
      updated = await strapi.services["user-info"].create({
        ...ctx.request.body,
        UserId,
      });
    } else {
      const updatedData = {
        ...currentUserDetails,
        ...ctx.request.body,
        UserId,
      };

      updated = await strapi.services["user-info"].update({ id }, updatedData);
    }
    return updated;
  },
  async findOne(ctx) {
    const { id: UserId = "" } = ctx.state.user || { id: "" };

    const allItems = await strapi.services["user-info"].find({});
    const currentUserDetails = allItems.find((item) => item.UserId == UserId);

    return currentUserDetails;
  },
};
