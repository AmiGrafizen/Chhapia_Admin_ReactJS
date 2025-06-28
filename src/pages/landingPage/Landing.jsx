import React, { useRef, useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { Header } from '../../Components/header/Header'
import wdwssd from '../../../public/img/backhotel.avif'
import JoditEditor from "jodit-react";
import {
  Modal as NextUIModal,
  ModalBody, Modal,
  ModalContent,
} from "@nextui-org/react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFaqAction, getBlogAction, getTeamAction, getTestimonialAction, addFaqAction, addTeamAction, addBlogAction, addTestimonialAction, updateTeamAction, updateFAQAction, updateTestimonialAction, updateBlogAction, getHeroAction, updateHeroAction, addHeroAction, } from "../../redux/action/landingManagement";
import { ApiDelete, ApiGet, ApiPost } from "../../helper/axios";
import uploadToHPanel from "../../helper/uploadToHpanel";

export default function Landing() {
  const [selectedmodalopen, setModalOpen] = useState(false);
  const [blogmodalopen, setBlogModalOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [headDescription, setHeadDescription] = useState("");
  // const [sections, setSections] = useState([{ subTitle: "", description: "", icon: "" }]);
  const [selectedAboutUsImage, setSelectedAboutUsImage] = useState(null);
  const [savedAboutUsImages, setSavedAboutUsImages] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sections, setSections] = useState([]);

  const dispatch = useDispatch();

  const teams = useSelector((state) => state.landing.getService);
  const faqs = useSelector((state) => state.landing.getFaq);
  const blogs = useSelector((state) => state.landing.getBlog);
  const testimonials = useSelector((state) => state.landing.getTestimonial);
  const hero = useSelector((state) => state.landing.getHeroSection);

  const [newAbout, setNewAbout] = useState({ title: "", description: "", images: [] });
  const [newFAQ, setNewFAQ] = useState({ name: "", count: "", image: "" });
  const [newTeamMember, setNewTeamMember] = useState({ name: "", description: "", image: "" });
  const [newBlog, setNewBlog] = useState({ category: "", description: "", title: "", image: "" });
  const [newTestimonial, setNewTestimonial] = useState({ image: "", description: "" });
  const [newHero, setNewHero] = useState({ image: "" });

  const editor = useRef(null);
  const placeholder = "Start typing...";

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageTeam, setSelectedImageTeam] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [deleteData, setDeleteData] = useState({ type: "", id: "" });


  console.log('testimonials', testimonials)


  useEffect(() => {
    // dispatch(fetchAboutUs());
    dispatch(getFaqAction());
    dispatch(getTeamAction());
    dispatch(getBlogAction());
    dispatch(getTestimonialAction());
    dispatch(getHeroAction());
  }, [dispatch]);

  useEffect(() => {
    ApiGet("/admin/about-us")
      .then((response) => {
        console.log("response", response)
        setAboutData(response.AboutUs);
        if (response.AboutUs) {
          setHeadDescription(response.AboutUs.headDescription);
          setSavedAboutUsImages(response.AboutUs.image || []);
          setSections(response.AboutUs.sections?.length ? response.AboutUs.sections : [{ subTitle: "", description: "" }]);
        }
      })
      .catch((error) => console.error("Error fetching About Us data:", error));
  }, []);


  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );


  const handleModalclose = () => {
    setModalOpen(false)
    setBlogModalOpen(false)
  }
  const handleAboutModal = () => {
    setModalOpen(true)
  }

  const handleBlogModal = () => {
    setBlogModalOpen(true)
  }
  const handleBlogModalclose = () => {
    setBlogModalOpen(false)
  }


  const handleAboutUsImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      alert("Please select images before submitting.");
      return;
    }
    const localPreviews = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setGalleryImages((prev) => [...prev, ...localPreviews]);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadToHPanel(file);
          return imageUrl;
        })
      );
      setUploadedImages((prevImages) => [...prevImages, ...uploaded]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };


  const uploadGalleryImages = async () => {
    if (galleryImages.length === 0) {
      alert("Please select images before submitting.");
      return;
    }
    try {
      const uploaded = await Promise.all(
        galleryImages.map(async (image) => {
          const imageUrl = await uploadToHPanel(image.file);
          return imageUrl;
        })
      );
      setUploadedImages([...uploadedImages, ...uploaded]);
      setGalleryImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  // Remove image
  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUploadteam = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageTeam(imageUrl);
    }
  };

  // Handle Save Image
  const handleSaveImage = () => {
    if (selectedImage) {
      setSavedImages([...savedImages, selectedImage]);
      setSelectedAboutUsImage(null); // Clear preview after saving
    }
  };

  // Handle Delete Image
  const handleDeleteImage = (index) => {
    const updatedImages = savedImages.filter((_, i) => i !== index);
    setSavedImages(updatedImages);
  };

  const handleIconUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const imageUrl = await uploadToHPanel(file);
      setSections((prevSections) => {
        const updatedSections = [...prevSections];
        if (updatedSections[index]) {
          updatedSections[index].icon = imageUrl;
        }
        return updatedSections;
      });
    } catch (error) {
      console.error("Error uploading icon:", error);
      alert("Failed to upload icon.");
    }
  };


  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addNewSection = () => {
    setSections([...sections, { subTitle: "", description: "" }]);
  };

  const handleAboutImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAbout((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting Data:", { headDescription, image: newAbout.image, sections });

    if (!headDescription || !newAbout.image) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    try {
      let imageUrl = newAbout.image;

      // Upload only if image is a File object
      if (newAbout.image instanceof File) {
        imageUrl = await uploadToHPanel(newAbout.image);
        if (!imageUrl) {
          alert("Image upload failed.");
          return;
        }
      }

      const payload = {
        headDescription,
        image: imageUrl,
        sections,
      };

      await ApiPost('/admin/about-us', payload);

      alert('Saved Successfully!');
      handleModalclose();
      setHeadDescription("");
      setNewAbout({ headDescription: "", image: null });
      setSections([{ subTitle: '', description: '' }]);
    } catch (error) {
      console.error('Error saving data:', error);
      alert("Submission failed. Please try again.");
    }
  };


  const addSection = () => {
    setSections([...sections, { subTitle: '', description: '' }]);
  };

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const previewUrl = URL.createObjectURL(file);
  //   setNewTeamMember((prev) => ({
  //     ...prev,
  //     image: file,
  //     preview: previewUrl,
  //   }));

  //   const uploadedUrl = await uploadToHPanel(file);

  //   if (uploadedUrl) {
  //     setNewTeamMember((prev) => ({
  //       ...prev,
  //       cloudUrl: uploadedUrl,
  //     }));
  //   } else {
  //     alert("Image upload failed!");
  //   }
  // };


  const handleEditFAQ = (item) => {
    setNewFAQ({
      _id: item._id,
      name: item.name,
      count: item.count,
      image: item.image,
    });
  };

  const handleFaqImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected FAQ image file:", file);
      setNewFAQ((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddFAQ = async () => {
    try {
      // Check if all required fields are filled
      if (!newFAQ.name || !newFAQ.count || !newFAQ.image) {
        alert("Please fill all fields and upload an image.");
        return;
      }

      // Upload the image if it's a File object (not already a URL)
      let imageUrl = newFAQ.image;
      if (newFAQ.image instanceof File) {
        const uploadedUrl = await uploadToHPanel(newFAQ.image);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Build the payload with the image URL (string)
      const payload = {
        name: newFAQ.name,
        count: newFAQ.count,
        image: imageUrl,
      };

      console.log("Final FAQ payload:", payload);

      // Dispatch your Redux actions
      if (newFAQ._id) {
        dispatch(updateFAQAction(newFAQ._id, payload));
      } else {
        dispatch(addFaqAction(payload));
      }

      // Reset the form state
      setNewFAQ({ name: "", count: "", image: null });
      dispatch(getFaqAction())

      alert("FAQ added successfully!");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      alert("Something went wrong.");
    }
  };


  const handleEditHero = (item) => {
    setNewHero({
      _id: item._id,
      image: item.image,
    });
  };

  const handleHeroImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected FAQ image file:", file);
      setNewHero((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddHero = async () => {
    try {
      // Check if all required fields are filled
      if (!newHero.image) {
        alert("Please upload an image.");
        return;
      }

      // Upload the image if it's a File object (not already a URL)
      let imageUrl = newHero.image;
      if (newHero.image instanceof File) {
        const uploadedUrl = await uploadToHPanel(newHero.image);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Build the payload with the image URL (string)
      const payload = {
        image: imageUrl,
      };

      console.log("Final Hero payload:", payload);

      // Dispatch your Redux actions
      if (newHero._id) {
        dispatch(updateHeroAction(newHero._id, payload));
      } else {
        dispatch(addHeroAction(payload));
      }

      // Reset the form state
      setNewHero({ image: null });
      dispatch(getHeroAction())

      alert("Image added successfully!");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      alert("Something went wrong.");
    }
  };


  const handleTeamImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTeamMember((prev) => ({ ...prev, image: file }));
    }
  };


  const handleAddTeam = async () => {
    if (
      !newTeamMember.name ||
      !newTeamMember.description ||
      !newTeamMember.image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      let imageUrl = newTeamMember.image;

      // Upload image only if it's a File object (not already a URL string)
      if (newTeamMember.image instanceof File) {
        const uploadedUrl = await uploadToHPanel(newTeamMember.image);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        name: newTeamMember.name,
        description: newTeamMember.description,
        image: imageUrl, // must be a URL string
      };

      if (newTeamMember._id) {
        dispatch(updateTeamAction(newTeamMember._id, payload));
      } else {
        dispatch(addTeamAction(payload));
      }

      // Reset form
      setNewTeamMember({ name: "", description: "", image: null });
      dispatch(getTeamAction());

      // Refresh the list
      getTeamAction();

      alert("Team member added successfully!");
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Something went wrong.");
    }
  };


  const handleEditBlog = (item) => {
    setNewBlog({
      _id: item._id,
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
    });
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBlog((prev) => ({ ...prev, image: file }));
    }
  };


  const handleAddBlog = async () => {
    console.log("handleAddBlog called");

    if (!newBlog.category || !newBlog.description || !newBlog.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      let imageUrl = newBlog.image;

      // Upload image only if it's a File object
      if (newBlog.image instanceof File) {
        const uploadedUrl = await uploadToHPanel(newBlog.image);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        title: newBlog.title,
        category: newBlog.category,
        description: newBlog.description,
        image: imageUrl, // Use the actual URL
      };

      if (newBlog._id) {
        dispatch(updateBlogAction(newBlog._id, payload));
      } else {
        dispatch(addBlogAction(payload));
      }

      setNewBlog({ title: "", category: "", description: "", image: null });
      dispatch(getBlogAction());
      alert("Data Added Successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog.");
    }
  };



  const handleEditTestimonial = (item) => {
    setNewTestimonial({
      _id: item._id,
      description: item.description,
      image: item.image,
    });
  };


  const handleAddTestimonial = async () => {
    if (!newTestimonial.description) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const payload = {
        description: newTestimonial.description,
      };

      if (newTestimonial._id) {
        dispatch(updateTestimonialAction(newTestimonial._id, payload));
      } else {
        dispatch(addTestimonialAction(payload));
      }

      setNewTestimonial({ description: "" });
      dispatch(getTestimonialAction());
      alert("Data Added Successfully!");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial.");
    }
  };



  const handleEditTeam = (member) => {
    setNewTeamMember({
      _id: member._id,
      name: member.name,
      description: member.description,
      image: member.image,
    });
  };
  const closeDeleteModal = () => {
    setIsDelOpen(false)
  }
  const deleteopen = () => {
    setIsDelOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteData.id || !deleteData.type) return;

    try {
      let url = "";

      switch (deleteData.type) {
        case "team":
          url = `/admin/service/${deleteData.id}`;
          break;
        case "faq":
          url = `/admin/calculation/${deleteData.id}`;
          break;
        case "testimonial":
          url = `/admin/what-we-do/${deleteData.id}`;
          break;
        case "blog":
          url = `/admin/why-us/${deleteData.id}`;
          break;
        case "hero":
          url = `/admin/hero-section/${deleteData.id}`;
          break;
        default:
          return;
      }

      await ApiDelete(url, {}, "DELETE");


      // Refresh all sections
      dispatch(getTeamAction());
      dispatch(getFaqAction());
      dispatch(getTestimonialAction());
      dispatch(getBlogAction());
      dispatch(getHeroAction());

      setIsDelOpen(false);
      setDeleteData({ type: "", id: "" });
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item.");
    }
  };



  return (
    <>

      <div className="w-[100%] md11:w-[100%] md150:w-[100%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  px-[30px] py-[30px] ">
        <div className="  flex   w-[100%] md11:h-[100vh] overflow-hidden md150:h-[90vh]  relative    rounded-[19px] border-[1px] border-[#007e2c]">
          <Header />
          <div className=" flex flex-col w-[100%] mt-[20px] gap-[30px]">
            <div className="flex  p  gap-[10px] border-b-[1px] border-[#007e2c] pl-[30px]  pb-[10px] md11:top-[4.1%]   md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
              <i className="fa-solid fa-angle-up fa-rotate-270"></i>

              <div className=" font-Potua  flex items-center gap-[10px] cursor-pointer">
                <p>LANDING</p>
                <p>MANAGEMENT</p>
              </div>
            </div>

            <div className=" pl-[20px] font-Poppins flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
              <div className="  py-[10px] px-[20px] flex flex-col  md150:h-[70vh] md11:h-[73vh]  gap-[30px] overflow-y-auto  h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">
                    Herosection</p>
                  <div className="flex w-[100%] flex-wrap gap-[20px] ">
                    <div className=" flex  rounded-[8px] border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">


                      <label className="h-[300px] w-[530px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                        {newHero.image ? (
                          <img
                            src={
                              newHero.image
                                ? typeof newHero.image === "string"
                                  ? newHero.image
                                  : URL.createObjectURL(newHero.image)
                                : ""
                            }
                            alt="preview"
                            className="h-full w-full object-cover"

                          />
                        ) : (
                          <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                        )}
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleHeroImageChange}
                        />
                      </label>


                      <div className="w-[100%] h-[40px] rounded-md  cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddHero}
                      >

                        <p>Submit</p>
                      </div>
                    </div>

                    {Array.isArray(hero) && hero.map(h => (
                      <div key={h?.id} className=" flex  rounded-[8px] border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">


                        <label className="h-[300px] w-[530px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                          <img src={h?.image} alt="preview" className="h-full w-full object-cover" />
                          {/* 

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleHeroImageChange}
                          /> */}

                        </label>

                        <div className="w-[100%] h-[40px] gap-[10px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditHero(h)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                            onClick={() => {
                              setDeleteData({ type: "hero", id: h._id });
                              setIsDelOpen(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>

                </div>


                <div className=" flex  w-[100%]  flex-col mt-[10px] gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">About Us</p>

                  <div className="flex justify-center">
                    {aboutData?.map((item, index) => (
                      <div key={index} className="flex w-[100%] flex-col justify-between gap-[20px] cursor-pointer">
                        <div className=" gap-[20px] flex justify-between w-[100%]">
                          <div className="w-[60%] flex flex-col gap-[20px]">
                            <div
                              className="border-[1.5px] border-[#007e2c] overflow-y-auto  rounded-[8px] h-[120px] p-[10px]"
                            > {item?.headDescription} </div>
                            <div className=' flex flex-col  gap-[10px] w-[100%] '>
                              <div className=' flex  text-[20px] font-[600] '> Our Vission And Mission </div>
                              {item?.sections?.map((section, index) => (
                                <div key={index} className=' flex    gap-[10px]  w-[100%] '>

                                  <div className=' flex-col  gap-[10px] flex w-[100%]'>
                                    <div className='  h-[50px] w-[100%] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex '>
                                      {section?.subTitle}
                                    </div>
                                    <div className='  h-[120px] overflow-y-auto w-[100%] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[4px] flex '>
                                      {section?.description}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className=" flex w-[40%]">
                            <img className=" w-[100%] object-cover h-[400px] rounded-[10px]" src={item?.image} />
                          </div>

                        </div>

                      </div>

                    ))}
                  </div>
                  <button className=' text-[#fff] bg-[#007e2c] text-[20px] flex py-[5px] justify-center items-center rounded-lg  w-[130px]' onClick={handleAboutModal}>
                    Add
                  </button>
                </div>
                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed h-[10px] border-[#007e2c]'>

                </div>
                <div className=" flex  w-[100%]  flex-col mt-[10px] gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">Our Comprehensive Services</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col w-[320px] p-[14px] rounded-lg border-[#007e2c] border-[1.8px]  gap-[10px]">
                      <label className="h-[200px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                        {newTeamMember.image ? (
                          <img
                            src={
                              newTeamMember.image
                                ? typeof newTeamMember.image === "string"
                                  ? newTeamMember.image
                                  : URL.createObjectURL(newTeamMember.image)
                                : ""
                            }
                            alt="preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                        )}
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleTeamImageChange} />
                      </label>
                      <div className=" w-[100%] h-[40px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                        <input
                          className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                          type="text"
                          id=""
                          placeholder="Title "
                          name="name"
                          value={newTeamMember.name}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                        />
                      </div>

                      <div className="w-[100%]  flex border-[#007e2c] overflow-hidden border-[1.8px] h-[100px] rounded-[8px]">
                        <textarea placeholder="Details" className=" flex w-[100%] h-[100%] p-[10px] outline-none"
                          name="description"
                          value={newTeamMember.description}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, description: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]  font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddTeam}
                      >
                        <p>Submit</p>
                      </div>
                    </div>

                    {Array.isArray(teams) && teams.map((member, index) => (
                      <div key={index} className="flex flex-col border-[#007e2c] border-[1.8px] p-[10px] rounded-lg w-[320px] gap-[10px]">
                        <div className="h-[200px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                          <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                        </div>
                        <div className=" w-[100%] h-[40px]  px-[10px] py-[5px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-y-auto">
                          <p>
                            {member.name}
                          </p>
                        </div>

                        <div className="w-[100%] flex overflow-y-auto px-[10px] border-[#007e2c] border-[1.8px] h-[100px] justify-center items-center  rounded-[8px]">
                          <p>
                            {member.description}
                          </p>
                        </div>
                        <div className="w-[100%] h-[40px]  rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditTeam(member)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                            onClick={() => {
                              setDeleteData({ type: "team", id: member._id });
                              setIsDelOpen(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>

                </div>



                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed h-[10px] border-[#007e2c]'>

                </div>
                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">What we do</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col w-[350px]  p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                      <div className=' flex w-[100%] gap-[10px]'>


                      </div>

                      <div className="w-[100%] flex border-[#007e2c] border-[1.8px] h-[50px] rounded-[8px]">
                        <input
                          className="w-[100%] font-[400] rounded-[8px] px-[9px] items-center flex justify-center  outline-none h-[100%]"
                          type="text"
                          placeholder='Description'
                          name="description"
                          value={newTestimonial.description}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddTestimonial}
                      >
                        <p>Submit</p>
                      </div>
                    </div>

                    {testimonials?.map((item, index) => (
                      <div key={index} className="flex flex-col w-[380px] border-[1.8px] border-[#007e2c]   p-[14px] rounded-lg gap-[10px]">
                        <div className=' flex w-[100%] gap-[10px]'>


                        </div>

                        <div className="w-[100%] flex border-[#007e2c] border-[1.8px] h-[50px] rounded-[8px]">
                          <div
                            className="w-[100%] font-[400] rounded-[8px] p-[9px] outline-none h-[100%]  overflow-y-auto "
                          >
                            {item?.description}
                          </div>
                        </div>
                        <div className="w-[100%] h-[40px]  justify-between rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditTestimonial(item)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                            onClick={() => {
                              setDeleteData({ type: "testimonial", id: item._id });
                              setIsDelOpen(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>

                    ))}
                  </div>

                </div>
                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed  border-[#007e2c]'>

                </div>


                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">
                    Innovation in Manufacturing</p>
                  <div className="flex w-[100%] flex-wrap gap-[20px] ">
                    <div className=" flex  rounded-[8px] border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">


                      <label className="h-[200px] w-[230px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                        {newFAQ.image ? (
                          <img
                            src={
                              newFAQ.image
                                ? typeof newFAQ.image === "string"
                                  ? newFAQ.image
                                  : URL.createObjectURL(newFAQ.image)
                                : ""
                            }
                            alt="preview"
                            className="h-full w-full object-cover"

                          />
                        ) : (
                          <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                        )}
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFaqImageChange}
                        />
                      </label>
                      <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                        <input
                          className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                          type="text"
                          id=""
                          placeholder="Number"
                          name="count"
                          value={newFAQ.count}
                          onChange={(e) => setNewFAQ({ ...newFAQ, count: e.target.value })}
                        />
                      </div>
                      <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                        <input
                          className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                          type="text"
                          id=""
                          placeholder="Title"
                          name="name"
                          value={newFAQ.name}
                          onChange={(e) => setNewFAQ({ ...newFAQ, name: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md  cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddFAQ}>

                        <p>Submit</p>
                      </div>
                    </div>

                    {faqs?.map((item, index) => (
                      <div key={index} className=" flex  rounded-[8px] border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">


                        <label className="h-[200px] w-[230px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                          <img src={item?.image} alt="preview" className="h-full w-full object-cover" />


                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUploadteam}
                          />

                        </label>
                        <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                          {item?.count}
                        </div>
                        <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                          {item?.name}
                        </div>
                        <div className="w-[100%] h-[40px] gap-[10px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditFAQ(item)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                            onClick={() => {
                              setDeleteData({ type: "faq", id: item._id });
                              setIsDelOpen(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed  border-[#007e2c]'>
                </div>


                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">Why Us</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col w-[310px]  p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                      <div className=' flex w-[100%] gap-[10px]' >
                        <label className="h-[180px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {newBlog.image ? (
                            <img
                              src={
                                newBlog.image
                                  ? typeof newBlog.image === "string"
                                    ? newBlog.image
                                    : URL.createObjectURL(newBlog.image)
                                  : ""
                              }
                              alt="preview"
                              className="h-full w-full object-cover"

                            />
                          ) : (
                            <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                          )}
                          {/* Hidden File Input */}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleBlogImageChange} />
                        </label>
                      </div>
                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden px-[10px] border-[1.8px] h-[40px] rounded-[8px]">
                        <input type="text "
                          placeholder=" tag"
                          className=" w-[100%] h-[100%]"
                          name="title"
                          value={newBlog.title}
                          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden text-[19px] px-[10px] border-[1.8px] h-[70px] rounded-[8px]">
                        <input type="text "
                          placeholder=" Title"
                          className=" w-[100%] h-[100%]"
                          name="category"
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden p-[5px] border-[1.8px] h-[120px] overflow-y-auto rounded-[8px]">
                        <textarea type="text "
                          placeholder=" Title"
                          className=" w-[100%] h-[100%] outline-none"
                          name="description"
                          value={newBlog.description}
                          onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                        > </textarea>
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddBlog}
                      >
                        <p>Submit</p>
                      </div>
                    </div>
                    {blogs?.map((item, index) => (
                      <div key={index} className="flex flex-col w-[310px]  p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                        <div className=' flex w-[100%] gap-[10px]' >
                          <label className="h-[180px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                            <img src={item?.image} alt="preview" className="h-full w-full object-cover" />

                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                setNewBlog({ ...newBlog, image: e.target.files[0] })
                              } />
                          </label>

                        </div>
                        <div className="w-[100%] flex border-[#007e2c] overflow-hidden px-[10px] border-[1.8px] h-[40px] rounded-[8px]">
                          <p>{item?.title}</p>
                        </div>
                        <div className="w-[100%] flex border-[#007e2c] text-[17px] items-center overflow-y-auto px-[10px] border-[1.8px] h-[70px] rounded-[8px]">
                          <p>{item?.category}</p>
                        </div>
                        <div className="w-[100%] flex border-[#007e2c] overflow-y-auto p-[5px] border-[1.8px] h-[120px] rounded-[8px]">
                          <p>
                            {item?.description}
                          </p>
                        </div>
                        <div className="w-[100%] h-[40px] gap-[10px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditBlog(item)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                            onClick={() => {
                              setDeleteData({ type: "blog", id: item._id });
                              setIsDelOpen(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
      <NextUIModal isOpen={selectedmodalopen} onOpenChange={handleModalclose}>
        <ModalContent className="md:max-w-[1050px] font-Poppins   overflow-y-auto border-[#007e2c] border-1 max-w-[433px] relative  flex  pb-[50px]  mx-auto  h-[650px] shadow-delete ">
          {(handleModalclose) => (
            <>
              <div className=" flex  w-[100%] h-[100%] flex-col px-[30px]  relative mt-[10px] gap-[20px] ">
                <p className="font-[500] text-[30px] font-Montserrat">About Us</p>



                <div className="flex justify-center relative w-[100%]">
                  <div className="flex w-[100%] flex-col justify-between gap-[20px] cursor-pointer">
                    <div className=" gap-[20px] flex justify-between w-[100%]">


                      <div className="w-[100%] flex  flex-col gap-[20px]">
                        <div className=" flex flex-col  gap-[10px] w-[100%]">



                          <div
                            className="border-[2px] w-[100%] border-[#007e2c] rounded-[8px] h-[100px] p-[10px]"
                          > <textarea className=' flex w-[100%] h-[100%] outline-none'
                            placeholder='Main Title'
                            type='text'
                            name="headDescription"
                            value={headDescription}
                            onChange={(e) => setHeadDescription(e.target.value)}
                          ></textarea>
                          </div>
                        </div>
                        <div className=' flex flex-col  gap-[10px] w-[100%] '>
                          <div className=' flex  text-[20px] w-[100%] font-[600] '> Our Vission And Mission </div>
                          {sections.map((section, index) => (
                            <div key={index} className=' flex   border-[2px] p-[10px] rounded-[9px] border-[#007e2c]  gap-[10px]  w-[100%] '>

                              <div className=' flex-col  gap-[10px] flex w-[100%]'>
                                <div className=' overflow-hidden p-[8px]  h-[50px] w-[100%] rounded-[9px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[5px] flex '>
                                  <input className=' flex w-[100%] h-[100%]'
                                    type='text'
                                    placeholder="Title"
                                    name="subTitle"
                                    value={section.subTitle}
                                    onChange={(e) => handleSectionChange(index, "subTitle", e.target.value)}
                                  />
                                </div>
                                <div className='  h-[120px] w-[100%] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[9px]  overflow-x-hiddenflex '>

                                  <textarea className=' flex h-[100%] w-[100%] rounded-[9px] outline-none p-[6px]'
                                    placeholder="Description"
                                    name="description"
                                    value={section.description}
                                    onChange={(e) => handleSectionChange(index, "description", e.target.value)}>
                                  </textarea>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* {sections.map((section, index) => (
                            <div key={index} className="border-[#007e2c] border-[1.8px] p-2 rounded">
                                <label className="h-[150px] w-[150px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                              {savedImages ? (
                                <img src={savedImages} alt="preview" className="h-full w-full object-cover" />
                              ) : (
                                <i className="fa-solid text-[20px] text-[#007e2c] fa-plu"></i>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleIconUpload}
                              />
                            </label>
                              <input type="text" placeholder="Subtitle" className="w-full p-1 border-[#007e2c] border rounded" value={section.subTitle} onChange={(e) => {
                                const newSections = [...sections];
                                newSections[index].subTitle = e.target.value;
                                setSections(newSections);
                              }} />
                              <textarea placeholder="Description" className="w-full p-1 border-[#007e2c] border rounded mt-1" value={section.description} onChange={(e) => {
                                const newSections = [...sections];
                                newSections[index].description = e.target.value;
                                setSections(newSections);
                              }}></textarea>
                            </div>
                          ))} */}
                          <button onClick={addSection} className="mt-3 bg-[#007e2c] text-white px-3 py-1 rounded">+ Add Section</button>
                        </div>
                      </div>
                      <div className=" w-[fit]">
                        <label className="h-[370px] w-[370px] border-[#007e2c] border-[2px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {newAbout.image ? (
                            <img src={URL.createObjectURL(newAbout.image)} alt="preview" className="h-full w-full object-cover" />
                          ) : (
                            <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                          )}
                          {/* Hidden File Input */}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAboutImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-[100%]">
                  <button onClick={handleSubmit} className="mt-3  bg-[#007e2c]  text-white left-0 right-0 bottom-0  text-[20px]  mx-auto px-3 py-[10px] mb-[30px] rounded-[10px] w-[100%]">Save</button>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </NextUIModal>

      <NextUIModal isOpen={blogmodalopen} >
        <ModalContent className="md:max-w-[950px]  font-Poppins  overflow-y-auto   border-[#007e2c] border-1 max-w-[433px] relative  flex justify-center mx-auto   h-[700px] shadow-delete ">
          {(handleModalclose) => (
            <>
              <div className=" bg-[#cc0c0c] flex absolute  top-0 gap-[10px]   items-center  cursor-pointer text-[#fff] right-0  px-[10px] w-[100px]  " onClick={handleBlogModalclose}>
                <i className="fa-solid fa-circle-xmark"></i>
                close
              </div>
              <div className=" flex  w-[100%]  flex-col px-[30px]    mt-[10px] gap-[20px] ">
                <div className=' flex  w-[100%]'>
                  <div className=' w-[100%] flex gap-[20px]'>
                    <div className=' flex w-[fit] flex-col justify-center'>

                      <label className="h-[230px] w-[230px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                        {newBlog.image ? (
                          <img src={newBlog.image} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                          <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                        )}
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        />
                      </label>
                      <div className=' flex mx-auto'>
                        Main image blog
                      </div>
                    </div>
                    <div className=' flex  w-[100%] flex-col justify-center'>
                      <label className="h-[230px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                        {selectedImageTeam ? (
                          <img src={selectedImageTeam} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                          <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                        )}
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUploadteam}
                        />
                      </label>
                      <div className=' flex mx-auto'>
                        Details Image
                      </div>
                    </div>

                  </div>

                </div>
                <div className=" w-[200px]">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className=" flex  w-[100px] border"
                  />
                </div>

                <JoditEditor
                  ref={editor}
                  value={newBlog.content}
                  config={config}
                  tabIndex={2}
                  onBlur={(newContent) => {
                    setNewBlog((prev) => ({ ...prev, content: newContent }));
                  }}
                />

              </div>
              <div className=" flex w-[100%]  pt-[30px]">
                <button className=' text-[#fff] bg-[#007e2c] text-[20px] flex py-[5px]  justify-center items-center mt-[40x] rounded-lg  mx-auto w-[93%]'
                  onClick={handleAddBlog}>
                  Add
                </button>
              </div>

            </>
          )}
        </ModalContent>
      </NextUIModal>



      <NextUIModal isOpen={isDelOpen} onOpenChange={setIsDelOpen}>
        <ModalContent className="md:max-w-[350px] max-w-[333px] relative  flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
          {(onClose) => (
            <>
              <div className="relative w-[100%] h-[100%] ">
                <div className="relative  w-[100%] h-[100%]">
                  <div className="w-[100%] flex gap-7 flex-col">
                    <div className="w-[100%] mt-[30px] p-[10px] mx-auto flex justify-center s">
                      <i className=" text-[80px] text-[red] shadow-delete-icon rounded-full fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className=" mx-auto justify-center flex text-[28px] font-[500]  font-Montserrat ">
                      <p>Are you sure ?</p>
                    </div>
                    <div className="absolute bottom-0 flex w-[100%]">
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600]  font-Montserrat  text-[20px]"
                        onClick={handleDelete}
                      >
                        <p>Delete</p>
                      </div>
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[#26b955] rounded-br-[10px] text-[#fff] font-[600]  font-Montserrat  text-[20px]"
                        onClick={closeDeleteModal}
                      >
                        <p>Cancel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </NextUIModal>

    </>
  )
}
