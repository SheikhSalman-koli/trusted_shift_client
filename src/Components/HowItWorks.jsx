import { FaShippingFast, FaMoneyBillWave, FaWarehouse, FaBriefcase } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast className="text-4xl text-primary" />,
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: <FaWarehouse className="text-4xl text-primary" />,
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: <FaBriefcase className="text-4xl text-primary" />,
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md p-6 text-center hover:shadow-xl transition-all"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
