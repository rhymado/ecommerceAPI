'use strict'

const Order = use('App/Models/Order')
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
  async index({ request, response, view }) {
    let orders = await Order.all()
    return response.json(orders)
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
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const orderInfo = request.only(['productid', 'qty', 'price'])
    const order = new Order()
    order.productid = orderInfo.productid
    order.qty = orderInfo.qty
    order.price = orderInfo.price
    await order.save()
    return response.status(201).json(order)
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
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const orderInfo = request.only(['productid', 'qty', 'price'])
    const order = await Order.find(params.id)
    if (!order) {
      return response.status(404).json({ data: 'Order not found' })
    }
    order.productid = orderInfo.productid
    order.qty = orderInfo.qty
    order.price = orderInfo.price
    await order.save()
    return response.status(200).json(order)
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const order = await Order.find(params.id)
    if (!order) {
      return response.status(404).json({ data: 'Order not found' })
    }
    await order.delete()
    return response.status(204).json(null)
  }
}

module.exports = OrderController
