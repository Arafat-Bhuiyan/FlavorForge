// FAQ.jsx
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "1. How does FlavorForge work?",
    answer:
      "Simply input the ingredients you have (protein, vegetables, grains, spices, etc.) and optionally select a cuisine or dietary preference. FlavorForge uses AI to generate step-by-step recipes tailored to your inputs.",
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
    <div
      id="faqs"
      className="w-full flex flex-col gap-2 items-center justify-center mt-16 px-4"
    >
      <h1 className="text-[#2E2E2E] font-semibold text-3xl md:text-4xl mb-2 mt-8 text-center">
        FAQs
      </h1>
      <div className="w-full space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="w-full border border-[#E4572E] bg-[#FFFFFF] rounded-lg"
          >
            <button
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center p-4 w-full text-left"
            >
              <h2 className="font-medium text-base sm:text-lg md:text-xl">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUpIcon className="w-5 h-5 text-[#2E2E2E]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#2E2E2E]" />
              )}
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="text-[#2E2E2E] border-t border-[#E4572E] p-4 w-full font-normal text-base"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
