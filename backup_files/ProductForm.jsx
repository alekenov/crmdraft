import React, { useState, useEffect } from 'react';
import { Plus, X, Search, ArrowLeft, Upload, Truck, Percent, Calendar, Moon, Sun } from 'lucide-react';

const ProductForm = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('main');
  const [media, setMedia] = useState([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [composition, setComposition] = useState([
    { id: 1, name: 'Роза Red Naomi', quantity: 25, price: 500 }
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState({
    enabled: false,
    amount: 0,
    endDate: ''
  });
  const [freeDelivery, setFreeDelivery] = useState(false);

  const [selectedTags, setSelectedTags] = useState({
    type: [],
    colors: [],
  });

  const tags = {
    type: ['В коробке', 'В корзине', 'Евробукет', 'Высокие розы', 'В крафте'],
    colors: ['Красный', 'Белый', 'Розовый', 'Желтый', 'Микс']
  };

  const availableProducts = [
    { id: 2, name: '51 роза Red Naomi', price: 45000 },
    { id: 3, name: '101 роза Red Naomi', price: 85000 }
  ];

  useEffect(() => {
    const total = composition.reduce((sum, flower) => sum + flower.quantity * flower.price, 0);
    setTotalPrice(total);
  }, [composition]);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file)
    }));
    setMedia([...media, ...files]);
  };

  const TagSelector = ({ category, title }) => (
    <div className="mb-4">
      <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags[category].map(tag => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTags(prev => ({
                ...prev,
                [category]: prev[category].includes(tag)
                  ? prev[category].filter(t => t !== tag)
                  : [...prev[category], tag]
              }));
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags[category].includes(tag)
                ? 'bg-blue-500 text-white'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  const handleAddFlower = () => {
    setComposition([...composition, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveFlower = (id) => {
    setComposition(composition.filter(flower => flower.id !== id));
  };

  const handleFlowerChange = (id, field, value) => {
    setComposition(composition.map(flower => 
      flower.id === id ? { ...flower, [field]: value } : flower
    ));
  };

  const renderMainTab = () => (
    <div className="p-4 space-y-4">
      {/* Медиа файлы */}
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {media.map(item => (
            <div key={item.id} className="relative w-20 h-20 flex-shrink-0">
              <img
                src={item.url}
                alt="Товар"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"
                onClick={() => setMedia(media.filter(m => m.id !== item.id))}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {media.length < 5 && (
            <label className={`w-20 h-20 flex-shrink-0 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
              <Upload size={20} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleMediaUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Теги */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <TagSelector category="type" title="Тип букета" />
        <TagSelector category="colors" title="Цвета букета" />
      </div>

      {/* Состав букета */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Состав букета</h3>
        {composition.map(flower => (
          <div key={flower.id} className="flex items-center mb-2">
            <input
              type="text"
              value={flower.name}
              onChange={(e) => handleFlowerChange(flower.id, 'name', e.target.value)}
              placeholder="Название цветка"
              className={`flex-grow mr-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
            />
            <input
              type="number"
              value={flower.quantity}
              onChange={(e) => handleFlowerChange(flower.id, 'quantity', parseInt(e.target.value))}
              min="1"
              className={`w-16 p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
            />
            <input
              type="number"
              value={flower.price}
              onChange={(e) => handleFlowerChange(flower.id, 'price', parseFloat(e.target.value))}
              min="0"
              step="0.01"
              placeholder="Цена"
              className={`w-24 ml-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
            />
            <button
              onClick={() => handleRemoveFlower(flower.id)}
              className={`ml-2 p-1 rounded-full ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddFlower}
          className={`mt-2 px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-500 hover:bg-gray-200'}`}
        >
          <Plus size={16} className="inline mr-1" /> Добавить цветок
        </button>
      </div>

      {/* Итоговая стоимость */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Итоговая стоимость</h3>
        <div className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          {totalPrice.toLocaleString()} ₸
        </div>
      </div>
    </div>
  );

  const renderGroupingTab = () => (
    <div className="p-4 space-y-4">
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Объединить с другими товарами
        </h3>
        
        {selectedProducts.length > 0 ? (
          <div className="space-y-2 mb-4">
            <h4 className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Выбранные товары:
            </h4>
            {selectedProducts.map(product => (
              <div
                key={product.id}
                className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                  {product.name}
                </span>
                <div className="flex items-center space-x-3">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {product.price.toLocaleString()} ₸
                  </span>
                  <button
                    onClick={() => setSelectedProducts(
                      selectedProducts.filter(p => p.id !== product.id)
                    )}
                    className={`hover:text-red-500 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Выберите товары для объединения в группу
          </p>
        )}

        <button
          onClick={() => setShowAddNew(true)}
          className={`w-full py-3 rounded-lg flex items-center justify-center ${
            darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-500 border-blue-500'
          } border`}
        >
          <Plus size={20} className="mr-2" />
          Добавить товар в группу
        </button>
      </div>
    </div>
  );

  const renderMarketingTab = () => (
    <div className="p-4 space-y-6">
      {/* Скидка */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <label className="flex items-center justify-between cursor-pointer mb-4">
          <div className="flex items-center">
            <Percent size={20} className={darkMode ? 'text-gray-400 mr-2' : 'text-gray-500 mr-2'} />
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Скидка на букет
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={discount.enabled}
              onChange={(e) => setDiscount({...discount, enabled: e.target.checked})}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </div>
        </label>
        
        {discount.enabled && (
          <div className="space-y-4">
            <div className={`flex items-center border rounded-lg p-3 ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <input
                type="number"
                className={`flex-grow bg-transparent outline-none ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
                placeholder="Размер скидки"
                value={discount.amount}
                onChange={(e) => setDiscount({...discount, amount: e.target.value})}
              />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>%</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={20} className={darkMode ? 'text-gray-400 mr-2' : 'text-gray-500 mr-2'} />
              <input
                type="date"
                className={`flex-grow p-2 border rounded-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
                value={discount.endDate}
                onChange={(e) => setDiscount({...discount, endDate: e.target.value})}
              />
            </div>
          </div>
        )}
      </div>

      {/* Бесплатная доставка */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <Truck size={20} className={darkMode ? 'text-gray-400 mr-2' : 'text-gray-500 mr-2'} />
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Бесплатная доставка
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={freeDelivery}
              onChange={(e) => setFreeDelivery(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </div>
        </label>
      </div>

      {/* Итоговая цена со скидкой */}
      {discount.enabled && (
        <div className={`p-4 rounded-lg border ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}>
          <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Цена со скидкой:
          </div>
          <div className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {(totalPrice * (1 - discount.amount / 100)).toLocaleString()} ₸
            <span className={`text-sm ml-2 line-through ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {totalPrice.toLocaleString()} ₸
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className={`p-4 flex items-center border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <button className="mr-4" onClick={onClose}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">25 роз Red Naomi</h1>
        <button 
          className="ml-auto p-2 rounded-full"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-2/3">
            <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex">
                {['main', 'grouping', 'marketing'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-center ${
                      activeTab === tab 
                        ? 'border-b-2 border-blue-500 text-blue-500 font-medium' 
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {tab === 'main' ? 'Основное' : tab === 'grouping' ? 'Объединение' : 'Акции'}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'main' && renderMainTab()}
            {activeTab === 'grouping' && renderGroupingTab()}
            {activeTab === 'marketing' && renderMarketingTab()}
          </div>

          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className={`sticky top-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Сводка</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Тип букета:</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{selectedTags.type.join(', ') || 'Не выбрано'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Цвета:</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{selectedTags.colors.join(', ') || 'Не выбрано'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Количество цветов:</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{composition.reduce((sum, flower) => sum + flower.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Итоговая стоимость:</span>
                  <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{totalPrice.toLocaleString()} ₸</span>
                </div>
                {discount.enabled && (
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Цена со скидкой:</span>
                    <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {(totalPrice * (1 - discount.amount / 100)).toLocaleString()} ₸
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Бесплатная доставка:</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{freeDelivery ? 'Да' : 'Нет'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium">
            Сохранить изменения
          </button>
        </div>
      </div>

      {/* Модальное окно остается без изменений */}
      {showAddNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-2xl mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl`}>
            <div className="p-4 border-b">
              <div className="flex items-center">
                <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-grow mx-3 p-2 bg-transparent outline-none ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                  autoFocus
                />
                <button 
                  onClick={() => setShowAddNew(false)}
                  className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProducts([...selectedProducts, product]);
                    setShowAddNew(false);
                  }}
                  className={`w-full p-4 rounded-lg mb-2 text-left transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {product.name}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.price.toLocaleString()} ₸
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm; 