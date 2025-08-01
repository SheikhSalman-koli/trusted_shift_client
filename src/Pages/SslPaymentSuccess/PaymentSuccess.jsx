import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const handleGoToHistory = () => {
    navigate('/dashboard/history');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 px-4 text-center">
     <FaCheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-700 max-w-md mb-6">
        Thank you for your payment. Your transaction has been completed successfully.
        You can view your payment history anytime from your dashboard.
      </p>
      <button
        onClick={handleGoToHistory}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
      >
        Go to payment History
      </button>
    </div>
  );
}
