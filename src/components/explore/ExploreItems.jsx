import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from '../UI/Countdown';
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setvisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async (filterSelected) => {
      setIsLoading(true)
      try {
        const filterOption = filterSelected ? `?filter=${filterSelected}` : "";
        const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterOption}`)
        setExploreItems(res.data)
      }
      catch (error) {
        console.log("Error.", error)
        
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData(filter);
    
  }, [filter])

  const changeFilter = (event) => {
    setFilter(event.target.value)
    setvisibleItems(8)
  }

  const loadMoreItems = () => {
    setvisibleItems((prevCount) => prevCount + 4)
  }

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
      {exploreItems.slice(0, visibleItems).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                { isLoading ? (
                  <Skeleton width="100%" height="50px" borderRadius="50px" />
                ) : (
                  <img className="lazy" src={item.authorImage} alt="" />
                )}
                <i className="fa fa-check"></i>
              </Link>
            </div>
                { isLoading ? (
                 null
                ) : (
                  <> {item.expiryDate ? <Countdown expiryDate={item.expiryDate} /> : null} </>
                )}
            

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
              { isLoading ? (
                <Skeleton width="100%" height="220px" borderRadius="2px" />
              ) : (
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              )}
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
              { isLoading ? (
                <Skeleton width="80%" height="20px" borderRadius="2px" />
              ) : (
                <h4>{item.title}</h4>
              )}
                
              </Link>
              { isLoading ? (
                <Skeleton width="50%" height="20px" borderRadius="2px" />
              ) : (
                <div className="nft__item_price">{item.price} ETH</div>
              )}
              
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                { isLoading ? (
                  null
                ) : (
                  <span>{item.likes}</span>
                )}
                
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        { visibleItems < exploreItems.length ? (
          <Link onClick={loadMoreItems} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
        ) : (
          null
        )}
        
      </div>
    </>
  );
};

export default ExploreItems;
