// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

  let neighborhoodId = 0;
  let customerId = 0;
  let mealId = 0;
  let deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.id = ++neighboorhoodId;
    this.name = name;
    store.neighborhoods.push(this);
    return this;
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals(){
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = store.customers.length;
    store.customers.push(this);
    return this;
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
    return this;
  }

  deliveries(){
    return store.delivers.filter(delivery => delivery.mealId === this.id);
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice(){
    return store.meals.sort((a, b) => a.price < b.price);
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = store.deliveries.length;
    store.deliveries.push(this);
    return this;
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
