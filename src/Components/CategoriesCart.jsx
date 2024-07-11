import React from 'react';
import cartImg from '../assets/Group-1.png';
import { useNavigate } from 'react-router-dom';

const CategoriesCart = ({item}) => {
    const {name, image,id} = item;
    console.log({name, image,id});
    const navigate = useNavigate();
    return (
        <div className='bg-secondary   rounded-lg w-[200px] p-5'>
            <img className='w-[84px] mx-auto' src={image} alt="" />
            <p className='text-textColor text-[18px] text-center my-2 font-semibold'>{name}</p>
            <div className='flex gap-2 justify-center'>
                <p className='text-primary font-normal cursor-pointer bg-white border-2 border-primary py-2 px-5 rounded-lg text-[12px]'>Delete</p>
                <p onClick={() => navigate(`/categories/edit-categories/${id}`)} className='text-white cursor-pointer bg-primary py-2 px-7 rounded-lg text-[12px]'>Edit</p>
            </div>
        </div>
    );
}

export default CategoriesCart;
