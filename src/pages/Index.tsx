import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, category: 'Смартфоны', image: '📱', badge: 'Хит' },
  { id: 2, name: 'Samsung Galaxy S24', price: 74990, category: 'Смартфоны', image: '📱' },
  { id: 3, name: 'MacBook Pro 14"', price: 179990, category: 'Ноутбуки', image: '💻', badge: 'Новинка' },
  { id: 4, name: 'Dell XPS 15', price: 124990, category: 'Ноутбуки', image: '💻' },
  { id: 5, name: 'AirPods Pro 2', price: 21990, category: 'Аксессуары', image: '🎧', badge: 'Хит' },
  { id: 6, name: 'Logitech MX Master 3S', price: 8990, category: 'Аксессуары', image: '🖱️' },
  { id: 7, name: 'LG OLED C3 55"', price: 139990, category: 'ТВ', image: '📺', badge: 'Новинка' },
  { id: 8, name: 'Samsung QN90C 65"', price: 169990, category: 'ТВ', image: '📺' },
];

const categories = ['Все', 'Смартфоны', 'Ноутбуки', 'Аксессуары', 'ТВ'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-secondary border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">TechMart</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="Heart" size={20} />
                <span>Избранное</span>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="ShoppingCart" size={20} />
                <span>Корзина</span>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="User" size={20} />
                <span>Профиль</span>
              </a>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    {product.badge && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-6xl text-center my-4">{product.image}</div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Heart" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Товары не найдены</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-secondary border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Icon name="Zap" size={28} />
                </div>
                <h3 className="text-xl font-bold">TechMart</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Интернет-магазин электроники с лучшими ценами и сервисом
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-semibold">ООО "ТехМарт"</p>
                <p>ИНН: 7701234567</p>
                <p>ОГРН: 1157746123456</p>
                <p>КПП: 770101001</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Store" size={18} className="text-primary" />
                Склад-магазин
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>г. Москва, ул. Складская, д. 15, стр. 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="flex-shrink-0" />
                  <span>Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="flex-shrink-0" />
                  <a href="tel:+74951234567" className="hover:text-primary transition-colors">
                    +7 (495) 123-45-67
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Phone" size={16} className="flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Горячая линия</p>
                    <a href="tel:+78001234567" className="hover:text-primary transition-colors">
                      8 (800) 123-45-67
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Mail" size={16} className="flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:info@techmart.ru" className="hover:text-primary transition-colors">
                      info@techmart.ru
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Building2" size={16} className="flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Офис</p>
                    <span>Москва, ул. Примерная, 1</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Гарантия и возврат</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Публичная оферта</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 ООО "ТехМарт". Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;