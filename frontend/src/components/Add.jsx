import React, { useState } from 'react';

const Add = () => {
  const [itemType, setitemType] = useState('');
  const [customItemType, setCustomItemType] = useState('');
  const [itemName, setitemName] = useState('');
  const [Item_Description, setItem_Description] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemType', itemType === 'Other' ? customItemType : itemType);
    formData.append('Item_Description', Item_Description);

    if (coverImage) {
      formData.append('cover_Image', coverImage);
    }

    for (let i = 0; i < additionalImages.length; i++) {

      formData.append('additionalImages', additionalImages[i]);
    }

    try {
      const response = await fetch('https://assignment-amrr.onrender.com/add', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Response:', result);
      alert('Item added successfully!');

      setitemName('');
      setitemType('');
      setCustomItemType('');
      setItem_Description('');
      setCoverImage(null);
      setAdditionalImages([]);
      document.getElementById("cover_Image").value = null;
      document.getElementById("additional_Images").value = null;

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong.');
    }


  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header text-black">
              <h4 className="mb-0">Add New Item</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={itemName}
                    onChange={(e) => setitemName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Item_type" className="form-label fw-semibold">Item Type</label>
                  <select
                    onChange={(e) => setitemType(e.target.value)}
                    value={itemType}
                    className="form-select"
                    name="Item_type"
                    id="Item_type"
                    required
                  >
                    <option value="">Select an item type</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sports Gear">Sports Gear</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {itemType === 'Other' && (
                  <div className="mb-3">
                    <label htmlFor="customItemType" className="form-label fw-semibold">Custom Item Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customItemType"
                      value={customItemType}
                      onChange={(e) => setCustomItemType(e.target.value)}
                      placeholder="e.g. Watch, Hat"
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="Item_Description" className="form-label fw-semibold">Item Description</label>
                  <textarea
                    className="form-control"
                    id="Item_Description"
                    rows="4"
                    value={Item_Description}
                    onChange={(e) => setItem_Description(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="cover_Image" className="form-label fw-semibold">Cover Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="cover_Image"
                    name="cover_Image"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="additional_Images" className="form-label fw-semibold">Additional Images</label>
                  <input
                    type="file"
                    className="form-control"
                    id="additional_Images"
                    name="additionalImages"
                    accept="image/*"
                    multiple
                    onChange={(e) => setAdditionalImages([...e.target.files])}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
