export default class Product {
  constructor({
    id,
    activePromoId,
    tmpProperty,
    name,
    description,
    price,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.activePromoId = activePromoId ?? 0;
    this.tmpProperty = tmpProperty;
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}