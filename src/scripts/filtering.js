import data from "../data";
import { renderToys } from "./view";
import { changeToysValue } from "./store";
import noUiSlider from "nouislider";

const initialFilters = {
  shape: [],
  color: [],
  size: [],
  searchValue: "",
  onlyFavorite: false,
};

let filters = JSON.parse(JSON.stringify(initialFilters)); // глубокое копирование массива/объекта

// ПОИСК
const searchToys = document.querySelector(".search");
searchToys.addEventListener("input", search);

function search(event) {
  filters.searchValue = event.target.value;

  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

//ПОКАЗАТЬ ВСЕ КАТЕГОРИИ
const allCategories = document.querySelector(".categories__checkbox");
allCategories.addEventListener("click", resetByFilters);

// ФИЛЬТРАЦИЯ ПО ФОРМЕ
const filterShapes = document.querySelectorAll(".shape__button");
filterShapes.forEach((shape) => {
  shape.addEventListener("click", filterByShape);
});

function filterByShape() {
  const currentShape = this.dataset.filter; // получаем значение (напр колокольчика)

  // содержит ли активный класс кнопка, по кот кликнули
  if (this.classList.contains("shape__button_active")) {
    filters.shape = filters.shape.filter((shape) => {
      if (shape !== currentShape) {
        return true;
      }
    });

    this.classList.remove("shape__button_active");
  } else {
    filters.shape.push(currentShape);
    this.classList.add("shape__button_active");
  }

  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

//фИЛЬТРАЦИЯ ПО КОЛИЧЕСТВУ ЭКЗЕМПЛЯРОВ

const amountSlider = document.querySelector(".amount__input");

noUiSlider.create(amountSlider, {
  start: [0, 12],
  tooltips: true,
  connect: true,
  range: {
    min: 0,
    max: 12,
  },
  step: 1,
  format: {
    to: (number) => parseFloat(number).toFixed(0),
    from: (number) => parseFloat(number).toFixed(0),
  },
});

//фИЛЬТРАЦИЯ ПО ГОДУ ПРИОБРЕТЕНИЯ
const yearSlider = document.querySelector(".year__input");
noUiSlider.create(yearSlider, {
  start: [1940, 2021],
  tooltips: true,
  connect: true,
  range: {
    min: 1940,
    max: 2021,
  },
  step: 10,
  format: {
    to: (number) => parseFloat(number).toFixed(0),
    from: (number) => parseFloat(number).toFixed(0),
  },
});

// ФИЛЬТРАЦИЯ ПО ЦВЕТУ
const filterColors = document.querySelectorAll(".button__color");
filterColors.forEach((color) => {
  color.addEventListener("click", filterByColor);
});

function filterByColor() {
  const currentColor = this.dataset.filter; // получаем значение (напр желтый)

  // содержит ли активный класс кнопка, по кот кликнули
  if (this.classList.contains("button__color_active")) {
    filters.color = filters.color.filter((color) => {
      if (color !== currentColor) {
        return true;
      }
    });

    this.classList.remove("button__color_active");
  } else {
    filters.color.push(currentColor);
    this.classList.add("button__color_active");
  }

  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

// ФИЛЬТРАЦИЯ ПО РАЗМЕРУ
const filterSizes = document.querySelectorAll(".size-checkbox");
filterSizes.forEach((size) => {
  size.addEventListener("click", filterBySize);
});

function filterBySize() {
  const currentSize = this.dataset.filter; // получаем значение (напр желтый)

  // содержит ли активный класс кнопка, по кот кликнули
  if (!this.checked) {
    filters.size = filters.size.filter((size) => {
      if (size !== currentSize) {
        return true;
      }
    });
  } else {
    filters.size.push(currentSize);
  }

  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

// ФИЛЬТРАЦИЯ ПО ЛЮБИМОЙ КАТЕГОРИИ
const filterFavourite = document.querySelector(".favourite-checkbox");
filterFavourite.addEventListener("click", filterByFavourite);

function filterByFavourite() {
  if (this.checked) {
    filters.onlyFavorite = true;
  } else {
    filters.onlyFavorite = false;
  }
  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

// const filters = {
//   shape: [],
//   color: [],
//   size: [],
//   searchValue: "",
//   onlyFavorite: false,
// };

// СБРОС ФИЛЬТРОВ
const resetFilters = document.querySelector(".reset__filters");
resetFilters.addEventListener("click", resetByFilters);

function resetByFilters() {
  filters = JSON.parse(JSON.stringify(initialFilters));
  console.log(filters);

  // 1) найти все классы актив
  //2) пройтись по ним и убрать все эти классы
  const activeShapes = document.querySelectorAll(".shape__button_active");
  activeShapes.forEach((shape) => {
    shape.classList.remove("shape__button_active");
  });

  const activeColors = document.querySelectorAll(".button__color_active");
  activeColors.forEach((color) => {
    color.classList.remove("button__color_active");
  });

  const activeSizes = document.querySelectorAll(".size-checkbox");
  activeSizes.forEach((size) => {
    size.checked = false;
  });

  const activeFavorite = document.querySelectorAll(".favourite-checkbox");
  activeFavorite.forEach((favorite) => {
    favorite.checked = false;
  });

  const newFilterToys = makeToysFilter();
  changeToysValue(newFilterToys);

  renderToys();
}

// СБРОС НАСТРОЕК LOCAL STORAGE
const resetSettings = document.querySelector(".reset__settings");
resetSettings.addEventListener("click", resetByFilters);

function resetBySettings() {
  //console.log(filters);
}

//ФИЛЬТРАЦИЯ
function makeToysFilter() {
  return data.filter((toy) => {
    if (filters.shape.length > 0) {
      if (!filters.shape.includes(toy.shape)) {
        return false;
      }
    }

    if (filters.color.length > 0) {
      if (!filters.color.includes(toy.color)) {
        return false;
      }
    }

    if (filters.size.length > 0) {
      if (!filters.size.includes(toy.size)) {
        return false;
      }
    }

    if (filters.onlyFavorite !== toy.favorite) {
      return false;
    }

    if (filters.searchValue != "") {
      if (!toy.name.toUpperCase().includes(filters.searchValue.toUpperCase())) {
        return false;
      }
    }

    return true;
  });
}
