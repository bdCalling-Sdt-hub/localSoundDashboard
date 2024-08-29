import { AiFillCrown } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDeleteSubscriptionMutation } from "../redux/features/Subscription/subscription.api";
import Swal from "sweetalert2";

const SubscriptionCard = ({ item }) => {
  const navigate = useNavigate();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const handleDelete = async (values) => {
    try {
      const res = await deleteSubscription(item.id);
      // console.log(res);
      if (res?.data?.status == "success") {
        // navigate(-1);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Delete success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: res?.error?.data?.message || "Something went wrong!!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.error?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="bg-[#9610FF] px-10 py-6 rounded-md">
      <div className="w-[50%] mx-auto bg-secondary p-2 rounded-lg my-2 ">
        <p className="text-primary font-medium text-[20px] text-center">
          {item.name.toUpperCase()}
        </p>
      </div>
      <div className="flex justify-center my-2">
        <AiFillCrown size={100} color="white" />
      </div>
      <div className="flex justify-center items-center pb-3 border-b-2 border-[white] ">
        <p className="text-white font-medium text-[20px] text-center flex items-center">
          <span className="text-[32px]">$ {item?.price}</span>{" "}
          <span className="text-[16px]">/{item?.duration} months</span>
        </p>
      </div>
      <div>
        <div className="flex flex-col justify-start">
          {item?.benefits?.map((feature, index) => {
            return (
              <div key={index} className="flex justify-start items-center my-2">
                <p className="text-white font-medium text-[16px] flex ">
                  <span className="text-[24px] mr-2">
                    <AiOutlineCheck />
                  </span>
                  {feature}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-3">
        <p
          onClick={() => navigate(`/subscription/edit-subscription/${item.id}`)}
          className="text-white bg-primary px-10 py-2 cursor-pointer rounded-lg font-medium text-[16px] text-center"
        >
          Edit
        </p>
        <button
          onClick={handleDelete}
          className="text-[red] border-primary border-2 cursor-pointer bg-secondary px-8 py-2 rounded-lg font-medium text-[16px] text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
