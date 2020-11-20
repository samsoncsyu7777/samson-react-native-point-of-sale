class ItemPage {
    constructor() {
      this.content = [],
      this.pageable,
      this.totalPages = 0,
      this.totalElements = 0,
      this.last = false,
      this.first = true,
      this.numberOfElements = 0,
      this.sort,
      this.size = 1,
      this.number = 1,
      this.empty = false;
    }    
  }
  
export default ItemPage;