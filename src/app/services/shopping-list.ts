import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
    private groceryItems: { id: number; name: string; image?: string }[] = [
        { id: 1, name: 'Apple', image: 'assets/images/apple.svg' },
        { id: 2, name: 'Banana', image: 'assets/images/banana.svg' },
        { id: 3, name: 'Orange', image: 'assets/images/orange.svg' },
        { id: 4, name: 'Carrot', image: 'assets/images/carrot.svg' },
        { id: 5, name: 'Broccoli', image: 'assets/images/broccoli.svg' },
        { id: 6, name: 'Tomato', image: 'assets/images/tomato.svg' },
        { id: 7, name: 'Milk', image: 'assets/images/milk.svg' },
        { id: 8, name: 'Cheese', image: 'assets/images/cheese.svg' },
        { id: 9, name: 'Yogurt', image: 'assets/images/yogurt.svg' },
        { id: 10, name: 'Bread', image: 'assets/images/bread.svg' },
        { id: 11, name: 'Pasta', image: 'assets/images/pasta.svg' },
        { id: 12, name: 'Rice', image: 'assets/images/rice.svg' },
        { id: 13, name: 'Chicken', image: 'assets/images/chicken.svg' },
        { id: 14, name: 'Beef', image: 'assets/images/beef.svg' },
        { id: 15, name: 'Eggs', image: 'assets/images/egg.svg' },
        { id: 16, name: 'Butter', image: 'assets/images/butter.svg' },
        { id: 17, name: 'Sugar', image: 'assets/images/sugar.svg' },
        { id: 18, name: 'Flour', image: 'assets/images/flour.svg' },
        { id: 19, name: 'Cereal', image: 'assets/images/cereal.svg' },
        { id: 20, name: 'Coffee', image: 'assets/images/coffee.svg' },
        { id: 21, name: 'Tea', image: 'assets/images/tea.svg' },
        { id: 22, name: 'Juice', image: 'assets/images/juice.svg' },
        { id: 23, name: 'Soap', image: 'assets/images/soap.svg' },
        { id: 24, name: 'Toilet Paper', image: 'assets/images/toilet-paper.svg' }
    ];

    getGroceryItems(): { id: number; name: string; image?: string }[] {
        return this.groceryItems;
    }

    getRandomItems(count: number): { id: number; name: string; image?: string }[] {
        const shuffled = [...this.groceryItems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, this.groceryItems.length));
    }

    getGameItems(memorizedItems: { id: number; name: string; image?: string }[]): { id: number; name: string; image?: string }[] {
        // Remove memorized items to avoid duplicates
        const memorizedIds = memorizedItems.map(item => item.id);
        const availableItems = this.groceryItems.filter(item => !memorizedIds.includes(item.id));
        
        // Get random items from availableItems to fill up to 12
        const remainingCount = 14 - memorizedItems.length;
        const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
        const randomItems = shuffled.slice(0, Math.min(remainingCount, availableItems.length));
        
        // Combine memorized items with random items
        return [...memorizedItems, ...randomItems].sort(() => 0.5 - Math.random());
    }
}