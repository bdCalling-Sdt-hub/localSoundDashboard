import { AiFillCrown } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SubscriptionCard = ({item}) => {
    console.log(item);
    const navigate = useNavigate();
    return (
        <div className="bg-[#9610FF] px-10 py-2 rounded-md">
            <div className="w-[50%] mx-auto bg-secondary p-2 rounded-lg my-2 ">
                <p className="text-primary font-medium text-[20px] text-center">{item.name.toUpperCase()}</p>
            </div>
        <div className="flex justify-center my-2">
        <AiFillCrown size={100} color="white" />
        </div>
        <div className="flex justify-center items-center pb-3 border-b-2 border-[white] ">
            <p className="text-white font-medium text-[20px] text-center flex items-center"><span className="text-[32px]">$ {item?.price}</span> <span className="text-[16px]">/6 months</span></p>
        </div>
        <div>
            <div className="flex flex-col justify-start">
                {
                    item?.feature?.map((feature,index)=>{
                        return (
                            <div key={index} className="flex justify-start items-center my-2">
                                <p className="text-white font-medium text-[16px] flex "><span className="text-[24px] mr-2"><AiOutlineCheck/></span> {feature.name}</p>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="flex justify-center items-center gap-10">
            <p onClick={() => navigate("/subscription/edit-subscription")} className="text-white bg-primary px-10 py-2 cursor-pointer rounded-lg font-medium text-[16px] text-center">Edit</p>
            <p className="text-[red] border-primary border-2 cursor-pointer bg-secondary px-8 py-2 rounded-lg font-medium text-[16px] text-center">Delete</p>
        </div>
        </div>
    );
}

export default SubscriptionCard;
