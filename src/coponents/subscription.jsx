import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const handlePaymentRedirect = (planName) => {
    navigate('/payment', { state: { plan: planName } });
  };

  const plans = [
    {
      name: 'Basic Plan',
      price: '$9.99',
      period: 'per month',
      features: [
        '720p Video Quality',
        'Watch on 1 device',
        'Access to basic content library',
        '10 hours of cloud storage',
        'Email support'
      ],
      popular: false,
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Premium Plan',
      price: '$14.99',
      period: 'per month',
      features: [
        '1080p Video Quality',
        'Watch on 2 devices',
        'Access to premium content library',
        '50 hours of cloud storage',
        'Priority email support',
        'Ad-free experience'
      ],
      popular: true,
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Ultimate Plan',
      price: '$24.99',
      period: 'per month',
      features: [
        '4K Ultra HD Video Quality',
        'Watch on 4 devices',
        'Access to entire content library',
        'Unlimited cloud storage',
        '24/7 priority support',
        'Ad-free experience',
        'Offline downloads'
      ],
      popular: false,
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Select the subscription that best fits your needs and start enjoying our services today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-purple-900 to-purple-800 border-2 border-purple-400 transform scale-105 md:scale-110' 
                  : 'bg-gradient-to-b from-gray-800 to-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="bg-purple-500 text-white text-center py-2 font-semibold">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.period}</span>
                </div>
                
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to='/PaymentForm'
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium ${plan.buttonColor} transition-colors duration-200 shadow-lg transform hover:-translate-y-0.5`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;