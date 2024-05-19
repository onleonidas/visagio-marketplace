import { FooterCopyright, FooterIcon } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export function FooterComponent() {
  return (
    <div className="bg-zinc-900 mt-10">
      <div className="w-full">
        <div className="grid w-full h-[20vh] grid-cols-2 gap-8 py-8 md:grid-cols-4">
          
        </div>
        <div className="w-full bg-zinc-800 px-4 py-10">
          <FooterCopyright href="#" by="Vstore by Michel Leonidas" year={2024} />
          <div className="mt-4 flex space-x-6 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />

          </div>
        </div>
      </div>
    </div>
  );
}
