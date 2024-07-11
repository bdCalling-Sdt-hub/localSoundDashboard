import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CategoriesCart from '../../../Components/CategoriesCart';






const Categories = () => {
    const navigate = useNavigate();
    const categories = [
        {
            id: 1,
            name: "General",
            image: "https://i.ibb.co/G02SBSq/Group-1.png",
        },
        {
            id: 2,
            name: "Dentist",
            image: "https://i.ibb.co/3s21dtW/group-3.png",
        },
        {
            id: 3,
            name: "Ophthal",
            image: "https://i.ibb.co/XVzFSkw/Group-4.png",
        },
        {
            id: 4,
            name: "Cardiology",
            image: "https://i.ibb.co/S0tbzMq/Icon.png",
        },
        {
            id: 5,
            name: "Nutrition",
            image: "https://i.ibb.co/xhwcksf/Vector.png",
        },
        {
            id: 6,
            name: "Urology",
            image: "https://i.ibb.co/CzRdq33/Shape.png",
        }
    ]
    return (
        <div>
            <div className="flex justify-between items-center my-10">
        <p className="text-primary text-[24px]">Categories</p>
        <div
          onClick={(e) => navigate("/categories/add-categories")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-primary
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Categories</p>
        </div>
            </div>
            <div className='grid grid-cols-6 gap-4 my-4'>
                {
                    categories.map((item) => <CategoriesCart key={item.id} item={item}/>)
                }
                {/* <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/> */}
            </div>
        </div>
    );
}

export default Categories;
