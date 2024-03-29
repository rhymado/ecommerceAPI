'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('products', 'ProductController.store')
    Route.get('products', 'ProductController.index')
    Route.get('product/:id', 'ProductController.show')

    Route.get('orders', 'OrderController.index')
    Route.post('order', 'OrderController.store')
    Route.patch('order/:id', 'OrderController.update')
    Route.delete('order/:id', 'OrderController.destroy')
    Route.delete('orders', 'OrderController.empty')

    Route.get('user/:id', 'ProfileController.show')
    Route.post('user', 'ProfileController.store')
    Route.patch('user/:id', 'ProfileController.update')
    Route.delete('user/:id', 'ProfileController.destroy')

    Route.post('transactions', 'TransactionController.store')
}).prefix('api/v1')