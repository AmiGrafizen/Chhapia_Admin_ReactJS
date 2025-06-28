import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmenitieAction,
  addAmenitieOptionAction,
  addBedTypeAction,
  addCategoryAction,
  addRoomViewAction,
  addSubAmenitieAction,
  deleteAmenitiesAction,
  deleteBedTypeAction,
  deleteCategoryAction,
  deleteRoomViewAction,
  deleteSubAmenitiesAction,
  getAllAmenitiesAction,
  getAllBedTYpesAction,
  getAllCategoryAction,
  getAmenitiesOptionAction,
  getExtraChargeAction,
  getRazorPayAction,
  getRoomViewAction,
  getSubAmenitiesAction,
  updateAmenitiesAction,
  updateBedTypeAction,
  updateCategoryAction,
  updateRoomViewAction,
  updateSubAmenitiesAction,
} from "../../redux/action/ProductManagement";

import {
  Modal as NextUIModal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import Editimg from "../../../public/img/Foodsection/edit.png";
import { ApiPost } from "../../helper/axios";

export default function SelfServingManage() {
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] =
    useState(null);
  const [isInputVisible, setInputVisible] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [isbedInputVisible, setbedInputVisible] = useState("");
  const [inputbedValue, setInputbedValue] = useState("");
  const [popupbedVisible, setPopupbedVisible] = useState(null);

  const [isroomInputVisible, setroomInputVisible] = useState("");
  const [inputroomValue, setInputroomValue] = useState("");
  const [popuproomVisible, setPopuproomVisible] = useState(null);

  const [popupVisible, setPopupVisible] = useState(null);
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deleteContext, setDeleteContext] = useState(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [selectedmodalopen, setModalOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [roomViews, setRoomViews] = useState([]);
  const [viewName, setViewName] = useState("");
  const [editingViewCategory, setEditingViewCategory] = useState(null);
  const [editViewCategoryName, setEditViewCategoryName] = useState("");
  const [editingViewCategoryId, setEditingViewCategoryId] = useState(null);
  const [selectedViewCategoryIndex, setSelectedViewCategoryIndex] = useState(0);
  const [isviewInputVisible, setViewInputVisible] = useState(null);

  const [BedTypes, setBedTypes] = useState([]);
  const [typeName, setTypeName] = useState("");
  const [edititngTypeCategory, setEditingTypeCategory] = useState(null);
  const [editTypeCategoryName, setEditTypeCategoryName] = useState("");
  const [editingTypeCategoryId, setEditingTypeCategoryId] = useState(null);
  const [selectedTypeCategoryIndex, setSelectedTypeCategoryIndex] = useState(0);
  const [istypeInputVisible, setTypeInputVisible] = useState(null);

  const [amenities, setAmenities] = useState([]);
  const [amenityName, setAmenityName] = useState("");
  const [editingAmenityIndex, setEditingAmenityIndex] = useState(null);
  const [editAmenityName, setEditAmenityName] = useState("");
  const [editingAmenityId, setEditingAmenityId] = useState(null);
  const [isAmenityInputVisible, setAmenityInputVisible] = useState(false);
  const [selectedAmenityIndex, setSelectedAmenityIndex] = useState(null);
  const [subAmenityName, setSubAmenityName] = useState("");
  const [istypeSubaminiInputVisible, setTypeSubaminiInputVisible] =
    useState(false);
  const [editingSubAmenityIndex, setEditingSubAmenityIndex] = useState(null);
  const [editSubAmenityName, setEditSubAmenityName] = useState("");

  const [subAmenities, setSubAmenities] = useState([]);

  const [newOption, setNewOption] = useState("");

  const [razorPay, setRazorPay] = useState("");
  const [razorPayKey, setRazorPayKey] = useState("");
  const [razorPaySecret, setRazorPaySecret] = useState("");
  const [charges, setCharges] = useState([]);
  const [form, setForm] = useState({
    gst: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.getAllCategory);
  const viewData = useSelector((state) => state.categories.getRoomView);
  const typeData = useSelector((state) => state.categories.getBedType);
  const amenity = useSelector((state) => state.categories.getAmenities);
  const subAmenity = useSelector(
    (state) => state.categories.getSubAmenitiesById
  );
  const options = useSelector((state) => state.categories.getAmenitiesOption);
  const razorPayData = useSelector((state) => state.categories.getRazorPay);
  const extraCharge = useSelector((state) => state.categories.getExtraCharge);

  useEffect(() => {
    setCategories(category || []);
    setRoomViews(viewData || []);
    setBedTypes(typeData || []);
    setAmenities(amenity || []);
    setSubAmenities(subAmenity || []);
    setNewOption(options || []);
    setRazorPay(razorPayData || []);
    setCharges(extraCharge || []);
  }, [
    category,
    viewData,
    typeData,
    amenity,
    subAmenity,
    options,
    razorPayData,
    extraCharge,
  ]);

  useEffect(() => {
    dispatch(getAllCategoryAction());
    dispatch(getRoomViewAction());
    dispatch(getAllBedTYpesAction());
    dispatch(getAllAmenitiesAction());
    dispatch(getRazorPayAction());
    dispatch(getExtraChargeAction());
  }, [dispatch]);

  const handlePlusClick = () => {
    setInputVisible(true);
  };

  const handleModalclose = () => {
    setModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const handleModalopen = () => {
    setModalOpen(true);
  };

  const handleSubCategoryClick = (index, subCategoryId) => {
    setSelectedSubcategoryIndex(index);
    dispatch(getAmenitiesOptionAction(subCategoryId));
  };

  const handleKeyPress = (e, context) => {
    if (e?.key === "Enter") {
      e.preventDefault(); // Prevent default browser behavior like form submission

      console.log(`Key pressed: ${e.key}, Context: ${context}`);
      if (context === "category") {
        editingCategoryId ? handleSaveEditCategory() : handleAddCategory();
      } else if (context === "roomView") {
        editingViewCategoryId
          ? handleSaveEditViewCategory()
          : handleAddViewCategory();
      } else if (context === "bedType") {
        editingTypeCategoryId
          ? handleSaveEditTypeCategory()
          : handleAddTypeCategory();
      } else if (context === "amenity") {
        editingAmenityId ? handleSaveEditAmenities() : handleAddAmenity();
      }
    }
  };

  const handleDelete = async () => {
    try {
      let success = false;

      if (deleteContext === "category") {
        success = await dispatch(deleteCategoryAction(categoryIdToDelete));
        if (success) {
          setCategories((prev) =>
            prev.filter((category) => category._id !== categoryIdToDelete)
          );
        }
      } else if (deleteContext === "viewData") {
        success = await dispatch(deleteRoomViewAction(categoryIdToDelete));
        if (success) {
          setRoomViews((prev) =>
            prev.filter((viewData) => viewData._id !== categoryIdToDelete)
          );
        }
      } else if (deleteContext === "typeData") {
        success = await dispatch(deleteBedTypeAction(categoryIdToDelete));
        if (success) {
          setBedTypes((prev) =>
            prev.filter((typeData) => typeData._id !== categoryIdToDelete)
          );
        }
        window.location.reload();
      } else if (deleteContext === "amenity") {
        success = await dispatch(deleteAmenitiesAction(categoryIdToDelete));
        if (success) {
          setAmenities((prev) =>
            prev.filter((amenity) => amenity._id !== categoryIdToDelete)
          );
        }
      } else if (deleteContext === "subAmenity") {
        success = await dispatch(deleteSubAmenitiesAction(categoryIdToDelete));
        if (success) {
          setSubAmenities((prev) =>
            prev.filter((subAmenity) => subAmenity._id !== categoryIdToDelete)
        );
        window.location.reload();
        }
      }

      if (success) {
        setModalOpen(false);
        setCategoryIdToDelete(null);
      } else {
        alert(`Failed to delete ${deleteContext}.`);
      }
    } catch (error) {
      console.error(`Error deleting ${deleteContext}:`, error);
      alert(`Failed to delete ${deleteContext}.`);
    }
  };

  const handleSaveEditCategory = async (index, id) => {
    if (!id) {
      console.error("Error: No ID provided for editing.");
      return;
    }

    if (!editCategoryName.trim()) {
      alert("Room category name cannot be empty.");
      return;
    }
    console.log("Payload being sent:", { name: editCategoryName.trim() });

    try {
      const success = await dispatch(
        updateCategoryAction(id, { name: editCategoryName.trim() })
      );

      if (success) {
        setCategories((preCategories) =>
          preCategories.map((category, idx) =>
            idx === index
              ? { ...category, name: editCategoryName.trim() }
              : category
          )
        );
        alert("Room category updated successfully!");
        setEditingCategory(null); // Exit editing mode
        setEditCategoryName(""); // Clear input
      } else {
        alert("Failed to update room category.");
      }
    } catch (error) {
      console.error("Error updating room category:", error);
      alert("An error occurred while updating the room category.");
    }
  };

  const handleSaveEditViewCategory = async (index, id) => {
    if (!id) {
      console.error("Error: No ID provided for editing.");
      return;
    }

    if (!editViewCategoryName.trim()) {
      alert("Room view name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(
        updateRoomViewAction(id, { viewName: editViewCategoryName.trim() })
      );

      if (success) {
        setRoomViews((prevRoomViews) =>
          prevRoomViews.map((view, idx) =>
            idx === index
              ? { ...view, viewName: editViewCategoryName.trim() }
              : view
          )
        );
        alert("Room view updated successfully!");
        setEditingViewCategory(null); // Exit editing mode
        setEditViewCategoryName(""); // Clear input
      } else {
        alert("Failed to update room view.");
      }
    } catch (error) {
      console.error("Error updating room view:", error);
      alert("An error occurred while updating the room view.");
    }
  };

  const handleSaveEditTypeCategory = async (index, id) => {
    if (!id) {
      console.error("Error: No ID provided for editing.");
      return;
    }

    if (!editTypeCategoryName.trim()) {
      alert("Bed Type name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(
        updateBedTypeAction(id, { typeName: editTypeCategoryName.trim() })
      );

      if (success) {
        setRoomViews((preBedTypes) =>
          preBedTypes.map((type, idx) =>
            idx === index
              ? { ...type, typeName: editTypeCategoryName.trim() }
              : type
          )
        );
        alert("Bed type updated successfully!");
        setEditingTypeCategory(null); // Exit editing mode
        setEditTypeCategoryName(""); // Clear input
      } else {
        alert("Failed to update bed type.");
      }
    } catch (error) {
      console.error("Error updating bed type:", error);
      alert("An error occurred while updating the bed type.");
    }
  };

  const handleSaveEditAmenities = async () => {
    if (!editAmenityName.trim()) {
      alert("Amenitity name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(
        updateAmenitiesAction(editingAmenityId, editAmenityName.trim())
      );
      if (success) {
        setAmenities((prevCategories) =>
          prevCategories.map((amenity) =>
            amenity._id === editingAmenityId
              ? { ...amenity, name: editAmenityName.trim() }
              : amenity
          )
        );
        setEditingAmenityId(null);
        setEditAmenityName("");
      } else {
        alert("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating the category.");
    }
  };

  const handleAddCategory = async (event) => {
    if (event.key !== "Enter") return;

    if (!name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(addCategoryAction(name.trim()));
      console.log("success", success);
      if (success) {
        setName("");
        dispatch(getAllCategoryAction());
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("An error occurred while adding the category.");
    }
  };

  const handleAddViewCategory = async () => {
    if (!viewName.trim()) {
      alert("Room view name cannot be empty.");
      return;
    }

    console.log("viewName", viewName);

    try {
      const newRoomView = await dispatch(
        addRoomViewAction({ viewName: viewName.trim() })
      );
      setRoomViews((prevViews) => [...prevViews, newRoomView]);
      setViewName(""); // Clear input field
      alert("Room view added successfully!");
    } catch (error) {
      console.error("Failed to add room view:", error);
      alert("An error occurred while adding the room view.");
    }
  };

  const handleAddTypeCategory = async (event) => {
    if (event.key !== "Enter") return;

    if (!typeName.trim()) {
      alert("Bed Type name cannot be empty.");
      return;
    }

    console.log("typeName", typeName);
    try {
      const newBedTypes = await dispatch(
        addBedTypeAction({ typeName: typeName.trim() })
      );

      setBedTypes((prevViews) => [...prevViews, newBedTypes]);
      window.location.reload();
      setTypeName("");
    } catch (error) {
      console.error("Failed to add room view:", error);
      alert("An error occurred while adding the room view.");
    }
  };

  const handleAddAmenity = async (event) => {
    if (event.key !== "Enter") return;

    if (!amenityName.trim()) {
      alert("Amenity name cannot be empty.");
      return;
    }

    try {
      const newRoomView = await dispatch(
        addAmenitieAction({ title: amenityName.trim() })
      );

      setAmenities((prevViews) => [...prevViews, newRoomView]);

      setAmenityName("");
    } catch (error) {
      console.error("Failed to add room view:", error);
      alert("An error occurred while adding the room view.");
    }
  };

  const handleAddSubAmenity = async (event) => {
    if (event.key !== "Enter") return;

    if (!subAmenityName.trim()) {
      alert("Amenity name cannot be empty.");
      return;
    }

    const selectedAmenity = amenities[selectedAmenityIndex];
    if (!selectedAmenity?._id) {
      alert("Please select an amenity first.");
      return;
    }

    try {
      const newSubAmenity = await dispatch(
        addSubAmenitieAction({
          name: subAmenityName.trim(),
          amenitiesId: selectedAmenity._id,
        })
      );

      if (newSubAmenity?.amenitiesId) {
        setSubAmenityName("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to add room view:", error);
      alert("An error occurred while adding the room view.");
    }
  };

  const handleAddAmenitiesOption = async () => {
    if (!bottomInputValue.trim()) {
      alert("Option name cannot be empty.");
      return;
    }

    const selectedSubCategory = subAmenity[selectedSubcategoryIndex];

    if (!selectedSubCategory?._id) {
      alert("Please select a subcategory first.");
      return;
    }

    try {
      const newOption = await dispatch(
        addAmenitieOptionAction({
          name: bottomInputValue.trim(),
          amenitiesId: selectedSubCategory._id,
        })
      );

      setNewOption((prevOptions) =>
        Array.isArray(prevOptions) ? [...prevOptions, newOption] : [newOption]
      );
      setBottomInputValue("");
    } catch (error) {
      console.error("Error adding option:", error);
      alert("Failed to add option. Please try again.");
    }
  };

  const handleRazorPaySubmit = async () => {
    if (!razorPayKey.trim() || !razorPaySecret.trim()) {
      alert("Both Key and Secret are required.");
      return;
    }

    try {
      const data = {
        key: razorPayKey.trim(),
        secret: razorPaySecret.trim(),
      };
      console.log("Sending payload:", data);

      const response = await ApiPost("/admin/razor-pay", data);

      if (response.status === 200 || response.status === 201) {
        setRazorPayKey("");
        setRazorPaySecret("");
      } else {
        alert("Failed to add RazorPay keys. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add RazorPay keys:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleAddExtraCharges = async () => {
    const data = {
      gst: form.gst,
      breakfast: form.breakfast,
      lunch: form.lunch,
      dinner: form.dinner,
    };

    try {
      const response = await fetch(
        "https://server.grafizn.in/api/v2/hotel/admin/extra-charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("data", data);

      const result = await response.json();
      console.log("result", result);

      if (result.otherData) {
        dispatch(getExtraChargeAction());
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving charge:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleCategoryClick = (index) => {
    setSelectedCategoryIndex(index);
  };

  const handleCategoryDoubleClick = (category, index) => {
    setEditingCategory(index);
    setInputValue(category.name);
  };

  const handleViewCategoryClick = (id) => {
    setSelectedViewCategoryIndex(id);
  };

  const handleViewCategoryDoubleClick = (viewData, index) => {
    setEditingViewCategory(index);
    setInputroomValue(viewData.name);
  };

  const handleTypeCategoryClick = (index) => {
    setSelectedTypeCategoryIndex(index);
  };

  const handleTypeCategoryDoubleClick = (typeData, index) => {
    setEditingTypeCategory(index);
    setInputbedValue(typeData.name);
  };

  const handleOpenDeleteModal = (context, id) => {
    setDeleteContext(context);
    setCategoryIdToDelete(id);
    setModalOpen(true);
  };
  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      popupVisible !== null
    ) {
      setPopupVisible(null);
    }
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setInputVisible("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupVisible]);

  const handleroomClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      popuproomVisible !== null
    ) {
      setPopuproomVisible(null);
    }
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setroomInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleroomClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleroomClickOutside);
  }, [popuproomVisible]);

  const handlebedClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      popupbedVisible !== null
    ) {
      setPopupbedVisible(null);
    }
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setbedInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlebedClickOutside);
    return () =>
      document.removeEventListener("mousedown", handlebedClickOutside);
  }, [popupbedVisible]);

  const handleAmenityClick = (index) => {
    setSelectedAmenityIndex(index);
    const selectedAmenity = amenities[index];
    if (selectedAmenity?._id) {
      console.log("selectedAmenity", selectedAmenity?._id);
      dispatch(getSubAmenitiesAction(selectedAmenity._id));
    }
  };

  // Handle input for the bottom section
  const [bottomInputValue, setBottomInputValue] = useState("");
  const handleBottomInputChange = (e) => {
    setBottomInputValue(e.target.value);
  };

  const handleEditaminiClick = (index, currentValue) => {
    setBottomInputValue(currentValue || ""); // Populate input field with current value or empty if undefined
    setIsEditing(true); // Enable edit mode
    setEditIndex(index); // Track the index of the item being edited
  };

  const handleEditAmenity = (index, name) => {
    setEditingAmenityIndex(index);
    setEditAmenityName(name);
  };

  const handleSaveEditAmenity = async (id, index) => {
    if (!editAmenityName.trim()) {
      alert("Amenity name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(
        updateAmenitiesAction(id, { title: editAmenityName.trim() })
      );
      if (success) {
        const updatedAmenities = [...amenities];
        updatedAmenities[index].title = editAmenityName.trim();
        setAmenities(updatedAmenities);
        setEditingAmenityIndex(null);
        setEditAmenityName("");
        alert("Amenity updated successfully!");
      }
    } catch (error) {
      console.error("Error updating amenity:", error);
      alert("An error occurred while updating the amenity.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setInputVisible(false);
        setViewInputVisible(false);
        setTypeInputVisible(false);
        setAmenityInputVisible(false);
        setTypeSubaminiInputVisible(false)
        setEditingCategory(false);
        setEditingViewCategory(false);
        setEditingTypeCategory(false);
        setEditingAmenityIndex(false);
       
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditSubAmenity = (index, name) => {
    setEditingSubAmenityIndex(index);
    setEditSubAmenityName(name);
  };
  const handleSaveEditSubAmenity = async (id, index) => {
    if (!editSubAmenityName.trim()) {
      alert("Sub-Amenity name cannot be empty.");
      return;
    }

    try {
      const success = await dispatch(
        updateSubAmenitiesAction(id, { name: editSubAmenityName.trim() })
      );
      if (success) {
        const updatedSubAmenities = [...subAmenities];
        updatedSubAmenities[index].name = editSubAmenityName.trim();
        setSubAmenities(updatedSubAmenities);
        setEditingSubAmenityIndex(null);
        setEditSubAmenityName("");
      }
    } catch (error) {
      console.error("Error updating sub-amenity:", error);
      alert("An error occurred while updating the sub-amenity.");
    }
  };

  return (
    <>
      <div className="w-[100%] py-[5px] flex flex-col gap-[20px] px-[5px]">
        <div className=" flex  flex-col gap-[10px]">
          <div className=" flex font-[600] text-[#007e2c] text-[23px] font-Montserrat">
            <p>Razorpay</p>
          </div>

          <div className=" gap-[10px] mt-[10px] flex w-[100%]">
            <div className="flex  flex-col w-[400px] t rounded-[8px]  items-center justify-center  gap-[10px]">
              <div className="rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] flex w-[100%]">
                <input
                  className="w-[100%] h-[100%] outline-none"
                  type="text"
                  name="key"
                  placeholder="Enter KeyId"
                  value={razorPayKey}
                  onChange={(e) => setRazorPayKey(e.target.value)}
                />
              </div>
              <div className="rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] flex w-[100%]">
                <input
                  className="w-[100%] h-[100%] outline-none"
                  type="text"
                  name="secret"
                  placeholder="Enter KeySecret"
                  value={razorPaySecret}
                  onChange={(e) => setRazorPaySecret(e.target.value)}
                />
              </div>
              <div
                className="w-[100%] h-[45px] rounded-[8px] font-[500] cursor-pointer flex justify-center items-center font-Montserrat  bs-mix-green text-[#fff]"
                onClick={handleRazorPaySubmit}
              >
                Submit
              </div>
            </div>
            {Array.isArray(razorPayData) ? (
              razorPayData.map((item) => (
                <div
                  key={item?.id}
                  className="flex w-[450px]  h-fit p-[20px] rounded-[8px] border-[#007e2c] border-[1px] items-center justify-center  flex-col gap-[10px]"
                >
                  <div className="flex justify-between font-Montserrat font-[400] items-center rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] w-[100%]">
                    <p>{item?.key}</p>
                    <div className="flex gap-[10px]">
                      <img
                        className="w-[20px] cursor-pointer"
                        src={Editimg}
                        alt="Edit"
                      />
                      <i
                        className="text-[18px] mt-[1px] text-[#ff0b0b] cursor-pointer fa-solid fa-trash-can"
                        onClick={handleModalopen}
                      ></i>
                    </div>
                  </div>
                  <div className="flex justify-between font-Montserrat font-[400] items-center rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] flex w-[100%]">
                    <p>{item?.secret}</p>
                    <div className="flex gap-[10px]">
                      <img
                        className="w-[20px] cursor-pointer"
                        src={Editimg}
                        alt="Edit"
                      />
                      <i
                        className="text-[18px] mt-[1px] text-[#ff0b0b] cursor-pointer fa-solid fa-trash-can"
                        onClick={handleModalopen}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p> No RazorPay Data Available</p>
            )}
          </div>
          <div></div>
        </div>
        <div className="w-[100%] flex flex-col gap-[15px]">
          <div className=" flex font-[600] text-[20px] font-Montserrat">
            <p>Room Category</p>
          </div>
          <div className="flex gap-[20px]">
            <div className="flex gap-[15px] items-center flex-wrap">
              {!isInputVisible ? (
                <div className="flex">
                  <div
                    onClick={handlePlusClick}
                    className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] w-[140px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                  >
                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                  </div>
                </div>
              ) : (
                <div
                  className="flex border-[#000] border-dashed border-[1px] rounded-[8px] overflow-hidden"
                  ref={inputRef}
                >
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, "category")}
                    placeholder="Category"
                    className="  px-[10px] py-[5px] md150:w-[120px] md11:w-[120px]"
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="flex-wrap flex relative gap-[10px]">
              {Array.isArray(categories) ? (
                categories.map((category, index) => (
                  <div
                    key={category?.id}
                    className={`border-[0.5px] border-[#000] font-[600] md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer`}
                    onClick={() => handleCategoryClick(category?.id)}
                    onDoubleClick={() =>
                      handleCategoryDoubleClick(category, index)
                    }
                  >
                    {editingCategory === index ? (
                      <>
                        <div className="flex flex-col justify-center ">
                          <input
                            type="text"
                            name="name"
                            value={editCategoryName}
                            onChange={(e) =>
                              setEditCategoryName(e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleSaveEditCategory(index, category?._id)
                            }
                            className="text-center mt-[39px] bg-transparent border-none outline-none"
                            autoFocus
                          />
                          <p
                            className="text-red-500 hover:bg-red-100 bg-white z-[00] border-[1.5px] w-[123px] flex justify-center  text-center mt-[10px] rounded-[5px]  font-Montserrat  cursor-pointer mx-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteModal("category", category?._id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>{category.name}</p>
                    )}
                  </div>
                ))
              ) : (
                <p> No Categories Available</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-[15px]">
          <div className=" flex font-[600] text-[20px] font-Montserrat">
            <p>Room View</p>
          </div>
          <div className="flex gap-[20px]">
            <div className="flex gap-[15px] items-center flex-wrap">
              {!isviewInputVisible ? (
                <div className="flex">
                  <div
                    onClick={() => setViewInputVisible(true)}
                    className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] w-[140px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                  >
                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                  </div>
                </div>
              ) : (
                <div
                  className="flex border-[#000] border-dashed border-[1px] rounded-[8px] overflow-hidden"
                  ref={inputRef}
                >
                  <input
                    type="text"
                    name="viewName"
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, "roomView")}
                    placeholder="Room View"
                    className="  px-[10px] py-[5px] md150:w-[120px] md11:w-[120px]"
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="flex-wrap flex relative gap-[10px]">
              {Array.isArray(roomViews) ? (
                roomViews.map((item, index) => (
                  <div
                    key={item?.id}
                    className={`border-[0.5px] border-[#000] font-[600] md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer`}
                    onClick={() => handleViewCategoryClick(item?.id)}
                    onDoubleClick={() =>
                      handleViewCategoryDoubleClick(item, index)
                    }
                  >
                    {editingViewCategory === index ? (
                      <>
                        <div  ref={inputRef} className="flex flex-col justify-center ">
                          <input
                            type="text"
                            
                            name="viewName"
                            value={editViewCategoryName}
                            onChange={(e) =>
                              setEditViewCategoryName(e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleSaveEditViewCategory(index, item?._id)
                            }
                            className="text-center mt-[39px] bg-transparent border-none outline-none"
                            autoFocus
                          />
                          <p
                            className="text-red-500 hover:bg-red-100 bg-white z-[00] border-[1.5px] w-[123px] flex justify-center  text-center mt-[10px] rounded-[5px]  font-Montserrat  cursor-pointer mx-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteModal("viewData", item?._id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>{item?.viewName}</p>
                    )}
                  </div>
                ))
              ) : (
                <p> No RoomView Available</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-[15px]">
          <div className=" flex font-[600] text-[20px] font-Montserrat">
            <p>Bed type</p>
          </div>
          <div className="flex gap-[20px]">
            <div className="flex gap-[15px]  h-[20px] flex-wrap">
              {!istypeInputVisible ? (
                <div className="flex">
                  <div
                    onClick={() => setTypeInputVisible(true)}
                    className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] w-[140px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                  >
                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                  </div>
                </div>
              ) : (
                <div
                  className="flex border-[#000] border-dashed border-[1px] rounded-[8px] overflow-hidden"
                  ref={inputRef}
                >
                  <input
                    type="text"
                    name="typeName"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    onKeyDown={handleAddTypeCategory}
                    placeholder="Room View"
                    className="  px-[10px] py-[5px] md150:w-[120px] md11:w-[120px]"
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="flex-wrap flex relative gap-[10px]">
              {Array.isArray(typeData) ? (
                typeData.map((item, index) => (
                  <div
                    key={item?.id}
                    className={`border-[0.5px] border-[#000] font-[600] md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer`}
                    onClick={() => handleTypeCategoryClick(item?.id)}
                    onDoubleClick={() =>
                      handleTypeCategoryDoubleClick(item, index)
                    }
                  >
                    {edititngTypeCategory === index ? (
                      <>
                        <div  ref={inputRef} className="flex flex-col justify-center ">
                          <input
                            type="text"
                            name="typeName"
                            value={istypeInputVisible}
                            onChange={(e) =>
                              setEditTypeCategoryName(e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleSaveEditTypeCategory(index, item?._id)
                            }
                            className="text-center mt-[39px] bg-transparent border-none outline-none"
                            autoFocus
                          />
                          <p
                            className="text-red-500 hover:bg-red-100 bg-white z-[00] border-[1.5px] w-[123px] flex justify-center  text-center mt-[10px] rounded-[5px]  font-Montserrat  cursor-pointer mx-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteModal("typeData", item?._id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>{item?.typeName}</p>
                    )}
                  </div>
                ))
              ) : (
                <p> No BedTypes Available</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[100%] flex flex-col gap-[15px]">
          <div className="flex font-[600] text-[20px] font-Montserrat">
            <p>Amenities</p>
          </div>
          <div className="flex gap-[20px]">
            <div className="flex gap-[15px] h-[20px] flex-wrap">
              {!isAmenityInputVisible ? (
                <div className="flex">
                  <div
                    onClick={() => setAmenityInputVisible(true)}
                    className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] w-[140px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                  >
                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                  </div>
                </div>
              ) : (
                <div className="flex border-[#000] border-dashed border-[1px] rounded-[8px] overflow-hidden">
                  <input
                    ref={inputRef}
                    type="text"
                    name="title"
                    value={amenityName}
                    onChange={(e) => setAmenityName(e.target.value)}
                    onKeyDown={handleAddAmenity}
                    placeholder="Add an amenity"
                    className="px-[10px] py-[5px] md150:w-[120px] md11:w-[120px]"
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="flex-wrap flex relative gap-[10px]">
              {amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <div
                    key={amenity.id}
                    onClick={() => handleAmenityClick(index)}
                    onDoubleClick={() =>
                      handleEditAmenity(index, amenity.title)
                    }
                    className={`border-[1px] border-[#000] overflow-hidden font-[600] md150:text-[18px] md11:text-[15px] md150:w-[170px] md11:w-[150px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer ${
                      selectedAmenityIndex === index
                        ? " bs-mix-green text-white"
                        : ""
                    }`}
                  >
                    {editingAmenityIndex === index ? (
                      <>

                      <div className="  flex w-[100%] h-[100%]">

          
                        <input
                          type="text"
                          ref={inputRef}
                          value={editAmenityName} 
                          onChange={(e) => setEditAmenityName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleSaveEditAmenity(amenity._id, index)
                          }
                          className=" text-black  w-[100%] h-[100%] px-[10px]  rounded"
                          autoFocus
                        />

                        <p
                          ref={popupRef}
                          className="text-red-500 hover:bg-red-100 bg-white  absolute top-[20px] z-[00] border-[1.5px] w-[123px] flex justify-center  text-center mt-[10px] rounded-[5px]  font-Montserrat  cursor-pointer mx-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDeleteModal("amenity", amenity?._id);
                          }}
                        >
                          Delete
                        </p>
                        </div>
                      </>
                    ) : (
                      <span>{amenity.title}</span>
                    )}
                  </div>
                ))
              ) : (
                <p>No Amenities Available</p>
              )}
            </div>
          </div>

          {selectedAmenityIndex !== null && amenities[selectedAmenityIndex] && (
            <>
              <div className="w-full ">
                <p className="text-[18px] font-Montserrat">SubAminities</p>
                <div className="flex gap-[15px] flex-wrap">
                  {!istypeSubaminiInputVisible? (
                    <div className="flex">
                      <div
                        onClick={() => setTypeSubaminiInputVisible(true)}
                        className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] w-[120px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                      >
                        <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                      </div>
                    </div>
                  ) : (
                    <div className="flex border-[#000] border-dashed border-[1px] rounded-[8px] overflow-hidden">
                      <input
                        type="text"
                        value={subAmenityName}
                        onChange={(e) => setSubAmenityName(e.target.value)}
                        onKeyDown={handleAddSubAmenity}
                        placeholder="Add a subcategory"
                        className="px-[10px] py-[5px] md150:w-[120px] md11:w-[120px]"
                        autoFocus
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap  relative gap-[10px]">
                    {Array.isArray(subAmenity) &&
                      subAmenity.map((subcategory, index) => (
                        <div
                          key={subcategory.id}
                          onClick={() =>
                            handleSubCategoryClick(index, subcategory?._id)
                          }
                          onDoubleClick={() =>
                            handleEditSubAmenity(index, subcategory.name)
                          }
                          className={`border-[1px]  border-[#000] font-[600] md150:text-[18px] md11:text-[15px] md150:w-[170px] md11:w-[150px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer ${
                            selectedSubcategoryIndex === index
                              ? " bs-mix-green text-white"
                              : ""
                          }`}
                        >
                          {/* <p>{subcategory.name}</p> */}

                          {editingSubAmenityIndex === index ? (
                            <>
                              <input
                                type="text"
                                value={editSubAmenityName}
                                onChange={(e) =>
                                  setEditSubAmenityName(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSaveEditSubAmenity(
                                      subcategory._id,
                                      index
                                    );
                                  }
                                }}
                                className=" text-black  w-[100%] h-[100%] px-[10px] outline-none rounded-[7px]"
                                autoFocus
                              />
                              <p className="text-red-500 hover:bg-red-100 bg-white absolute bottom-[-20px] z-[100] border-[1.5px] w-[123px] flex justify-center  text-center mt-[10px] rounded-[5px]  font-Montserrat  cursor-pointer mx-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDeleteModal("subAmenity", subcategory?._id);
                                }}
                              >
                                Delete
                              </p>
                            </>
                          ) : (
                            <p>{subcategory.name}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {selectedSubcategoryIndex !== null && (
                <div className="flex-col gap-[10px] mt-[10px] flex w-[100%]">
                  <div className="flex justify-between gap-[10px]">
                    <div className="rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] flex w-[100%]">
                      <input
                        className="w-[100%] h-[100%] outline-none"
                        type="text"
                        name="name"
                        value={bottomInputValue}
                        onChange={handleBottomInputChange}
                        placeholder="option"
                      />
                    </div>
                    <div
                      className="w-[120px] h-[45px] rounded-[8px] font-[500] cursor-pointer flex justify-center items-center font-Montserrat  bs-mix-green text-[#fff]"
                      onClick={handleAddAmenitiesOption}
                    >
                      Submit
                    </div>
                  </div>
                  {Array.isArray(options) &&
                    options?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[10px]">
                        <div className="flex justify-between font-Montserrat font-[400] items-center rounded-[8px] border-[#323232] border-[1px] px-[10px] h-[45px] w-[100%]">
                          <p>{item?.name}</p>
                          <div className="flex gap-[10px]">
                            <img
                              className="w-[20px] cursor-pointer"
                              src={Editimg}
                              alt="Edit"
                              onClick={() =>
                                handleEditaminiClick(
                                  index,
                                  amenities[selectedAmenityIndex]
                                    ?.subcategories[selectedSubcategoryIndex]
                                    ?.data[index]
                                )
                              }
                            />
                            <i
                              className="text-[18px] mt-[1px] text-[#ff0b0b] cursor-pointer fa-solid fa-trash-can"
                              onClick={handleModalopen}
                            ></i>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Form */}
            <div className="flex-1 space-y-4 p-[10px]">
              <div className="w-[100%] ">
                <label className="font-Roboto text-sm  mb-2 text-[#000]">
                  GST (%)
                </label>
                <div className="relative border-[1px] border-[#000] flex items-center w-[100%] rounded-lg">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    name="gst"
                    value={form?.gst}
                    onChange={(e) => setForm({ ...form, gst: e.target.value })}
                    placeholder="0.0%"
                    className="w-full p-[8px] pr-8 pl-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="breakfast"
                  className="block text-sm  font-[500] font-Roboto text-gray-700 mb-1"
                >
                  Breakfast Charge (Per Person)
                </label>
                <div className="relative border-[1px] border-[#000] rounded-lg">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    id="breakfast"
                    name="breakfast"
                    value={form?.breakfast}
                    onChange={(e) =>
                      setForm({ ...form, breakfast: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-2  rounded-lg focus:ring-[#007e2c] focus:border-[#007e2c] transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lunch"
                  className="block text-sm font-[500] font-Roboto text-gray-700 mb-1"
                >
                  Lunch Charge (Per Person)
                </label>
                <div className="relative border-[1px] border-[#000] rounded-lg">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    id="lunch"
                    name="lunch"
                    value={form?.lunch}
                    onChange={(e) =>
                      setForm({ ...form, lunch: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-2  rounded-lg focus:ring-[#007e2c] focus:border-[#007e2c] transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dinner"
                  className="block text-sm font-[500] font-Roboto text-gray-700 mb-1"
                >
                  Dinner Charge (Per Person)
                </label>
                <div className="relative border-[1px] border-[#000] rounded-lg">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    id="dinner"
                    value={form?.dinner}
                    onChange={(e) =>
                      setForm({ ...form, dinner: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-2 rounded-lg transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button
                onClick={handleAddExtraCharges}
                className="w-full  bs-mix-green hover: bs-mix-green text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Charges
              </button>
            </div>

            {/* Display */}
            <div className="flex-1  rounded-lg ">
              {Array.isArray(charges) ? (
                charges.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 space-y-[11px] w-[90%] flex flex-col gap-[5px] p-[10px] mx-auto"
                  >
                    <div className="w-[100%] ">
                      <label className="font-Roboto text-sm  mb-2 text-[#000]">
                        GST (%)
                      </label>
                      <div className="relative border-[1px] border-[#007e2c] flex items-center w-[100%] rounded-lg">
                        <p className="py-[8px] px-[13px]">{item?.gst}</p>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="breakfast"
                        className="block text-sm  font-[500] font-Roboto text-gray-700 mb-1"
                      >
                        Breakfast Charge (Per Person)
                      </label>
                      <div className="relative border-[1px] border-[#007e2c] rounded-lg">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <p className="py-[8px] pl-[30px]">{item?.breakfast}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="lunch"
                        className="block text-sm font-[500] font-Roboto text-gray-700 mb-1"
                      >
                        Lunch Charge (Per Person)
                      </label>
                      <div className="relative border-[1px] border-[#007e2c] rounded-lg">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <p className="py-[8px] pl-[30px]">{item?.lunch}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="dinner"
                        className="block text-sm font-[500] font-Roboto text-gray-700 mb-1"
                      >
                        Dinner Charge (Per Person)
                      </label>
                      <div className="relative border-[1px] border-[#007e2c] rounded-lg">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <p className="py-[8px] pl-[30px]">{item?.dinner}</p>
                      </div>
                    </div>
                    <div className=" flex w-[100%] gap-[20px]  justify-between">
                      <button className="w-full  bs-mix-green font-[600] font-Roboto  ̰ hover: bs-mix-green text-white px-4 py-2 rounded-lg transition-colors">
                        Edit
                      </button>
                      <div
                        className=" w-[50px]  cursor-pointer  active:scale-95 transition-transform duration-150 rounded-md bg-[#ff0b0b]  flex  justify-center items-center"
                        onClick={handleDelete}
                      >
                        <i className="text-[16px] cursor-pointer mt-[2px] text-[#ffffff] fa-solid fa-trash-can"></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p> Any type of charges is not available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <NextUIModal isOpen={selectedmodalopen} onOpenChange={handleModalclose}>
        <ModalContent className="md:max-w-[350px] max-w-[333px] relative  rounded-2xl z-[700] flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
          {(handleModalclose) => (
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
                        onClick={handleModalclose}
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
  );
}
