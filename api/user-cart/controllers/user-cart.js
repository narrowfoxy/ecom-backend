"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    // Retrieve the current authenticated user's username

    const { id: UserId = "" } = ctx.state.user || { id: "" };

    const allItems = await strapi.services["user-cart"].find({});

    const currentUserCart = allItems.find((item) => item.UserId == UserId);

    const id = currentUserCart?.id || "";

    var updated;

    if (!id) {
      updated = await strapi.services["user-cart"].create({
        ...ctx.request.body,
        UserId,
      });
    } else {
      const selectedId = {};
      ctx.request.body.ItemCart.map((ele) => {
        selectedId[ele.product] = ele.product;
      });

      const cardData = currentUserCart.ItemCart.filter(
        (ele) => !(ele.product.id in selectedId)
      );

      const updatedData = {
        ItemCart: [...cardData, ...ctx.request.body.ItemCart],
        UserId,
      };

      if (!ctx.request.body.ItemCart.length) {
        updated = await strapi.services["user-cart"].update(
          { id },
          { ItemCart: [], UserId }
        );
      } else {
        const removeZeroQty = updatedData.ItemCart.filter(
          (ele) => {
            return ele.Quantity
          }
        );

        updatedData.ItemCart = removeZeroQty;

        updated = await strapi.services["user-cart"].update(
          { id },
          updatedData
        );
      }
    }
    console.log(updated);
    return updated;
  },

  async findOne(ctx) {
    const { id: UserId = "" } = ctx.state.user || { id: "" };

    const allItems = await strapi.services["user-cart"].find({});

    const currentUserCart = allItems.find((item) => item.UserId == UserId);

    return currentUserCart;
  },
};
