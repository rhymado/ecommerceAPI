'use strict';

const Order = use ('App/Models/Order');
const Database = use ('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    try {
      let orders = await Order.query ().with ('product').fetch ();
      return response.json (orders);
    } catch (error) {
      console.log (error);
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {}

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
    try {
      const orderInfo = request.only (['product_id', 'qty', 'price']);
      const order = new Order ();
      order.product_id = orderInfo.product_id;
      order.qty = orderInfo.qty;
      order.price = orderInfo.price;
      await order.save ();
      return response.status (201).json (order);
    } catch (error) {
      console.log (error);
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {}

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {}

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    try {
      const orderInfo = request.only (['qty']);
      const order = await Order.find (params.id);
      order.qty = orderInfo.qty;
      await order.save ();
      return response.status (200).json (order);
    } catch (error) {
      console.log (error);
      return response.status (404).json ({data: 'Order not found'});
    }
  }
  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
    try {
      const order = await Order.find (params.id);
      await order.delete ();
      return response.status (204).json (null);
    } catch (error) {
      console.log (error);
      return response.status (404).json ({data: 'Order not found'});
    }
  }

  async empty({request, response}) {
    try {
      const affectedRows = await Database.truncate ('orders');
      return response.json (affectedRows);
    } catch (error) {
      console.log (error);
    }
  }
}

module.exports = OrderController;
