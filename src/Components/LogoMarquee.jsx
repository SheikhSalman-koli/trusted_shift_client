import Marquee from "react-fast-marquee";

import amazon_vector from './../assets/brands/amazon_vector.png'
import amazon from './../assets/brands/amazon.png'
import casio from './../assets/brands/casio.png'
import moonstar from './../assets/brands/moonstar.png'
import randstad from './../assets/brands/randstad.png'
import startPeople from './../assets/brands/start-people 1.png'
import start from './../assets/brands/start.png'

const logos = [amazon_vector, amazon, casio, moonstar, randstad, startPeople, start];

export default function LogoMarquee() {
  return (
    <section className="bg-white py-12 lg:mx-16">
      <div className="max-w-7xl mx-auto text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-6 lg:mx-20 flex items-center justify-center">
            <img
              src={logo}
              alt={`Company ${index + 1}`}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
