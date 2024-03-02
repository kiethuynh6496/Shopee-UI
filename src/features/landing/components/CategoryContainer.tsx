import { categoryList } from 'constants/landing/categoryList';
import React from 'react';

interface CategoryContainerProps {}

const CategoryContainer: React.FunctionComponent<CategoryContainerProps> = (props) => {
  return (
    <div className="category">
      {categoryList.map((val, index) => (
        <div className="category-item" key={index}>
          <img src={val.image} alt="" />
          <span>{val.content}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryContainer;
