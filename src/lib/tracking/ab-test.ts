import CONFIG from "@/config";

const MAX_RANDOM_NUMBER = 10;
const MIN_RANDOM_NUMBER = 1;

const getRandomNumber = () => Math.floor(Math.random() * MAX_RANDOM_NUMBER) + MIN_RANDOM_NUMBER;

export const shouldDisplayVariation = () =>
  getRandomNumber() >= MAX_RANDOM_NUMBER * CONFIG.VARIATION_PERCENTAGE;
