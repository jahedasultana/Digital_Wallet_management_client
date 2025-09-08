import { driver } from "driver.js";

export const driverConfig = {
  showProgress: true,
  steps: [
    {
      element: "#logo-btn",
      popover: {
        title: "Dream Wallet",
        description: "Click here anytime to return to the homepage.",
      },
    },
    {
      element: "#nav-links",
      popover: {
        title: "Navigation",
        description: "Switch between sections using these links.",
      },
    },
    {
      element: "#theme-toggle",
      popover: {
        title: "Dark/Light Mode",
        description: "Switch between light and dark themes.",
      },
    },
    {
      element: "#user-menu",
      popover: {
        title: "Your Account",
        description: "Profile, settings, and logout are here.",
      },
    },
  ],
};

export const createTour = () => driver(driverConfig);

export const restartTour = () => {
  createTour().drive();
};
