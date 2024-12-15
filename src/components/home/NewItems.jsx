import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const NewItems = ({ width, height, borderRadius }) => {

  const [newItems, setNewItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setNewItems(res.data)
        // setIsLoading(false)
      }
      catch (error) {
        console.log("Error.", error)
        // setIsLoading(false)
      }
    }

    // const timer = setTimeout(() => {
    //   setIsLoading(true)
    // }, 1000)
    fetchData();

    // return () => clearTimeout(timer)
  }, []);




  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      1000: {
        items: 4,
        nav: true,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            <OwlCarousel className="owl-theme" {...options}>
              {newItems.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        { item && item.authorImage ? (
                          <img className="lazy" src={item.authorImage} alt="" />
                        ) : (
                          <Skeleton width={width} height={'50px'} borderRadius={'50%'} />
                        )}
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">5h 30m 32s</div>

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
                      { item  && item.nftImage ? (
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      ) : (
                        <Skeleton width={width} height={'150px'} borderRadius={borderRadius} />
                      )}
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                      { item && item.title ? (
                        <h4>{item.title}</h4>
                      ) : (
                        <Skeleton width={width} height={height} borderRadius={borderRadius} />
                      )}
                      </Link>
                      { item && item.price ? (
                        <div className="nft__item_price">{item.price}</div>
                      ) : (
                        <Skeleton width={width} height={height} borderRadius={borderRadius} />
                      )}
                      { item && item.likes ? (
                        <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                      ) : (
                        <Skeleton width={width} height={height} borderRadius={borderRadius} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
