import { Carousel, Spinner } from "flowbite-react";
import { ProductPromo } from "./ProductPromo";
import { useEffect, useState } from "react";
import { apiUrls } from "../config/apiUrls";

interface BannerProperties {
    id: number;
    link: string;
}

export const Header = () => {
    const [banners, setBanners] = useState<BannerProperties[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(apiUrls.banners);
                const data = await response.json();
                setBanners(data);
            } catch (error) {
                setError('Error fetching banners');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <>
            {loading &&
                <div className="flex justify-center items-center h-full w-full">
                    <Spinner size="lg" color="gray" />
                </div>
            }
            <div className=' h-[500px] mb-5 container mx-auto rounded-lg grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>

                {error && <p>{error}</p>}
                {!loading && !error &&
                    <>
                        <div className='xl:ml-10 col-span-2 below-sm:mx-4 rounded-lg overflow-hidden'>
                            <div className="h-full">
                                <Carousel className=''>
                                    {banners.map((banner) => {
                                        return (
                                            <img key={banner.id} className="w-full h-full object-cover" src={banner.link} alt="..." />
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div>
                        <div className='bg-stone-200 xl:mr-10 hidden lg:flex lg:flex-col lg:col-span-1 rounded-lg'>
                            <ProductPromo
                                id={11}
                                imageUrl={"https://gmedia.playstation.com/is/image/SIEPDC/PSVR2-thumbnail-01-en-22feb22?$facebook$"}
                                name={"PSVR2"}
                                description={"Óculos de realidade virtual"}
                                category={"Eletrônicos"}
                                price={1.500}
                                stock={10}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

