import React, { useRef, useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { Header } from '../../Components/header/Header'
import { Star, Quote } from 'lucide-react';
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
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../helper/axios";
import uploadToHPanel from "../../helper/uploadToHpanel";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function Landing() {
  const [selectedmodalopen, setModalOpen] = useState(false);
  const [blogmodalopen, setBlogModalOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();

  const teams = useSelector((state) => state.landing.getService);
  const calculation = useSelector((state) => state.landing.getFaq);
  const blogs = useSelector((state) => state.landing.getBlog);
  const testimonials = useSelector((state) => state.landing.getTestimonial);
  const hero = useSelector((state) => state.landing.getHeroSection);

  const [newCalculation, setNewCalculation] = useState({ name: "", count: "" });
  const [newTeamMember, setNewTeamMember] = useState({ name: "", description: "", icon: "" });
  const [newBlog, setNewBlog] = useState({ category: "", description: "", title: "", image: "" });
  const [   newTestimonial, setNewTestimonial] = useState({ image: "", description: "", name: "", profession: "", rating: "" });
  const [newHero, setNewHero] = useState({ image: "" });
  const [whyData, setWhyData] = useState({ image: null, title: '', description: '', icon: '' });
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [aboutId, setAboutId] = useState(null);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
  });
  const [faqs, setFaqs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const editor = useRef(null);
  const placeholder = "Start typing...";

  const [selectedImageTeam, setSelectedImageTeam] = useState(null);
  const [deleteData, setDeleteData] = useState({ type: "", id: "" });
  const [blogData, setBlogData] = useState({
    image: null,
    title: "",
    tag: "",
    description: "",
    date: new Date(),
    readTime: "",
  });

  const [coreData, setCoreData] = useState({
    icon: null,
    title: "",
    description: "",
  });

  const [coreList, setCoreList] = useState([]);


  console.log('testimonials', testimonials)


  useEffect(() => {
    // dispatch(fetchAboutUs());
    dispatch(getFaqAction());
    dispatch(getTeamAction());
    dispatch(getTestimonialAction());
    dispatch(getHeroAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await ApiGet("/admin/about-us");
        console.log('resdsefgh', res)
        if (res) {
          setAboutData({
            title: res?.title || "",
            description: res?.description || "",
            image: res?.image || null,
          });
          setPreviewImage(res?.image);
          setAboutId(res?._id);
        }
      } catch (error) {
        console.error("Failed to load About Us", error);
      }
    };

    fetchAboutUs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await ApiGet("/admin/faq");
      setFaqs(res.data || []);
    } catch (error) {
      console.error("Error fetching FAQs", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchWhyList = async () => {
    try {
      const res = await ApiGet('/admin/why-choose-us');
      setWhyData(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWhyList();
  }, []);

  useEffect(() => {
    fetchCoreValues();
  }, []);

  const fetchCoreValues = async () => {
    try {
      const res = await ApiGet("/admin/core-value");
      if (res.data) {
        setCoreList(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch core values:", error);
    }
  };



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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };


  const handleDescriptionChange = (newContent) => {
    setAboutData((prev) => ({ ...prev, description: newContent }));
  };

  const handleImageUploadteam = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageTeam(imageUrl);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview while uploading
      setPreviewImage(URL.createObjectURL(file));

      // Upload to HPanel
      const uploadedUrl = await uploadToHPanel(file);

      if (uploadedUrl) {
        setAboutData((prev) => ({ ...prev, image: uploadedUrl }));
      } else {
        alert("Image upload failed");
        setPreviewImage(null);
      }
    }
  };
  const handleTestimonialImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview while uploading
      setPreviewImage(URL.createObjectURL(file));

      // Upload to HPanel
      const uploadedUrl = await uploadToHPanel(file);

      if (uploadedUrl) {
        setNewTestimonial((prev) => ({ ...prev, image: uploadedUrl }));
      } else {
        alert("Image upload failed");
        setPreviewImage(null);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!aboutData.title || !aboutData.description || !aboutData.image) {
        alert("Please fill all fields and upload an image.");
        return;
      }

      const response = await ApiPost("/admin/about-us", aboutData);

      if (response?.data?.success) {
        alert(response.data.message || "About Us saved successfully!");
        setModalOpen(false);
      } else {
        alert(response.data.message || "Failed to save About Us.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error?.message || "Something went wrong during submission.");
    }
  };


  const handleEditCalculation = (item) => {
    setNewCalculation({
      _id: item._id,
      name: item.name,
      count: item.count,
      image: item.image,
    });
  };

  const handleAddCalculation = async () => {
    try {
      if (!newCalculation.name || !newCalculation.count) {
        alert("Please fill all fields and upload an image.");
        return;
      }

      let imageUrl = newCalculation.image;
      if (newCalculation.image instanceof File) {
        const uploadedUrl = await uploadToHPanel(newCalculation.image);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        name: newCalculation.name,
        count: newCalculation.count,
      };

      console.log("Final FAQ payload:", payload);

      if (newCalculation._id) {
        dispatch(updateFAQAction(newCalculation._id, payload));
      } else {
        dispatch(addFaqAction(payload));
      }

      setNewCalculation({ name: "", count: "", image: null });
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
      setNewTeamMember((prev) => ({ ...prev, icon: file }));
    }
  };


  const handleAddTeam = async () => {
    if (
      !newTeamMember.name ||
      !newTeamMember.description ||
      !newTeamMember.icon
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      let imageUrl = newTeamMember.icon;

      if (newTeamMember.icon instanceof File) {
        const uploadedUrl = await uploadToHPanel(newTeamMember.icon);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        title: newTeamMember.name,
        description: newTeamMember.description,
        icon: imageUrl,
      };

      if (newTeamMember._id) {
        dispatch(updateTeamAction(newTeamMember._id, payload));
      } else {
        dispatch(addTeamAction(payload));
      }

      // Reset form
      setNewTeamMember({ name: "", description: "", icon: null });
      dispatch(getTeamAction());

      // Refresh the list
      getTeamAction();

      alert("Team member added successfully!");
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Something went wrong.");
    }
  };

  const handleWhyUsImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const uploadedUrl = await uploadToHPanel(file);
      if (uploadedUrl) {
        setWhyData((prev) => ({ ...prev, image: uploadedUrl }));
      } else {
        alert("Image upload failed.");
      }
    }
  };

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToHPanel(file);
      if (url) setWhyData((prev) => ({ ...prev, icon: url }));
    }
  };

  const handleSubmitWhyUs = async () => {
    if (!whyData.title || !whyData.description || !whyData.image) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      title: whyData.title,
      description: whyData.description,
      image: whyData.image,
      icon: whyData.icon,
    };

    try {
      if (editId) {
        await ApiPut(`/admin/why-choose-us/${editId}`, payload);
      } else {
        await ApiPost('/admin/why-choose-us', payload);
      }

      alert(`Data ${editId ? 'updated' : 'added'} successfully!`);
      fetchWhyList();
      setWhyData({ image: null, title: '', description: '', icon: '' });
      setEditId(null);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit data.");
    }
  };

  const handleEditWhyUs = (item) => {
    setWhyData({
      title: item.title,
      description: item.description,
      image: item.image,
      icon: item.icon || '',
    });
    setEditId(item._id);
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
      setBlogData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setBlogData((prev) => ({ ...prev, date }));
  };

  const handleBlogSubmit = async () => {
    let imageUrl = blogData.image;

    if (imageUrl && typeof imageUrl !== "string") {
      imageUrl = await uploadToHPanel(imageUrl);
      if (!imageUrl) {
        alert("Image upload failed.");
        return;
      }
    }

    const payload = {
      title: blogData.title,
      tag: blogData.tag,
      description: blogData.description,
      date: blogData.date.toISOString(),
      readTime: blogData.readTime,
      image: imageUrl,
    };

    try {
      const response = await ApiPost("/admin/blog", payload);
      alert("Blog submitted!");
      console.log(response);
    } catch (error) {
      console.error("Blog submission failed", error);
      alert("Submission failed");
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
      profession: item.profession,
      name: item?.name,
      rating: item?.rating,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaq({ ...newFaq, [name]: value });
  };


  const handleCoreIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoreData((prev) => ({ ...prev, icon: file }));
    }
  };

  const handleAddCore = async () => {
    if (!coreData.title || !coreData.description) {
      alert("Please fill in title and description");
      return;
    }

    try {
      let iconUrl = coreData.icon;

      if (iconUrl && typeof iconUrl !== "string") {
        iconUrl = await uploadToHPanel(iconUrl);
        if (!iconUrl) {
          alert("Image upload failed.");
          setLoading(false);
          return;
        }
      }

      const payload = {
        image: iconUrl,
        title: coreData.title,
        description: coreData.description,
      };

      const res = await ApiPost("/admin/core-value", payload);
      if (res.data) {
        fetchCoreValues();
        setCoreData({ icon: null, title: "", description: "" });
      } else {
        alert("Failed to submit core value.");
      }
    } catch (error) {
      console.error("Error adding core value:", error);
    }
  };



  const handleSubmitFaq = async (e) => {
    e.preventDefault();

    const payload = {
      question: newFaq.question,
      answer: newFaq.answer,
    };

    try {
      if (isEditing) {
        await ApiPut(`/admin/faq/${editId}`, payload);
        alert("Updated successfully!");
      } else {
        await ApiPost("/admin/faq", payload);
        alert("Added successfully!");
      }

      fetchFaqs();
      setNewFaq({ question: "", answer: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding/updating FAQ", error);
      alert("Failed to add/update FAQ.");
    }
  };

  const handleEdit = (item) => {
    setNewFaq({
      question: item.question,
      answer: item.answer,
      images: item.images || [null, null],
    });
    setEditId(item._id);
    setIsEditing(true);
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.description) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const payload = {
        description: newTestimonial.description,
        image: newTestimonial.image,
        name: newTestimonial.name,
        profession: newTestimonial.profession,
        rating: newTestimonial.rating,
      };

      console.log('payload', payload)

      if (newTestimonial._id) {
        dispatch(updateTestimonialAction(newTestimonial._id, payload));
      } else {
        dispatch(addTestimonialAction(payload));
      }

      setNewTestimonial({ description: "", image: "", name: "", profession: "", rating: "" });
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
          url = `/admin/testimonial/${deleteData.id}`;
          break;
        case "blog":
          url = `/admin/why-choose-us/${deleteData.id}`;
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

  const [newBlogFaq, setNewBlogFaq] = useState({
    images: [null, null] // Initialize with two null values for two image placeholders
  });

  // Handles uploading an image to the specified index
  const handleImageUpload = (e, index) => {
    const newImages = [...newBlogFaq.images];
    newImages[index] = e.target.files[0]; // Set the selected image for the correct index
    setNewBlogFaq((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index === rating ? 0 : index); 
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
                    <div className="flex w-[100%] flex-col justify-between gap-[20px] cursor-pointer">
                      <div className=" gap-[20px] flex justify-between w-[100%]">
                        <div className="w-[60%] flex flex-col gap-[20px]">
                          <div className=' flex-col  gap-[10px] flex w-[100%]'>
                            <div className='  h-[50px] w-[100%] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex '>
                              {aboutData?.title}
                            </div>
                            <div
                              className='h-[180px] overflow-y-auto w-full border-[#007e2c] border-[1.8px] rounded-[4px] p-2'
                              dangerouslySetInnerHTML={{ __html: aboutData.description }}
                            ></div>

                          </div>
                        </div>
                        <div className=" flex w-[40%]">
                          <img className=" w-[96%] object-cover h-[240px] rounded-[10px]" src={aboutData?.image} />
                        </div>
                      </div>
                    </div>
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
                    <div className="flex flex-col h-fit w-[320px] p-[14px] rounded-lg border-[#007e2c] border-[1.8px]  gap-[10px]">
                      <div className="flex gap-1">
                        <label className="h-[70px] w-[100px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {newTeamMember.icon ? (
                            <img
                              src={
                                newTeamMember.icon
                                  ? typeof newTeamMember.icon === "string"
                                    ? newTeamMember.icon
                                    : URL.createObjectURL(newTeamMember.icon)
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
                            name="title"
                            value={newTeamMember.name}
                            onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                          />
                        </div>
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
                        <div className="flex gap-1">
                          <div className="h-[70px] w-[100px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                            <img src={member.icon} alt={member.title} className="h-full w-full object-cover" />
                          </div>
                          <div className=" w-[100%] h-[40px]  px-[10px] py-[5px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-y-auto">
                            <p>
                              {member.title}
                            </p>
                          </div>
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

                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed  border-[#007e2c]'>

                </div>


                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">
                    Innovation in Manufacturing</p>
                  <div className="flex w-[100%] flex-wrap gap-[20px] ">
                    <div className=" flex  rounded-[8px] h-fit border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">
                      <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                        <input
                          className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                          type="text"
                          id=""
                          placeholder="Number"
                          name="count"
                          value={newCalculation.count}
                          onChange={(e) => setNewCalculation({ ...newCalculation, count: e.target.value })}
                        />
                      </div>
                      <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                        <input
                          className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                          type="text"
                          id=""
                          placeholder="Title"
                          name="name"
                          value={newCalculation.name}
                          onChange={(e) => setNewCalculation({ ...newCalculation, name: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md  cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddCalculation}>

                        <p>Submit</p>
                      </div>
                    </div>

                    {Array.isArray(calculation) && calculation.map((item, index) => (
                      <div key={index} className="w-[250px] flex  rounded-[8px] border-[#007e2c] border-[1.8px] p-[10px] flex-col gap-[10px]">
                        <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                          {item?.count}
                        </div>
                        <div className=" w-[100%] h-[45px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                          {item?.name}
                        </div>
                        <div className="w-[100%] h-[40px] gap-[10px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                          <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                            onClick={() => handleEditCalculation(item)}
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
                  <p className="font-[500] text-[30px] font-Montserrat">Why Choose Us</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col w-[310px] h-fit p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                      <div className=' flex w-[100%] gap-[10px] h-[180px] border-[#007e2c] border-[1.8px]  justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative' >
                        <label className=" w-[100%] flex justify-center items-center">

                          {/* <label
                            htmlFor=""
                            className="h-[50px] w-[50px] border-[#007e2c] border-[1.8px] top-2 left-2 rounded-[8px] cursor-pointer overflow-hidden absolute"
                          >
                            <input type="file" accept="hidden" className="hidden" />
                            <i className="fa-solid fa-plus text-[20px] text-[#007e2c] w-full h-full flex justify-center items-center"></i>
                          </label> */}

                          {whyData.image ? (
                            <img
                              src={
                                whyData.image
                                  ? typeof whyData.image === "string"
                                    ? whyData.image
                                    : URL.createObjectURL(whyData.image)
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
                            onChange={handleWhyUsImageChange} />
                        </label>

                        <label className="h-[50px] w-[50px] border-[#007e2c] border-[1.8px] top-2 left-2 rounded-[8px] cursor-pointer overflow-hidden absolute">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleIconChange}
                          />
                          {whyData.icon ? (
                            <img
                              src={
                                typeof whyData.icon === "string"
                                  ? whyData.icon
                                  : URL.createObjectURL(whyData.icon)
                              }
                              alt="icon"
                              className="h-full w-auto"
                            />
                          ) : (
                            <i className="fa-solid fa-plus text-[20px] text-[#007e2c] w-full h-full flex justify-center items-center"></i>
                          )}
                        </label>
                      </div>

                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden text-[19px] px-[10px] border-[1.8px] h-[50px] rounded-[8px]">
                        <input type="text "
                          placeholder=" Title"
                          className=" w-[100%] h-[100%]"
                          name="title"
                          value={whyData.title}
                          onChange={(e) => setWhyData({ ...whyData, title: e.target.value })}
                        />
                      </div>
                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden p-[5px] border-[1.8px] h-[120px] overflow-y-auto rounded-[8px]">
                        <textarea type="text "
                          placeholder=" Description"
                          className=" w-[100%] h-[100%] outline-none"
                          name="description"
                          value={whyData.description}
                          onChange={(e) => setWhyData({ ...whyData, description: e.target.value })}
                        > </textarea>
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleSubmitWhyUs}
                      >
                        <p>Submit</p>
                      </div>
                    </div>
                    {Array.isArray(whyData) && whyData.map((item, index) => (
                      <div key={index} className="flex flex-col w-[310px]  p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                        <div className=' flex w-[100%] gap-[10px]' >
                          <label className="h-[180px] w-[100%] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                            <label
                              htmlFor=""
                              className="h-[50px] w-[50px] border-[#007e2c] border-[1.8px] top-2 left-2 rounded-[8px] cursor-pointer overflow-hidden absolute"
                            >
                              <input type="file" accept="hidden" className="hidden" />
                              <img src={item?.icon} alt="" className="h-[50px]" />
                              {/* <i className="fa-solid fa-plus text-[20px] text-[#007e2c] w-full h-full flex justify-center items-center"></i> */}
                            </label>
                            <img src={item?.image} alt="preview" className="h-full w-full object-cover" />

                          </label>

                        </div>

                        <div className="w-[100%] flex border-[#007e2c] text-[17px] items-center overflow-y-auto px-[10px] border-[1.8px] h-[50px] rounded-[8px]">
                          <p>{item?.title}</p>
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

                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed  border-[#007e2c]'>
                </div>

                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">FAQ</p>

                  <div className="flex gap-[20px] flex-wrap">
                    <div className="flex w-full flex-col md:flex-row justify-between gap-6 p-4 border-[1.8px] border-[#007e2c] rounded-lg">
                      {/* Left: Form Section */}
                      <div className="flex flex-col w-full md:w-2/2 gap-4">
                        {/* Question */}
                        <div className="w-full border-[1.8px] border-[#007e2c] h-[50px] rounded-[8px] px-3 flex items-center">
                          <input
                            type="text"
                            placeholder="Question"
                            className="w-full h-full outline-none"
                            name="question"
                            value={newFaq.question}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Answer */}
                        <div className="w-full border-[1.8px] border-[#007e2c] h-[80px] rounded-[8px] p-2">
                          <textarea
                            placeholder="Answer"
                            className="w-full h-full resize-none outline-none"
                            name="answer"
                            value={newFaq.answer}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div
                          className="w-full h-[40px] rounded-md cursor-pointer flex justify-center items-center text-white font-semibold bs-mix-green active:scale-95 transition-transform"
                          onClick={handleSubmitFaq}
                        >
                          <p>Submit</p>
                        </div>
                        {Array.isArray(faqs) && faqs.map((faq, index) => (
                          <div key={index} className="w-full flex flex-col gap-3 p-4 border-[1.8px] border-[#007e2c] rounded-lg">
                            <div className="w-full border-[1.8px] border-[#007e2c] h-[50px] rounded-[8px] px-3 flex items-center">
                              {faq.question}
                            </div>
                            <div className="w-full border-[1.8px] border-[#007e2c] h-[80px] rounded-[8px] px-3 flex items-center">
                              {faq.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>


                </div>


                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed  border-[#007e2c]'>
                </div>


                <div className=" flex  w-[100%]  flex-col  gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">Blogs</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col w-[310px] h-fit p-[14px] rounded-lg border-[#007e2c] border-[1.8px] gap-[10px]">
                      <div className=' flex w-[100%] gap-[10px] h-[180px] border-[#007e2c] border-[1.8px]  justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative' >
                        <label className=" w-[100%] flex justify-center items-center">

                          {/* <label
                            htmlFor=""
                            className="h-[50px] w-[50px] border-[#007e2c] border-[1.8px] top-2 left-2 rounded-[8px] cursor-pointer overflow-hidden absolute"
                          >
                            <input type="file" accept="hidden" className="hidden" />
                            <i className="fa-solid fa-plus text-[20px] text-[#007e2c] w-full h-full flex justify-center items-center"></i>
                          </label> */}

                          {blogData.image ? (
                            <img
                              src={
                                blogData.image
                                  ? typeof blogData.image === "string"
                                    ? blogData.image
                                    : URL.createObjectURL(blogData.image)
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

                        {/* <label className="h-[50px] w-[50px] border-[#007e2c] border-[1.8px] top-2 left-2 rounded-[8px] cursor-pointer overflow-hidden absolute">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleIconChange}
                          />
                          {whyData.icon ? (
                            <img
                              src={
                                typeof whyData.icon === "string"
                                  ? whyData.icon
                                  : URL.createObjectURL(whyData.icon)
                              }
                              alt="icon"
                              className="h-full w-auto"
                            />
                          ) : (
                            <i className="fa-solid fa-plus text-[20px] text-[#007e2c] w-full h-full flex justify-center items-center"></i>
                          )}
                        </label> */}
                      </div>

                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden text-[19px] px-[10px] border-[1.8px] h-[50px] rounded-[8px]">
                        <input type="text "
                          placeholder="Tag"
                          className=" w-[100%] h-[100%]"
                          name="tag"
                          value={blogData.tag}
                          onChange={handleBlogChange}
                        />
                      </div>

                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden text-[19px] px-[10px] border-[1.8px] h-[50px] rounded-[8px]">
                        <input type="text "
                          placeholder=" Title"
                          className=" w-[100%] h-[100%]"
                          name="title"
                          value={blogData.title}
                          onChange={handleBlogChange}
                        />
                      </div>
                      <div className="w-[100%] flex border-[#007e2c] overflow-hidden p-[5px] border-[1.8px] h-[120px] overflow-y-auto rounded-[8px]">
                        <textarea type="text "
                          placeholder=" Description"
                          className=" w-[100%] h-[100%] outline-none"
                          name="description"
                          value={blogData.description}
                          onChange={handleBlogChange}
                          rows={4}
                        > </textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="border-[#007e2c] border-[2px]  rounded outline-none  hover:outline-none focus:border-[#007e2c] focus:ring-0">
                          <DatePicker selected={blogData.date}
                            onChange={handleDateChange}
                            className="outline-none" />
                        </div>
                        <div className=" border-[#007e2c] border-[2px]  rounded outline-none focus:border-[#007e2c] focus:ring-0">
                          <input
                            type="text"
                            className="w-[100px]"
                            name="readTime"
                            value={blogData.readTime}
                            onChange={handleBlogChange}
                          />
                        </div>
                      </div>

                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleBlogSubmit}
                      >
                        <p>Submit</p>
                      </div>
                    </div>

                  </div>

                </div>

                <div className=' flex w-[100%] border-t-[1.5px]  border-dashed h-[10px] border-[#007e2c]'>

                </div>
                <div className=" flex  w-[100%]  flex-col mt-[10px] gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">Our Core Values </p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col h-fit w-[320px] p-[14px] rounded-lg border-[#007e2c] border-[1.8px]  gap-[10px]">
                      <div className="flex gap-1">
                        <label className="h-[70px] w-[100px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {coreData.icon ? (
                            <img
                              src={
                                coreData.icon
                                  ? typeof coreData.icon === "string"
                                    ? coreData.icon
                                    : URL.createObjectURL(coreData.icon)
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
                            onChange={handleCoreIconChange} />
                        </label>
                        <div className=" w-[100%] h-[40px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-hidden">
                          <input
                            className="w-[100%] font-[500] rounded-[8px] px-[9px] outline-none h-[100%]"
                            type="text"
                            id=""
                            placeholder="Title "
                            name="title"
                            value={coreData.title}
                            onChange={(e) => setCoreData({ ...coreData, title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="w-[100%]  flex border-[#007e2c] overflow-hidden border-[1.8px] h-[100px] rounded-[8px]">
                        <textarea placeholder="Details" className=" flex w-[100%] h-[100%] p-[10px] outline-none"
                          name="description"
                          value={coreData.description}
                          onChange={(e) => setCoreData({ ...coreData, description: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]  font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddCore}
                      >
                        <p>Submit</p>
                      </div>
                    </div>

                    {Array.isArray(coreList) && coreList.map((member, index) => (
                      <div key={index} className="flex flex-col border-[#007e2c] border-[1.8px] p-[10px] rounded-lg w-[320px] gap-[10px]">
                        <div className="flex gap-1">
                          <div className="h-[70px] w-[100px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                            <img src={member.image} alt={member.title} className="h-full w-full object-cover" />
                          </div>
                          <div className=" w-[100%] h-[40px]  px-[10px] py-[5px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-y-auto">
                            <p>
                              {member.title}
                            </p>
                          </div>
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
                <div className=" flex  w-[100%]  flex-col mt-[10px] gap-[20px] ">
                  <p className="font-[500] text-[30px] font-Montserrat">Testimonials</p>

                  <div className="flex gap-[20px] flex-wrap ">
                    <div className="flex flex-col h-fit w-[320px] p-[14px] rounded-lg border-[#007e2c] border-[1.8px]  gap-[10px]">
                      <div className="flex items-center gap-[20px]">
                        <label className="h-[80px] w-[90px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {newTestimonial.image ? (
                            <img
                              src={
                                newTestimonial.image
                                  ? typeof newTestimonial.image === "string"
                                    ? newTestimonial.image
                                    : URL.createObjectURL(newTestimonial.image)
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
                            onChange={handleTestimonialImageChange} />
                        </label>

                        <div className="flex gap-1">

                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                value={newTestimonial.rating} onChange={e => setNewTestimonial({ ...newTestimonial, rating: e.target.value })}
                                onClick={() => handleClick(i)}
                                className={`w-5 h-5 cursor-pointer ${i <= rating ? 'text-green-900 fill-current' : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>

                          {/* </div> */}
                        </div>
                      </div>


                      <div className="w-[100%]  flex border-[#007e2c] overflow-hidden border-[1.8px] h-[100px] rounded-[8px]">
                        <textarea placeholder="Description" className=" flex w-[100%] h-[100%] p-[10px] outline-none"
                          name="description"
                          value={newTestimonial.description}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="flex items-center gap-[10px]">

                        <div className=" border-[#007e2c] border-[2px] px-2 rounded-[7px] overflow-hidden outline-none focus:border-[#007e2c] focus:ring-0">
                          <input
                            placeholder="Name"
                            type="text"
                            className="w-[135px] h-[30px]"
                            name="name"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          />
                        </div>

                        <div className=" border-[#007e2c] border-[2px] px-2 rounded-[7px] overflow-hidden outline-none focus:border-[#007e2c] focus:ring-0">
                          <input
                            placeholder="Profession"
                            type="text"
                            className="w-[135px] h-[30px]"
                            name="profession"
                            value={newTestimonial.profession}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, profession: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]  font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                        onClick={handleAddTestimonial}
                      >
                        <p>Submit</p>
                      </div>
                    </div>
                    {/* 
                    {Array.isArray(teams) && teams.map((member, index) => (
                      <div key={index} className="flex flex-col border-[#007e2c] border-[1.8px] p-[10px] rounded-lg w-[320px] gap-[10px]">
                        <div className="flex gap-1">
                          <div className="h-[70px] w-[100px] border-[#007e2c] border-[1.8px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">

                            <img src={member.icon} alt={member.title} className="h-full w-full object-cover" />
                          </div>
                          <div className=" w-[100%] h-[40px]  px-[10px] py-[5px] border-[#007e2c] border-[1.8px] justify-center items-center rounded-[8px] flex cursor-pointer overflow-y-auto">
                            <p>
                              {member.title}
                            </p>
                          </div>
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
                    ))} */}
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
                            className="border-[2px] w-[100%] border-[#007e2c] rounded-[8px] h-[50px] p-[10px]"
                          > <input className=' flex w-[100%] h-[100%] outline-none'
                            placeholder='Title'
                            type='text'
                            name="title"
                            value={aboutData.title}
                            onChange={handleChange}
                          ></input>
                          </div>
                        </div>
                        <div className=' flex flex-col  gap-[10px] w-[100%] '>
                          <div className='jodit'>
                            <JoditEditor
                              value={aboutData.description}
                              onChange={handleDescriptionChange}
                              config={{
                                height: 300,
                                minHeight: 204,
                                readonly: false,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-fit">
                        <label className="h-[370px] w-[370px] border-[#007e2c] border-[2px] flex justify-center items-center rounded-[8px] cursor-pointer overflow-hidden relative">
                          {aboutData.image ? (
                            <img
                              src={
                                typeof aboutData.image === "string"
                                  ? aboutData.image
                                  : URL.createObjectURL(aboutData.image)
                              }
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <i className="fa-solid text-[20px] text-[#007e2c] fa-plus"></i>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
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
