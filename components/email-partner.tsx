import React from "react";
import { useForm } from "@formspree/react";
import Button from "@components/button";

export default function PartnerForm() {
  const [state, handleSubmit] = useForm("mdobjayl");
  if (state.succeeded) {
    return <div data-cy="email-partner-success">Thank you for signing up!</div>;
  }
  return (
    <form
      data-cy="email-partner"
      onSubmit={handleSubmit}
      method="POST"
      className="sm:max-w-xl sm:mx-auto lg:mx-0"
    >
      <div className="sm:flex">
        <div className="min-w-0 flex-1 mb-4">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
          />
        </div>
        <div className="sm: mb-4 sm:ml-3">
          <Button
            type="submit"
            disabled={state.submitting}
            text="Get in Touch"
            variant="purple"
          />
        </div>
      </div>
    </form>
  );
}
