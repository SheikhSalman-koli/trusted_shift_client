import img1 from './../assets/safe-delivery.png'
import img2 from './../assets/live-tracking.png'
import img3 from './../assets/tiny-deliveryman.png'


const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: img2
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: img1
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: img3
  },
];

export default function KeyFeaturesSection() {
  return (
    <section className="p-8 bg-gray-100 lg:mx-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
               className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 bg-white p-6 rounded-xl shadow-sm"
            >
              {/* Image */}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full md:w-56 h-40 object-cover object-center rounded-lg shrink-0"
              />

               {/* Dashed Divider */}
              <div className="hidden md:block border-l border-dashed border-gray-400 h-32"></div>

              {/* Text */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
