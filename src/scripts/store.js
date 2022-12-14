import data from "../data";

export let toys = data;

export function changeToysValue(toysArray) {
  toys = [...toysArray];
}
