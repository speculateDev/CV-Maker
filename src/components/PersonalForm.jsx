import { useCv } from "../context/CvContext";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import Tag from "./Tag";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { uploadToCloudinary } from "../utils/helper";

function PersonalForm() {
  const { cvState, dispatch } = useCv();
  const [tags, setTags] = useState(cvState?.personal.languages);
  const [tagInp, setTagInp] = useState("");
  const [image, setImage] = useState(cvState?.personal.image || null);
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const inputRef = useRef(null);
  const imageInputRef = useRef(null);

  const { register, formState, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      firstName: cvState.personal.firstName || "",
      lastName: cvState.personal.lastName || "",
      email: cvState.personal.email || "",
      phone: cvState.personal.phone || "",
      address: cvState.personal.address || "",
    },
  });
  const { errors } = formState;

  async function onSubmit(data) {
    setIsUploading(true);
    let imgUrl;

    try {
      if (newImage && !isUploaded) {
        if (newImage.size > 5 * 1024 * 1024) {
          toast.error("Image size should be less than 5MB");
          return;
        }
        const imgData = await uploadToCloudinary(newImage);
        imgUrl = imgData.secure_url;
        setIsUploaded(true);
      }

      dispatch({
        type: "update_personal",
        payload: {
          ...data,
          languages: tags,
          ...(imgUrl && { image: { imgUrl, name: newImage.name } }),
        },
      });
      toast.success("updated Successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error: ", error);
    } finally {
      setIsUploading(false);
    }
  }

  function handleReset() {
    reset();
    dispatch({ type: "reset_personal" });
    setIsUploaded(false);
    setImage(null);
    setTags([]);
  }

  function deleteTag(tag) {
    setTags((tags) => tags.filter((t) => t !== tag));
  }

  function addTag(tag) {
    if (!tagInp || tags.includes(tag)) {
      setTagInp("");
      return;
    }

    setTags((tags) => [...tags, tag]);
    setTagInp("");
  }

  function handleKeyDown(e) {
    if (
      (e.key === "Enter" || e.key === ",") &&
      e.target.className.includes("lang-tag")
    ) {
      e.preventDefault();
      e.stopPropagation();
      addTag(tagInp.trim());
    }
  }

  function handleImageChange(e) {
    const img = e.target.files[0];
    setNewImage(e.target.files[0]);
    setImage(img);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__combo form__extend justify-between">
        <div>
          <FormRow
            htmlFor="firstName"
            label="First Name"
            error={errors?.firstName?.message}
          >
            <input
              type="text"
              id="firstName"
              className="form__inp"
              {...register("firstName", {
                required: "Please enter your first name",
              })}
            />
          </FormRow>
        </div>
        <div>
          <FormRow
            htmlFor="lastName"
            label="Last Name"
            error={errors?.lastName?.message}
          >
            <input
              type="text"
              id="lastName"
              className="form__inp"
              {...register("lastName", {
                required: "Please enter your last name",
              })}
            />
          </FormRow>
        </div>
      </div>

      <div className="form__combo form__extend justify-between">
        <div>
          <FormRow htmlFor="email" label="Email" error={errors?.email?.message}>
            <input
              placeholder="example@example.com"
              type="email"
              id="email"
              className="form__inp"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>
        </div>
        <div>
          <FormRow htmlFor="phone" label="Phone" error={errors?.phone?.message}>
            <input
              placeholder="(e.g., 1234567890)"
              type="tel"
              id="phone"
              className="form__inp"
              {...register("phone", {
                required: "Please enter your phone number",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please provide a valid phone number",
                },
              })}
            />
          </FormRow>
        </div>
      </div>

      <div className="form__extend">
        <FormRow
          htmlFor="address"
          label="Address (optional)"
          error={errors?.address?.message}
        >
          <input
            type="text"
            id="address"
            className="form__inp"
            {...register("address")}
          />
        </FormRow>
      </div>

      <div>
        <FormRow label="Languages">
          <div className="tags__wrapper">
            {tags?.map((tag) => (
              <Tag key={tag} tag={tag} onDelete={() => deleteTag(tag)} />
            ))}

            <input
              ref={inputRef}
              type="text"
              className="tags__inp lang-tag"
              onKeyDown={handleKeyDown}
              value={tagInp}
              onChange={(e) => setTagInp(e.target.value)}
            />
          </div>
        </FormRow>
      </div>

      <div>
        <input
          hidden
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={(e) => handleImageChange(e)}
        />

        {/* Image upload area */}
        <div
          onClick={() => imageInputRef.current.click()}
          className="form__inp-img cursor-pointer flex items-center justify-center"
        >
          <div className="text-center">
            {image ? (
              <div className="space-y-2">
                <div className="text-blue-500">Image Selected :</div>
                <div>{image?.name?.slice(0, 20)}</div>
                {isUploading && (
                  <p className="mt-3 text-blue-500">Uploading...</p>
                )}
              </div>
            ) : (
              <>
                <div className="flex-center">
                  <div className="mb-2 icon-upload-box">
                    <Upload />
                  </div>
                </div>

                <div className="mb-1">Upload Profile</div>

                <button className="btn btn-outline">Choose a file</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="btns-box">
        <button
          className="btn btn-outline"
          type="reset"
          onClick={() => handleReset()}
        >
          reset
        </button>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default PersonalForm;
