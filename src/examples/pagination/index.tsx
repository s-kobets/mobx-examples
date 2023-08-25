import { useState } from "react";
import { Pagination as PLevel1 } from "./level_1";
import { Pagination as PLevel2 } from "./level_2";
import { Pagination as PLevel3 } from "./level_3";
import { Pagination as PLevel4 } from "./level_4";
import { Pagination as PLevel5 } from "./level_5";
import { Pagination as PLevel6 } from "./level_6";
import { RootProvider } from "./stores/root-provider";

const tabs = [
  {
    name: "level 6",
    children: (
      <>
        <h1>
          Level 6{" "}
          <span style={{ color: "yellow", fontSize: "1.5rem" }}>(Beta)</span>
        </h1>
        <p>
          Чтобы увидеть всю силу сторов, необходимо наладить работу по
          взаимодействию сторов между собой. В итоге создаем `RootStore` который
          зависит от `RoutherStore` и добавляем зависимость в `PaginationStore`
          от `RoutherStore`. Теперь, чтобы взаимодействовать с url необходимо
          подключать в свой стор `RouterStore` и все получения/изменения с url
          идут через один стор.
        </p>
        <ul>
          <li>
            <strong>Проблема</strong> useRouterStore не понимает когда
            рендерится, хотя и работает через контекст. Помогает observer на
            компонент `Pagination`
          </li>
          <li>
            <strong> Проблема</strong> обернув все в observer, нужно разделить
            все внутри на компоненты иначе перерендеривается все
          </li>
          <li>
            <strong>Проблема</strong> обернув все в observer, сломалась
            выставление input value, хотя реакции срабатывают
          </li>
        </ul>
        <RootProvider>
          <PLevel6 />
        </RootProvider>
      </>
    ),
  },
  {
    name: "level 5",
    children: (
      <>
        <h1>Level 5</h1>
        <p>
          Продолжаем про интеграцию. Теперь попробуем делать запросы и на
          основании их взаимодействовать со стором. Для запросов выбираем
          `useSwr`. Если брать просто fetch то в целом можно обойтись только
          полем в сторе, но хочется показать полноценный пример, с ревалидацией
          и другими плюшками от `useSwr`
        </p>
        <PLevel5 />
      </>
    ),
  },
  {
    name: "level 4",
    children: (
      <>
        <h1>Level 4</h1>
        <p>
          Интеграция с урлом. Пример, который покажет как взаимодействовать стор
          связать с реакт роутер. Вводим понятие `autorun`. mobx следит за
          переменной стора объявленной внутри и если она изменилась, вызывает
          функцию. При первом заходе устанавливаем query page на страницу
        </p>
        <table style={{ marginBottom: "2rem" }}>
          <thead>
            <tr>
              <th></th>
              <th>autorun</th>
              <th>reaction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                запускается в момент первого рендера, до изменения и после
                изменения
              </td>
              <td>запускается только на изменения</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                функция автоматически понимает за какими переменными следить
              </td>
              <td>нужно указать за какими переменными следить</td>
            </tr>
          </tbody>
        </table>
        <PLevel4 />
      </>
    ),
  },
  {
    name: "level 3",
    children: (
      <>
        <h1>Level 3</h1>
        <p>
          Добавляем тотал page. Еще одна связь и добавляем логику с
          максимальной/минимальной страницей для всех компонентов. Кнопкам нужно
          устанавливать `disabled` через отдельную переменную, чтобы перерендер
          был когда переменная поменяется, а не следить за переменной `page`.
        </p>
        <PLevel3 />
      </>
    ),
  },
  {
    name: "level 2",
    children: (
      <>
        <h1>Level 2</h1>
        <p>
          Добавляем инпут, тем самым связываем то что пишем в инпут, кнопки.
          Связь через `reaction`. Перерендер инпут только когда пишем в нем,
          кнопки не перерендериваются
        </p>
        <PLevel2 />
      </>
    ),
  },
  {
    name: "level 1",
    children: (
      <>
        <h1>Level 1</h1>
        <p>
          Пример в котором демонстрируется работа кнопок со стором, без реакт
          хуков. Перерендер кнопок не происходит
        </p>
        <PLevel1 />
      </>
    ),
  },
];

export const Pagination = () => {
  const [activeTab, setActiveTab] = useState(tabs.at(0)?.name ?? "");
  const rendetTabContent =
    tabs.find((tab) => tab.name === activeTab)?.children ?? null;
  return (
    <>
      <div style={{ display: "flex" }}>
        {tabs.map((tab, index) => (
          <button
            style={{ order: tabs.length - index }}
            disabled={activeTab === tab.name}
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}

        <a
          style={{
            display: "block",
            marginLeft: "1rem",
            order: tabs.length + 1,
          }}
          target="_blank"
          rel="noreferrer"
          href={`https://github.com/s-kobets/mobx-examples/tree/main/src/examples/pagination/${activeTab.replace(
            /\s/,
            "_"
          )}`}
        >
          Source
        </a>
      </div>

      {rendetTabContent}
    </>
  );
};
