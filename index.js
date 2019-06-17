let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id} )
  }
  customers(){
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }
  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }
}

class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }
  customers(){
    return this.deliveries().map(delivery => {return delivery.customer()})
  }
  static byPrice() {
      return store.meals.sort(function(a, b){return b.price - a.price});
    }

}

class Customer {
  constructor(name,neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }
  meals(){
    return this.deliveries().map(delivery => {return delivery.meal()})
  }
  totalSpent(){
    const meals = this.meals()
    let total = 0
    for (var i = 0; i < meals.length; i++) {
      total = total + meals[i].price
    }
    return total
  }
}

class Delivery {
  constructor(mealId,neighborhoodId,customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.filter(meal => {return meal.id === this.mealId})[0]
  }
  customer(){
    return store.customers.filter(customer => {return customer.id === this.customerId})[0]
  }
  neighborhood(){
    return store.neighborhoods.filter(neighborhood => {return neighborhood.id === this.neighborhoodId})[0]
  }
}
