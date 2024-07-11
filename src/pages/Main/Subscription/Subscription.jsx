import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../../../Components/SubscriptionCard';

const Subscription = () => {
    const navigate = useNavigate();
    const subscription = [
        {
            id: 1,
            name: "Basic",
            price:"4.99",
            feature:[
                {
                    id: 1,
                    name: "Personalized Diet",
                },
                {
                    id: 2,
                    name: "Personalized Diet",
                },
                {
                    id: 3,
                    name: "Personalized Diet",
                },
            ]
        },
        {
            id: 2,
            name: "Gold",
            price:"4.99",
            feature:[
                {
                    id: 1,
                    name: "Personalized Diet",
                },
                {
                    id: 2,
                    name: "Personalized Diet",
                },
                {
                    id: 3,
                    name: "Personalized Diet",
                },
            ]
        },
        {
            id: 3,
            name: "DIAMOND",
            price:"4.99",
            feature:[
                {
                    id: 1,
                    name: "Personalized Diet",
                },
                {
                    id: 2,
                    name: "Personalized Diet",
                },
                {
                    id: 3,
                    name: "Personalized Diet",
                },
            ]
        }
    ]
    return (
        <div>
            <div className="flex justify-between items-center my-10">
        <p className="text-primary font-bold text-[24px]">Subscription</p>
        <div
          onClick={(e) => navigate("/subscription/add-subscription")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-primary
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add New Subscription</p>
        </div>
            </div>
            <div className='grid grid-cols-3 gap-4 my-4'>
                {
                    subscription.map((item) => <SubscriptionCard key={item.id} item={item}/>)
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

export default Subscription;
