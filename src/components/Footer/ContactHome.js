import React from "react";
import { GrAndroid, GrApple } from "react-icons/gr";
import { useSelector } from "react-redux";
export default function ContactHome() {
  let movieTab = useSelector((state) => state.movieReducer.movieTab);

  const renderMovieLogo = () => {
    return movieTab?.map((item, index) => {
      return (
        <img
          type="button"
          key={index}
          src={item.logo}
          className="sm:h-10 sm:w-10 h-5 w-5 mx-2 logo-partner "
          alt=""
        ></img>
      );
    });
  };
  return (
    <div className="container grid grid-cols-3 text-center py-3">
      <div className="text-left">
        <div className="mb-3">TIX</div>
        <div className="flex sm:text-base text-xs xl:space-x-5 sm:space-x-3 space-x-0">
          <div>
            <p>FAQ</p>
            <p>Brands Guidelines</p>
          </div>
          <div>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="text-left sm:text-base text-xs">
        <div className="mb-3">PARTNERS</div>
        <div className="grid md:grid-cols-3 md:gap-4 grid-cols-2 gap-1">
          {renderMovieLogo()}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:text-base text-xs">
        <div className="text-left">
          <div className="mb-3 text-center">MOBILE APP</div>
          <div className="space-x-2 flex justify-center">
            <GrAndroid type="button" className="sm:text-[35px] text-[20px]" />
            <GrApple type="button" className="sm:text-[35px] text-[20px]" />
          </div>
        </div>
        <div className="text-left">
          <div className="mb-3 text-center">SOCIAL</div>
          <div className="flex justify-center space-x-3">
            <img
              type="button"
              className="sm:w-[35px] sm:h-[35px] w-[20px] h-[20px]"
              src="data:image/png;base64,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"
              alt=""
            />
            <img
              type="button"
              className="sm:w-[35px] sm:h-[35px] w-[20px] h-[20px]"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAflBMVEUAAACVlZWWlpaUlJSUlJSampqVlZWVlZWXl5eWlpaXl5ewsLCVlZWXl5eVlZWVlZWioqKUlJSVlZWVlZWVlZWXl5eenp6YmJiVlZWVlZWVlZWVlZWVlZWVlZWWlpaXl5eVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWWlpaUlJRq2G1aAAAAKXRSTlMAwXf4zxX8Y0OiIwTyHNy7Ce6mlHBQDynVheCd6o1qMl85ta99Vz7LSFONebAAAAKSSURBVFjD3dnX0towEIbhz2AJ415woxn4aXv/NxggM4EEw0qydZLn2Lyj0SJAAxSlIvL92vcjUQUYS7qf5G5IL5aHthQYKlokU+rVbPYwV80S+iZua8MFF1NiOVdoq+eSlLgnvbFWhSRlF41ND2Zr0iFXQnWTHdKVlVBRZmSgSPnNKMiM63NH70Cm1t+nKS5kLiy/DTCmIeTu85obGkZ+Wnfl0lBTD30Ch4YLO/TY0BjiCm9KGsfPW9kPaSQT/MNRmlJSTLbb7eIu//hQjb/MiBfvUqVXOHglMmJtAtXFzPBipbGFfDqrXmYoiZNDPU1HnUWHQiedVRqLXqEvzS+7IJanl85SPKQhsVK9NO3wsCNWjKdJs7zL6I55byfEujzLHqmQEW6EJJbzsmhSssDNiWykE9zMraSn98HHVtJ0BgTZSU+AM/NI5t68HMaZ+1vMf+hsmUfm6MNPvwFaw/SCmyMwN0xv+M+Gg2E6J4bAxTDtECNCY5bmj4OP2DA9tZauiE2zG5J4N92zGXkPO4W0a+mgUwTHVlrgx1a6QmErHWBiKb0GSkvpBKgtpTdAENpJnwAkdtIR86x5usFNbSW9wV1sI33GXWshvcRDbSHdMt9F5mnpM3doPs3fpt2x0x1z9TdPH/DUjJvu8OQZp/nraz5iOhPM/d88PWOugeZph/l5aJ5eR2/ptBkn7eFdHX45uNM/JH11RB9vSoOt0K+UNNBPgA9mNEwS4KOdHLTmFF9cQzJWMP+idGsyI4/giIRMrK9QMJEGAxRQ0rmkJ1xAVbDNdHZ5LqBBFMpH09lDk2hD4snDHgaqBbfn66KGqbqNP88uvwYYxN/my/ds0p4DjKHqyu1xs5rn81XRLk7nCP+vXxyyUrzi8kSkAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
