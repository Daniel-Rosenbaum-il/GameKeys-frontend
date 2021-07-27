import { useEffect, useRef, useState } from "react"

export const About = () => {
    const [imgIdx, setImg] = useState(0)
    const intervalId = useRef()
    const imgUrls = ['https://res.cloudinary.com/dat4toc2t/image/upload/v1627133999/GameKeys/img/about/about-img5_e0mzaj.jpg',
        'https://res.cloudinary.com/dat4toc2t/image/upload/v1627135561/GameKeys/img/about/about-img6_vsbf2h.jpg',]
    useEffect(() => {
        intervalId.current = setInterval(() => {

            setImg(imgIdx => {
                if (imgIdx === imgUrls.length-1) {
                  return  imgIdx = 0
                } else {
                   return imgIdx + 1
                }
            })
        }, 3000)

        return () => {
            clearInterval(intervalId.current)
            console.log('hello');
        }
    }, [])

    return (
        <section className="about ">
            <div className="about-info flex justify-center">
                <div className="info-title">
                    <h1>This is GameKeys</h1>
                </div>
                <div className="info-txt">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed a quae repudiandae iure sit quis, enim alias soluta corrupti voluptatum?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed a quae repudiandae iure sit quis, enim alias soluta corrupti voluptatum?</p>
                </div>
            </div>
            <div className="slogen">
                <img className="slogen-img" src={imgUrls[imgIdx]}>
                </img>
                <div className="test"></div>
                <h2 className="slogen-txt">We are keys, for games!</h2>
            </div>
        </section>
    )
}