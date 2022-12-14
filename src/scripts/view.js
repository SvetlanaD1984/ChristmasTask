import data from "../data";
import { toys } from "./store";

const rootContainer = document.querySelector(".catalog__toys");

export function renderToys() {
  rootContainer.innerHTML = "";

  toys.forEach((item) => {
    const toy = document.createElement("div"); // Создаем элемент
    toy.classList.add("card__toy"); // Добавляем класс на элемент

    // Добавляем внутреннюю верстку
    toy.innerHTML = `
    <div class="card_title">
    <p>${item.name}</p>
  </div>
  <div class="card__main-img">
    <img class="card__img" src="./assets/toys/${item.num}.png" alt="toy${
      item.num
    }" />
  </div>
  
  <div class="card__toy_info">
    <p class="card__description">Количество: <span>${item.count}</span></p>
    <p class="card__description">Год покупки: <span>${item.year} год</span></p>
    <p class="card__description">Форма игрушки: <span>${item.shape}</span></p>
    <p class="card__description">Цвет игрушки: <span>${item.color}</span></p>
    <p class="card__description">Размер игрушки: <span>${item.size}</span></p>
    <p class="card__description">Любимая: <span>${
      item.favorite ? "Да" : "Нет"
    }</span></p>
  </div>`;

    rootContainer.appendChild(toy); // вставляем элемент в rootContainer
  });
}
renderToys(data);
