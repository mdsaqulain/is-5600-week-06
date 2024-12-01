import Card from "./Card";
import Button from "./Button";
import Search from "./Search"; 
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [filteredData, setFilteredData] = useState(data);

  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    if (newOffset >= 0 && newOffset < filteredData.length) {
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const filterTags = (searchTerm) => {
    const filteredProducts = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filteredProducts);
    setOffset(0); 
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};
export default CardList;