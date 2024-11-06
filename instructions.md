# CRM система для цветочного магазина

## О проекте
CRM-система для управления сетью цветочных магазинов с возможностью управления заказами, товарами, складом и клиентами.

## Технологический стек
* **Frontend Framework**: React.js 18
* **База данных**: Supabase
* **Стилизация**: Tailwind CSS
* **Иконки**: Lucide React
* **Роутинг**: React Router DOM v6

## Структура проекта
```
src/
├── config/
│   └── supabase.js              # Конфигурация Supabase
├── hooks/
│   └── useSupabase.js           # Хук для работы с Supabase
├── components/
│   └── layout/                  # Компоненты разметки
│       ├── SidebarMenu/         # Боковое меню
│       └── TopBar/              # Верхняя панель
└── pages/
    ├── InventoryPage/           # Страница склада
    │   ├── components/
    │   │   ├── HistoryMode.jsx  # Компонент истории операций
    │   │   └── RevisionMode.jsx # Компонент ревизии склада
    │   └── InventoryPage.jsx    # Основной компонент склада
    ├── ProductsPage/            # Страница товаров
    ├── OrdersPage/              # Страница заказов
    ├── DeliveryPage/           # Страница доставок
    └── DashboardPage/          # Главная страница
```

## Основные компоненты

### Страница склада (InventoryPage)
* **Основные функции**:
  * Просмотр остатков
  * Управление количеством товаров
  * Проведение ревизии
  * История операций
* **Режимы работы**:
  * Inventory - основной режим работы со складом
  * Revision - режим проведения ревизии
  * History - просмотр истории операций

### Страница товаров (ProductsPage)
* Управление каталогом товаров
* Фильтрация по категориям
* Сортировка
* Просмотр остатков

## База данных (Supabase)

### Таблицы
* **products** - Товары
  * id
  * name
  * description
  * price
  * category
  * sku

* **inventory** - Склад
  * id
  * product_id
  * quantity
  * location
  * min_quantity
  * max_quantity
  * status

* **orders** - Заказы
  * id
  * customer_name
  * status
  * total_amount
  * created_at
  * updated_at

* **order_items** - Позиции заказов
  * id
  * order_id
  * product_id
  * quantity
  * price_at_time

* **deliveries** - Доставки
  * id
  * order_id
  * status
  * delivery_date
  * address
  * tracking_number

## Последние изменения
1. Интеграция с Supabase
   * Добавлен хук useSupabase для работы с данными
   * Настроена конфигурация и подключение
   * Созданы основные таблицы

2. Управление складом
   * Добавлен режим ревизии
   * Реализована история операций
   * Адаптивный интерфейс для desktop и mobile

3. Управление товарами
   * Реализована фильтрация и сортировка
   * Интеграция с данными склада
   * Адаптивный интерфейс

## Дальнейшее развитие
1. Авторизация и роли
2. Аналитика и отчеты
3. Система уведомлений
4. Интеграция с платежными системами
5. Управление клиентской базой