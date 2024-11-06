# Структура проекта

## Основные правила
- Все компоненты используют Function Components
- Стили: CSS Modules
- Стейт менеджмент: React Context + hooks
- API: REST, axios

## Архитектурные слои
1. UI (React/React Native)
2. Бизнес-логика (shared)
3. Сервисный слой (API, утилиты)

## Текущие страницы и их назначение
- InventoryPage: Управление складом
- OrdersPage: Управление заказами
- ProductsPage: Каталог продуктов
- DeliveryPage: Управление доставкой
- AnalyticsPage: Аналитика и отчеты
- DashboardPage: Главная панель управления

## Планируемые платформы
- Web (текущая)
- Mobile (будущая)

## Зависимости
- React
- React Router
- Axios
- [другие основные библиотеки]

## Структура папок
src/
  ├── pages/         # Текущая структура
  ├── components/    
  └── utils/        

## TODO
- [ ] Реорганизация структуры
- [ ] Вынос бизнес-логики
- [ ] Создание shared компонентов 