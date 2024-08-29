import { Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../redux/features/settings/settingApi";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { CustomSpinner } from "../../../Components/Spinners/Spinner";

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { data, isError, isLoading } = useGetSettingsQuery([]);
  const [mutation, { isLoading: isPostLoading }] = useUpdateSettingsMutation();
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(data?.data?.privacy);
  }, [data?.data]);

  const handleUpdate = async () => {
    try {
      const res = await mutation({
        privacy: content,
      });
      // console.log(res);
      if (res?.data?.status == "success") {
        navigate(-1);
        Swal.fire({
          // position: "top-center",
          icon: "success",
          title: "Update success!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text:
            response?.data?.message ||
            res?.error?.data?.message ||
            "Something went wrong!!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Something went wrong!!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="relative ml-[24px]">
      <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          className=""
          onClick={() => navigate("/settings/privacy-policy")}
          size={34}
        />
        <h1 className="text-[24px] font-semibold">Edit Privacy Policy</h1>
      </div>
      <div className="text-justify  mt-[24px] relative ">
        <LoaderWraperComp
          isLoading={isLoading}
          isError={isError}
          dataEmpty={!data?.data?.privacy}
          height={"h-[55vh]"}
        >
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
            className="text-wrap"
            style={{ width: "100%" }}
          />
        </LoaderWraperComp>
        <Button
          type="primary"
          disabled={isPostLoading}
          onClick={handleUpdate}
          style={{
            backgroundColor: "#57B660",
            color: "#fff",
            size: "18px",
            height: "56px",
          }}
          block
          className="mt-[30px] h-[60px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800 disabled:cursor-wait
        text-white py-3 rounded-lg w-full text-[18px] font-medium  duration-200 flex justify-center items-center gap-2"
        >
          Update {isPostLoading && <CustomSpinner />}
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
