import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async (filterSelected) => {
      setIsLoading(true);
      try {
        const filterOption = filterSelected ? `?filter=${filterSelected}` : "";
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterOption}`
        )

        setTimeout(() => {
          setExploreItems(res.data);
          setIsLoading(false);
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData(filter);
  }, [filter])

  const changeFilter = (event) => {
    setFilter(event.target.value);
    setVisibleItems(8); 
  };

  const loadMoreItems = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={changeFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

  
      {isLoading
        ? Array(visibleItems)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="100%" height="50px" borderRadius="50px" />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="220px" borderRadius="2px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="80%" height="20px" borderRadius="2px" />
                    <Skeleton width="50%" height="20px" borderRadius="2px" />
                  </div>
                </div>
              </div>
            ))
        : exploreItems.slice(0, visibleItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      <div className="col-md-12 text-center">
        {visibleItems < exploreItems.length && (
          <Link
            onClick={loadMoreItems}
            to="#"
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
