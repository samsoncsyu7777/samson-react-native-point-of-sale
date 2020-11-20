class ItemDTO {
    constructor() {
      this.token = "",
      this.itemId = 1,
      this.upc = "1",
      this.description = "a",
      this.picture = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      this.featureA = "",
      this.featureValueA = "",
      this.featureB = "",
      this.featureValueB = "",
      this.onHand = 1,
      this.price = 0.00,
      this.tax1 = 0.00,
      this.tax2 = 0.00,
      this.dateTimeCreated = 0,
      this.dateTimeModified = 0,
      this.enabl = true,
      this.clientId = 0;
    }    
  }
  
export default ItemDTO;