import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from 'react-icons/rx'
type Props = {}

const Slide = (props: Props) => {
    const slides = [
        {
            url: 'https://pos.nvncdn.com/a36e05-151378/bn/20240103_oopNFzjh.gif'
           
        },
        {
            url: 'https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=254'
        },
        {
            url: 'https://aristino.com/Data/upload/images/BANNER/N%C4%83m%202023/Banner-Aristino-BST-Desktop_1920x900-91023.jpg'
        }
        , {
            url: 'https://aristino.com/Data/ResizeImage/images/banner/n%C4%83m%202023/Bannner-website-Aristino-mobile-4_1920x750x0x0x2.webp'
        },
        {
            url: 'https://theme.hstatic.net/200000313207/1001020472/14/slider_2.jpg?v=40'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(1)
    const prevSlide = () => {
        const isFistSlide = currentIndex === 0;
        const newIndex = isFistSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 7000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);
    const goToSlice = (slideIndex: any) => {
        setCurrentIndex(slideIndex)
    }
  return (
//    <div>
//      <img className='w-full' src="https://aristino.com/Data/ResizeImage/images/banner/n%C4%83m%202023/Bannner-website-Aristino-mobile-4_1920x750x0x0x2.webp" alt="" />
//    </div>
<div className="slider max-w-[1800px] h-[600px] w-full m-auto  group">
                <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full  bg-center bg-cover duration-500"></div>
                <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate--y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20
                 text-white cursor-pointer">
                    <BsChevronCompactLeft size={30} onClick={prevSlide} />
                </div>
                <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate--y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20
                 text-white cursor-pointer">
                    <BsChevronCompactRight size={30} onClick={nextSlide} />
                </div>
                <div className="flex top-4 justify-center py-2">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlice(slideIndex)} className="text-2xl cursor-pointer">
                            <RxDotFilled />
                        </div>

                    ))}
                </div>

            </div>
  )
}

export default Slide