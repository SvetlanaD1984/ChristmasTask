import { renderToys } from "./view";
import { changeToysValue, toys } from "./store";

const sortSelect = document.querySelector(".sorting__select");
sortSelect.addEventListener("change", changeSortDirection);

function sortData(toys, sortDirection) {
  const newToys = [...toys];

  switch (sortDirection) {
    case "UpByName": {
      return newToys.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }

    case "DownByName": {
      return newToys.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }

    case "UpByCount": {
      return newToys.sort((a, b) => a.count - b.count);
    }
    case "DownByCount": {
      return newToys.sort((a, b) => b.count - a.count);
    }

    default: {
      return toys;
    }
  }
}

function changeSortDirection() {
  const sortDirection = sortSelect.value;

  const sortedData = sortData(toys, sortDirection);
  changeToysValue(sortedData);

  renderToys();
}
