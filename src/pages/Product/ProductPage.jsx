import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../../Components/header/Header';
import wdwssd from '../../../public/img/backhotel.avif'
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction, addNonBarcodeProductAction, addStockAction, deleteCategoryAction, deleteStockAction, getAllNonBarcodeProductAction, getAllStockAction, getCategroyAction, updateCategoryAction, updateNonBarcodeProductAction, updateStockAction } from '../../redux/action/landingManagement';
import { ApiDelete, ApiGet, ApiPost, ApiPut } from '../../helper/axios';
import cloudinaryUpload from '../../helper/cloudinaryUpload';
import {
    Modal as NextUIModal,
    ModalBody, Modal,
    ModalContent,
} from "@nextui-org/react";
import uploadToHPanel from '../../helper/uploadToHpanel';

export default function ProductPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [isDelOpen, setIsDelOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [isCategoryInputVisible, setCategoryInputVisible] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const inputRef = useRef(null);
    const editRef = useRef(null);
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        image: '',
        categoryId: '',
    });

    const category = useSelector((state) => state.landing?.getAllCategory);
    const products = useSelector((state) => state.landing?.getProduct);

    useEffect(() => {
        setCategories(category || []);
    }, [category]);

    useEffect(() => {
        dispatch(getCategroyAction());
    }, [dispatch]);

    // const handleCategoryClick = (id) => {
    //     setSelectedCategoryIndex(id);
    //     setProductData((prev) => ({ ...prev, categoryId: id }));
    //     dispatch(getAllStockAction(id));
    // };
    const handleCategoryClick = (id) => {
        setProductData((prev) => ({ ...prev, categoryId: id }));
        dispatch(getAllStockAction(id));
    };



    useEffect(() => {
        if (categories.length > 0 && !productData.categoryId) {
            const firstCategory = categories[0];
            setProductData((prev) => ({ ...prev, categoryId: firstCategory._id }));
            setSelectedCategoryId(firstCategory._id);
            dispatch(getAllStockAction(firstCategory._id));
        }
    }, [categories]);


    useEffect(() => {
        if (categories.length > 0 && !productData.categoryId) {
            const firstCategory = categories[0];
            setProductData((prev) => ({ ...prev, categoryId: firstCategory._id }));
            setSelectedCategoryId(firstCategory._id);
            dispatch(getAllStockAction(firstCategory._id));
        }
    }, [categories]);



    // const handleDoubleClickCategory = (item, index) => {
    //     setEditingCategory(index);
    //     setEditCategoryName(item.name); // previously was item.categoryName – ensure consistency
    //     setEditingCategoryId(item._id);
    //     setProductData(prev => ({
    //         ...prev,
    //         categoryId: item._id, // Ensure it's marked as selected
    //     }));
    // };
    const handleDoubleClickCategory = (item, index) => {
        setEditingCategory(index);
        setEditCategoryName(item.name);
        setEditingCategoryId(item._id);

        // 👇 ensure selected
        setSelectedCategoryId(item._id);
        setProductData(prev => ({
            ...prev,
            categoryId: item._id,
        }));
    };


    // useEffect(() => {
    //     if (selectedProduct) {
    //         setProductData({
    //             name: selectedProduct.name || '',
    //             description: selectedProduct.description || '',
    //             image: selectedProduct.image || '',
    //             categoryId:
    //                 typeof selectedProduct.categoryId === 'object'
    //                     ? selectedProduct.categoryId?._id
    //                     : selectedProduct.categoryId || '',
    //         });
    //     } else {
    //         setProductData({
    //             name: '',
    //             description: '',
    //             image: '',
    //             categoryId: selectedCategoryId,
    //         });
    //     }
    // }, [selectedProduct]);


    // useEffect(() => {
    //     if (selectedProduct) {
    //         const categoryId =
    //             typeof selectedProduct.categoryId === 'object'
    //                 ? selectedProduct.categoryId?._id
    //                 : selectedProduct.categoryId || '';

    //         setProductData({
    //             name: selectedProduct.name || '',
    //             description: selectedProduct.description || '',
    //             image: selectedProduct.image || '',
    //             categoryId,
    //         });

    //         // ✅ Ensure UI + stock sync
    //         handleCategoryClick(categoryId);
    //     } else {
    //         setProductData({
    //             name: '',
    //             description: '',
    //             image: '',
    //             categoryId: '',
    //         });
    //     }
    // }, [selectedProduct]);



    const [productToDelete, setProductToDelete] = useState(null);

    const deleteopen = (id) => {
        setIsDelOpen(true);
        setProductToDelete(id);
    };

    const handleProductImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const url = await uploadToHPanel(file);
            setProductData((prev) => ({ ...prev, image: url }));
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Failed to upload image");
        }
    };


    const handleKeyPressCategory = async (e, action = "add", id = null) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const inputValue = action === "edit" ? editCategoryName.trim() : categoryName.trim();

            if (!inputValue) {
                alert("Category name cannot be empty.");
                return
            }

            const payload = { name: inputValue };

            console.log("payload", payload);

            if (action === "add") {
                dispatch(addCategoryAction(payload));
                setCategoryName("");
                setCategoryInputVisible(false);
            } else if (action === "edit" && id) {
                dispatch(updateCategoryAction(id, payload));
                setEditingCategory(null);
                setEditCategoryName("");
            }

            dispatch(getCategroyAction());
        }
    };

    const handleOpenDeleteModalCategory = (id) => {
        const filtered = categories.filter((cat) => cat._id !== id);
        setCategories(filtered);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setCategoryInputVisible(false);
            }

            if (editRef.current && !editRef.current.contains(event.target)) {
                setEditingCategory(null);
                setEditCategoryName("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeDeleteModal = () => {
        setIsDelOpen(false)
    }

    const handleDeleteCategory = () => {
        if (categoryToDelete) {
            dispatch(deleteCategoryAction(categoryToDelete))
                .then(() => {
                    dispatch(getCategroyAction());
                    setIsDelOpen(false);
                    setCategoryToDelete(null);
                })
                .catch((err) => {
                    console.error("Failed to delete:", err);
                    alert("Failed to delete category.");
                });
        }
    };


    const handleDeleteProduct = () => {
        if (productToDelete) {
            dispatch(deleteStockAction(productToDelete)).then(() => {
                alert("Product deleted successfully!");
                setIsDelOpen(false);
                setProductToDelete(null);
                dispatch(getAllStockAction(productData.categoryId));
            }).catch((err) => {
                alert("Failed to delete product.");
                console.error(err);
            });
        }
    };

    const handleEditProduct = (item) => {
        let categoryId = '';
        if (item.categoryId) {
            categoryId =
                typeof item.categoryId === 'object' ? item.categoryId._id || '' : item.categoryId;
        }

        setSelectedProduct(item);
        setProductData({
            name: item.name || '',
            description: item.description || '',
            image: item.image || '',
            categoryId,
        });

        setInitialCategoryId(categoryId);
        setTimeout(() => {
            if (categoryId) {
                dispatch(getAllStockAction(categoryId));
            }
        }, 0);
    };




    const handleSubmit = () => {
        const trimmedCategoryId = productData.categoryId?.trim();

        if (!productData.name || !productData.description || !productData.image || !trimmedCategoryId) {
            alert("Please fill all fields, including a valid category.");
            return;
        }

        const payload = {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            categoryId: trimmedCategoryId,
        };

        if (selectedProduct?._id) {
            dispatch(updateStockAction(selectedProduct._id, {
                ...productData,
                categoryId: String(productData.categoryId), // force to string
            }));
            alert("Product updated!");
        } else {
            dispatch(addStockAction(payload));
            alert("Product added!");
        }

        setProductData((prev) => ({
            name: '',
            description: '',
            image: '',
            categoryId: prev.categoryId, // preserve selected category
        }));

        dispatch(getAllStockAction(trimmedCategoryId));
        setSelectedProduct(null);
    };



    return (
        <>
            <div className="w-[100%] md11:w-[100%] md150:w-[100%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  px-[30px] py-[30px] ">
                <div className="flex w-[100%] md11:h-[100vh] overflow-hidden md150:h-[90vh] relative rounded-[19px] border-[1px] border-[#007e2c]">
                    <Header />
                    <div className="flex flex-col w-[100%] mt-[20px] gap-[30px]">
                        <div className="flex p gap-[10px] border-b-[1px] border-[#007e2c] pl-[30px] pb-[10px] md11:top-[4.1%] md150:top-[5%] items-center md11:text-[18px] md150:text-[20px] font-[600]">
                            <i className="fa-solid fa-angle-up fa-rotate-270"></i>

                            <div className="font-Potua flex items-center gap-[10px] cursor-pointer">
                                <p>PRODUCT</p>
                                <p>MANAGEMENT</p>
                            </div>
                        </div>

                        <div className="pl-[20px] font-Poppins flex md11:w-[98%] md150:w-[97%] md11:gap-[15px] md150:gap-[20px]">
                            <div className="py-[10px] px-[20px] md150:h-[70vh] md11:h-[73vh] overflow-y-auto h-[67vh] bg-white w-[100%] rounded-[19px] relative border-[1px] my-justify-center items-center border-[#000000]">

                                <div className="flex w-[100%] flex-col mt-[10px] gap-[20px] ">
                                    <p className="font-[500] text-[20px] font-Montserrat">Category</p>

                                </div>
                                <div className=' flex gap-[20px] flex-col'>


                                    <div className="w-[100%] flex flex-col gap-[15px]">
                                        <div className="flex gap-[20px]">
                                            <div className="flex gap-[15px] items-center flex-wrap">
                                                {!isCategoryInputVisible ? (
                                                    <div className="flex">
                                                        <div
                                                            onClick={() => setCategoryInputVisible(true)}
                                                            className="border-[1px] border-dashed border-[#007e2c] md150:text-[18px] md11:text-[15px] w-[140px] md11:w-[120px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer"
                                                        >
                                                            <i className="text-[20px] font-[800] text-[#007e2c] fa-solid fa-plus"></i>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div ref={inputRef} className="flex border-[#007e2c] border-dashed border-[1px] rounded-[8px] overflow-hidden">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={categoryName}
                                                            onChange={(e) => setCategoryName(e.target.value)}
                                                            onKeyDown={(e) => handleKeyPressCategory(e)}
                                                            placeholder="Category Name"
                                                            className="px-[10px] outline-none text-[14px] font-Poppins py-[5px] md150:w-[120px] md11:w-[120px]"
                                                            autoFocus
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-wrap flex relative gap-[10px]">
                                                {Array.isArray(categories) && categories.length > 0 ? (
                                                    categories.map((data, index) => (
                                                        <div
                                                            key={data?._id}
                                                            className={`border-[1px]  ${data._id === productData.categoryId

                                                                ? 'bg-[#007e2c] text-white border-[#007e2c]'
                                                                : 'border-[#ccc] text-black bg-white'
                                                                } font-[500] md150:text-[18px] md11:text-[15px] w-fit px-[15px] font-Poppins md11:w-[100px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer`}
                                                            onClick={() => {
                                                                handleCategoryClick(data._id);
                                                            }}
                                                            onDoubleClick={() => handleDoubleClickCategory(data, index)}
                                                        >

                                                            {editingCategory === index ? (
                                                                <div ref={editRef} className="flex flex-col justify-center">
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={editCategoryName}
                                                                        onChange={(e) => setEditCategoryName(e.target.value)}
                                                                        onKeyDown={(e) => handleKeyPressCategory(e, "edit", editingCategoryId)}
                                                                        className="text-center w-[100px] mt-[39px] bg-transparent border-none outline-none"
                                                                        autoFocus
                                                                    />
                                                                    <p
                                                                        className="text-red-500 hover:bg-red-100 bg-white border-[1.5px] w-[123px] flex justify-center text-center mt-[10px] rounded-[5px] font-Montserrat cursor-pointer mx-auto z-[10]"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setCategoryToDelete(data?._id);
                                                                            setProductToDelete(null);
                                                                            setIsDelOpen(true);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p>{data.name}</p>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No Categories Available</p>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    <div className=' flex w-[100%]  flex-wrap gap-[15px]'>
                                        <div className='flex flex-col p-[10px] gap-[12px] border-[1.5px] border-[#007e2c] rounded-md w-[250px] h-fit'>
                                            <label className='flex w-full h-[200px] border-[#007e2c] border-[2px] rounded-md border-dashed justify-center items-center cursor-pointer overflow-hidden'>
                                                {productData.image ? (
                                                    <img src={productData.image} alt="Product" className='w-full h-full object-cover' />
                                                ) : (
                                                    <i className="fa-regular fa-plus text-[#007e2c] text-[40px]" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleProductImageUpload}
                                                />
                                            </label>

                                            <div className='flex flex-col gap-[12px]'>
                                                <div className="w-[100%] flex border-[#007e2c] overflow-hidden px-[10px] border-[1.8px] h-[40px] rounded-[8px]">
                                                    <input
                                                        type="text "
                                                        placeholder=" Product "
                                                        className=" w-[100%] h-[100%]"
                                                        value={productData.name}
                                                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="w-[100%] flex border-[#007e2c] overflow-hidden px-[10px] border-[1.8px] h-[80px] rounded-[8px]">
                                                    <textarea
                                                        type="text "
                                                        placeholder=" Desciption"
                                                        className=" w-[100%] outline-none h-[100%]"
                                                        value={productData.description}
                                                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="w-[100%] h-[40px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]  font-[600]  bs-mix-green active:scale-95 transition-transform duration-150"
                                                onClick={handleSubmit}
                                            >
                                                <p>Submit</p>
                                            </div>

                                        </div>
                                        {Array.isArray(products) && products.map((item, index) => (
                                            <div key={index} className='flex flex-col p-[10px] gap-[12px] border-[1.5px] border-[#007e2c] rounded-md w-[250px] h-fit'>
                                                <div className='flex  w-[100%] rounded-md border-dashed justify-center items-center  h-[200px]'>

                                                    <img className=' w-[100%] h-[100%]' src={item?.image} />
                                                </div>
                                                <div className='flex flex-col gap-[12px]'>
                                                    <div className="w-[100%] items-center flex border-[#007e2c] overflow-hidden px-[10px] border-[1.8px] h-[40px] rounded-[8px]">
                                                        <p>
                                                            {item?.name}
                                                        </p>
                                                    </div>
                                                    <div className="w-[100%] flex border-[#007e2c] overflow-y-auto px-[10px] border-[1.8px] h-[80px] rounded-[8px]">
                                                        <p>
                                                            {item?.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-[100%] h-[40px] gap-[10px] rounded-md mx-auto cursor-pointer flex justify-center items-center text-[#fff]   font-[600]   active:scale-95 transition-transform duration-150">
                                                    <button className='  text-[19px] w-[77%] bs-mix-green justify-center items-center rounded-[5px] py-[6px] text-[#ffffff]'
                                                        onClick={() => handleEditProduct(item)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                    <button className='w-[20%]  text-[19px] bg-[#fa0000] justify-center items-center rounded-[5px] py-[6px] text-[#ffffff] ]'
                                                        onClick={() => deleteopen(item._id)}                                                >
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
                                                onClick={() => {
                                                    if (categoryToDelete) {
                                                        handleDeleteCategory();
                                                    } else if (productToDelete) {
                                                        handleDeleteProduct();
                                                    }
                                                }}                                            >
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
    );
}
