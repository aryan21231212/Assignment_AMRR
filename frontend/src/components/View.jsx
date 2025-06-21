import React, { useEffect, useState } from 'react'
import Card from './Card'

const View = () => {
  const [data, setdata] = useState([])
  const [detailData, setdetailData] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)


  const handleEnquire = async (data)=>{
    let response = await fetch('http://localhost:3000/enquire',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    }
    )
    const result = await response.json();
    alert(result.message);
  }

  const detail = (idx) => {
    console.log(idx)
    const selected = data[idx];
    setdetailData({
      itemName: selected.itemName,
      itemType: selected.itemType,
      Item_Description: selected.Item_Description,
      coverImage: selected.cover_Image,
      additionalImages: selected.additionalImages,
    });
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (detailData && detailData.additionalImages) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % detailData.additionalImages.length
      );
    }
  };

  const prevImage = () => {
    if (detailData && detailData.additionalImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? detailData.additionalImages.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      let response = await fetch('http://localhost:3000/view');
      let data = await response.json()
      setdata(data)
    }
    dataFetch()
  }, [])

  return (
    <>
      {
        detailData ? <div className="detail-view">
          <button className="back-btn" onClick={() => setdetailData(null)}>← Back</button>
          <h1>{detailData.itemName}</h1>

          {detailData.additionalImages && detailData.additionalImages.length > 0 ? (
            <div className="image-slider">
              <img
                src={detailData.additionalImages[currentImageIndex]}
                alt={`${detailData.itemName} ${currentImageIndex + 1}`}
                className="slider-image"
              />
              {detailData.additionalImages.length > 1 && (
                <>
                  <button className="slider-nav slider-prev" onClick={prevImage}>‹</button>
                  <button className="slider-nav slider-next" onClick={nextImage}>›</button>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {detailData.additionalImages.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <img src={detailData.coverImage} alt={detailData.itemName} className="detail-image" />
          )}

          {detailData.additionalImages && detailData.additionalImages.length > 1 && (
            <div className="slider-indicators">
              {detailData.additionalImages.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}

          <p><strong>Type:</strong> {detailData.itemType}</p>
          <p><strong>Description:</strong> {detailData.Item_Description}</p>
          <button onClick={()=>{handleEnquire(detailData)}} className="btn btn-success">Enquire</button>
        </div> :
          <div className="card-container">
            {data.map((ele, idx) => (
              <div onClick={() => detail(idx)} key={idx}>
                <Card image={ele.cover_Image} itemName={ele.itemName} />
              </div>
            ))}
          </div>
      }
    </>
  )
}
export default View