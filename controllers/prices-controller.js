const pricesRepository = require("../repositories/prices-repository");

const PricesController = (function () {
    // Preperties

    const self = this;
    const actions = []

    // Actions

    actions.push(["POST", "add", async (req, res) => {
        let newPrice = {
            price: req.body.price,
            productId: req.body.productId,
            shopId: req.body.shopId,
            date: req.body.date
        };

        let result = await pricesRepository.Create(newPrice)

        res.json(result);
    }]);

    actions.push(["POST", "delete", async (req, res) => {
        let priceId = req.body.id;

        let result = await pricesRepository.Delete(priceId)

        res.json(result);
    }]);

    // Public functions

    self.GetActions = () => {
        return actions;

    }

    return self;
})();

module.exports = { ...PricesController }