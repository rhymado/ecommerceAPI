'use strict';

const Transaction = use ('App/Models/Transaction');

class TransactionController {
  async store({request, response}) {
    try {
      const transactionData = request.only ([
        'user_id',
        'product_id',
        'qty',
        'price',
      ]);
      const transaction = new Transaction ();
      transaction.user_id = transactionData.user_id;
      transaction.product_id = transactionData.product_id;
      transaction.qty = transactionData.qty;
      transaction.price = transactionData.price;
      await transaction.save ();
      return response.status (201).json (transaction);
    } catch (error) {
      console.log (error);
    }
  }
}

module.exports = TransactionController;
