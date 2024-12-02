import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
          setCollections(res.data)
          setIsLoading(false);
        }
        catch (error) {
          console.error('error', error)
          setIsLoading(false);
        }
      };

      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 5000)

      fetchData();

      return () => clearTimeout(timer)
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...options}>
          {new Array(4).fill(0).map((_, index) => {
              const nft = collections[index];
            return (
              <div className="item" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={ nft ? nft.nftImage : ''} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={nft ? nft.authorImage : ''} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{nft ? nft.title : ''}</h4>
                  </Link>
                  <span className="skeleton-box">ERC-{nft ? nft.code : ''}</span>
                </div>
              </div>
            </div>
            )
            })}
           </OwlCarousel> 
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
