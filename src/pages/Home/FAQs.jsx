// FAQ.jsx
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "1. How does the AI chef work?",
    answer:
      "Our AI analyzes the ingredients you have, your dietary preferences, and your taste to create personalized recipes in seconds. Whether you're a home cook or culinary enthusiast, our platform helps you create unique recipes, design complete menus, and discover new dishes through advanced AI technology.",
  },
  {
    question: "2. Do I need to sign up to use it?",
    answer:
      "Yes, creating an account allows you to save your favorite recipes, customize your preferences, and access your recipe history across devices.",
  },
  {
    question: "3. Can I add my own ingredients manually?",
    answer:
      "Absolutely! You can manually add ingredients you have at home to get recipe suggestions based on what you actually have in your kitchen.",
  },
  {
    question: "4. What’s the difference between Monthly and Yearly plans?",
    answer:
      "The Monthly plan is billed every month, while the Yearly plan is billed once per year and usually offers a discount compared to the monthly pricing.",
  },
  {
    question: "5. Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription anytime. You will still have access to the premium features until the end of your billing cycle.",
  },
  {
    question: "6. Are the recipes healthy?",
    answer:
      "Yes, our AI takes into account nutritional balance and dietary preferences to provide healthy and balanced recipes.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="w-full flex flex-col gap-2 items-center justify-center">
      <h1 className="text-[#2E2E2E] font-semibold text-3xl mb-2 mt-8 text-center">
        FAQs
      </h1>
      <div className="w-full space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full border border-[#E4572E] bg-[#FFFFFF] rounded-lg cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center p-4 w-full">
              <h2 className="font-medium text-xl">{faq.question}</h2>
              {openIndex === index ? (
                <ChevronUpIcon className="w-5 h-5 text-[#2E2E2E]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#2E2E2E]" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-[#2E2E2E] border-t border-[#E4572E] p-4 w-full font-normal text-base">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
