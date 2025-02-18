import React, { useState } from "react";
import PropTypes from "prop-types";
import { SideWrapper } from "../../component/side-wrapper";
import { useForm } from "react-hook-form";
import { checkIfFileIsImage, generateArray } from "../../helpers/function";
import image from "../../assets/feedback.svg";
import { Switch } from "../../component/switch";

export function PublishNotification({ handleClose }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            queue: false,
            save: false,
        },
    });
    const watchThumbnail = watch("thumbnail");

    const [preview, setPreview] = useState(null);

    const submit = (data) => console.log("Form Data:", data);

    return (
        <SideWrapper title="Publish Notifications" handleClose={handleClose}>
            <form
                className="w-[400px] space-y-4"
                onSubmit={handleSubmit(submit)}
            >
                <div>
                    <div className="flex items-center border pl-3 py-1 border-[#CECECE] rounded-[4px]">
                        <div className="text-[10px] w-fit space-y-1">
                            <p className="font-[700]">Category</p>
                            <div className="w-[40px] bg-[#FF7A00] h-[3px] rounded-[2px]" />
                        </div>

                        <select
                            className="border-none text-[10px] w-full focus:outline-none focus:ring-0"
                            {...register("category", {
                                required: "Category is required",
                            })}
                        >
                            <option value="">Select Category</option>
                        </select>
                    </div>
                    {errors.category && (
                        <p className="text-red-500 text-[10px]">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block border border-[#CECECE] rounded-[4px] p-3 space-y-2">
                        <div className="text-[10px] w-fit space-y-1">
                            <p className="font-[700]">Thumbnail</p>
                            <div className="w-[40px] bg-[#FF7A00] h-[3px] rounded-[2px]" />
                        </div>
                        <div className="flex">
                            <div className="p-2 bg-gray-400">
                                <img
                                    src={preview ?? image}
                                    className="h-[35px] w-[35px]"
                                />
                            </div>
                            <div className="flex-1 pl-4 text-[10px]">
                                {watchThumbnail && watchThumbnail.length > 0 ? (
                                    <div className="relative">
                                        <span
                                            className="absolute right-0 cursor-pointer"
                                            onClick={() =>
                                                setValue("thumbnail", undefined)
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="red"
                                                    d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"
                                                />
                                            </svg>
                                        </span>
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {watchThumbnail[0].name}
                                        </p>
                                        <p>
                                            <strong>Type:</strong>{" "}
                                            {watchThumbnail[0].type}
                                        </p>
                                        <p>
                                            <strong>Size:</strong>{" "}
                                            {(
                                                watchThumbnail[0].size / 1024
                                            ).toFixed(2)}{" "}
                                            KB
                                        </p>
                                    </div>
                                ) : (
                                    <p>Click here to select a file</p>
                                )}
                                <input
                                    {...register("thumbnail", {
                                        required: "Thumbnail is required",
                                        validate: (value) => {
                                            if (!value || !value[0])
                                                return "Thumbnail is required";
                                            if (!checkIfFileIsImage(value[0]))
                                                return "Invalid image format";
                                        },
                                        onChange: (event) => {
                                            const file = event.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () =>
                                                    setPreview(reader.result);
                                                reader.readAsDataURL(file);
                                            }
                                        },
                                    })}
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </label>
                    {errors.thumbnail && (
                        <p className="text-red-500 text-[10px]">
                            {errors.thumbnail.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="flex items-center border pl-3 py-1 border-[#CECECE] rounded-[4px]">
                        <div className="text-[10px] w-fit space-y-1">
                            <p className="font-[700]">Title</p>
                            <div className="w-[40px] bg-[#FF7A00] h-[3px] rounded-[2px]" />
                        </div>
                        <input
                            className="border-none text-[10px] flex-1 p-3 focus:outline-none focus:ring-0"
                            placeholder="Enter notification title"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                    </div>
                    {errors.title && (
                        <p className="text-red-500 text-[10px]">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="border p-3 py-1 border-[#CECECE] rounded-[4px]">
                        <div className="text-[10px] space-y-1">
                            <p className="font-[700]">Body</p>
                            <div className="w-[40px] bg-[#FF7A00] h-[3px] rounded-[2px]" />
                        </div>
                        <textarea
                            className="border-none p-0 text-[10px] flex-1 focus:outline-none focus:ring-0 w-full"
                            placeholder="Write a message"
                            {...register("body", {
                                required: "Body is required",
                            })}
                        />
                    </div>
                    {errors.body && (
                        <p className="text-red-500 text-[10px]">
                            {errors.body.message}
                        </p>
                    )}
                </div>

                {/* Filter */}
                <div className="space-y-1">
                    <p className="text-[10px] font-[400]">Select Filter</p>
                    <div className="flex gap-4 flex-wrap">
                        {generateArray(3).map((_, index) => (
                            <label
                                key={index}
                                className="text-[10px] text-[#667085] font-[500] flex gap-1 items-center"
                            >
                                <input
                                    type="checkbox"
                                    value={index}
                                    {...register("filter", {
                                        required:
                                            "At least one filter must be selected",
                                    })}
                                    className="rounded-sm h-[15px] w-[15px] border border-[#D7D7D7]"
                                />
                                Template {index + 1}
                            </label>
                        ))}
                    </div>
                    {errors.filter && (
                        <p className="text-red-500 text-[10px]">
                            {errors.filter.message}
                        </p>
                    )}
                </div>
                <div className="flex justify-between">
                    <div className="flex text-[10px] font-[700] items-center gap-2 text-[#344054]">
                        Queue
                        <Switch
                            checked={!!watch("queue")}
                            color="#0FFF9A"
                            handleChecked={() =>
                                setValue("queue", !watch("queue"))
                            }
                        />
                        <span className="text-[12px] font-bold">
                            {watch("queue") ? "ON" : "OFF"}
                        </span>
                        <input type="hidden" {...register("queue")} />
                    </div>
                    <div className="flex text-[10px] font-[700] items-center gap-2 justify-between text-nowrap text-[#344054]">
                        Save as Template
                        <Switch
                            checked={!!watch("save")}
                            color="#0FFF9A"
                            handleChecked={() =>
                                setValue("save", !watch("save"))
                            }
                        />
                        <span className="text-[12px] font-bold">
                            {watch("save") ? "ON" : "OFF"}
                        </span>
                        <input type="hidden" {...register("save")} />
                    </div>
                </div>

                {/* Date & Time */}
                <div className="flex gap-4 items-center">
                    <div className="w-3/4">
                        <input
                            type="date"
                            className="border border-[#CECECE] rounded-full text-[10px] w-full py-2.5 px-3 focus:outline-none focus:ring-0"
                            {...register("date", {
                                required: "Date is required",
                            })}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-[10px]">
                                {errors.date.message}
                            </p>
                        )}
                    </div>
                    <div className="w-1/4">
                        <input
                            type="time"
                            className="border border-[#CECECE] rounded-full text-[10px] w-full py-2.5 px-3 focus:outline-none focus:ring-0"
                            {...register("time", {
                                required: "Time is required",
                            })}
                        />
                        {errors.time && (
                            <p className="text-red-500 text-[10px]">
                                {errors.time.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Template Name */}
                <div>
                    <div className="flex items-center border pl-3 py-1 border-[#CECECE] rounded-[4px]">
                        <div className="text-[10px] w-fit space-y-1">
                            <p className="font-[700]">Template Name</p>
                            <div className="w-[40px] bg-[#FF7A00] h-[3px] rounded-[2px]" />
                        </div>
                        <input
                            className="border-none text-[10px] flex-1 p-3 focus:outline-none focus:ring-0"
                            placeholder="Enter template name"
                            {...register("templateName", {
                                required: "Template name is required",
                            })}
                        />
                    </div>
                    {errors.templateName && (
                        <p className="text-red-500 text-[10px]">
                            {errors.templateName.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    className="text-[12px] font-[700] text-white bg-black w-full p-4 px-4 text-left rounded-[4px]"
                    type="submit"
                >
                    Send out notification
                </button>
            </form>
        </SideWrapper>
    );
}

PublishNotification.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
