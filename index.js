let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
  }
}
class Meal {
  constructor(name) {
    this.name = name
    this.id = ++mealId
  }
}
class Customer {
  constructor(name) {
    this.name = name
    this.id = ++customerId
  }
}
class Delivery {
  constructor(name) {
    this.name = name
    this.id = ++deliveryId
  }
}
