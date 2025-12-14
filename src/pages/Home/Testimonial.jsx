import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import profile1 from "../../assets/images/profile1.png";
import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "FlavorForge has transformed my cooking routine! The AI-powered recipes are easy to follow and help me stay on track with my health goals.",
      name: "Sarah Johnson",
      title: "Home Cook, New York, USA",
      rating: 4,
      avatar: profile1,
    },
    {
      id: 2,
      text: "The recipe variety on FlavorForge is amazing! Even asa professional, I found inspiration and new ideas for my dishes.",
      name: "Emily Clarke",
      title: "Professional Chef, London, UK",
      rating: 5,
      avatar: profile3,
    },
    {
      id: 3,
      text: "FlavorForge helps me cook delicious meals in minutes. The step-by-step guides are perfect for someone like me who’s always busy.",
      name: "Rajiv Singh",
      title: "Student, Mumbai, India",
      rating: 5,
      avatar: profile2,
    },
    {
      id: 4,
      text: "Amazing AI-powered cooking assistant! It's like having a personal chef guiding you through every recipe.",
      name: "Maria Gonzalez",
      title: "Food Blogger, Barcelona, Spain",
      rating: 5,
      avatar: profile1,
    },
    {
      id: 5,
      text: "The nutritional tracking feature is fantastic. I can maintain my diet goals while enjoying delicious meals.",
      name: "David Kim",
      title: "Fitness Enthusiast, Seoul, Korea",
      rating: 4,
      avatar: profile2,
    },
    {
      id: 6,
      text: "Never thought cooking could be this easy! FlavorForge makes meal planning effortless and fun.",
      name: "Lisa Chen",
      title: "Working Mom, Toronto, Canada",
      rating: 5,
      avatar: profile3,
    },
  ];

  // ✅ Auto-scroll functionality only
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // scroll every 3 sec

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // ✅ Scroll to card when index changes
  useEffect(() => {
    if (scrollContainerRef.current?.children[currentIndex]) {
      const currentCard = scrollContainerRef.current.children[currentIndex];
      // Calculate the position to scroll to, centering the card in the view
      const scrollPosition =
        currentCard.offsetLeft -
        (scrollContainerRef.current.offsetWidth - currentCard.offsetWidth) / 2;

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-16 lg:mt-0 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#E4572E] font-semibold text-3xl mb-2">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-[#2E2E2E] mb-4">
            Trusted by Thousands of Food Lovers
          </h2>
          <p className="text-[#2E2E2E] text-base md:text-lg">
            Hear from our users who are achieving their health goals and
            mastering new dishes with FlavorForge
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[90vw] sm:w-80 bg-white rounded-xl shadow-lg p-6"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#2E2E2E]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#2E2E2E]">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
