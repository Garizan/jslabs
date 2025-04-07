class Item {
/**
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета в килограммах.
 * @param {string} rarity - Редкость предмета.
 */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }
/**
 * Получить информацию о предмете.
 * @returns {string} Строка с данными о предмете.
 */
    getInfo() {
        return `Name: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
    }
/**
 * Установить новый вес предмета.
 * @param {number} newWeight - Новый вес.
 */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

class Weapon extends Item {
/**
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес оружия.
 * @param {string} rarity - Редкость.
 * @param {number} damage - Урон.
 * @param {number} durability - Прочность.
 */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
/** 
 * Использовать оружие — уменьшает прочность на 10.
 */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
    }
/**
 * Починить оружие — восстанавливает прочность до 100.
 */
    repair() {
        this.durability = 100;
    }
}
/**
 * Функция-конструктор для создания предметов.
 * @constructor
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета.
 * @param {string} rarity - Редкость предмета.
 */
function ItemConstructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
/**
 * Получить информацию о предмете.
 * @returns {string}
 */
    this.getInfo = function() {
        return `Name: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
    };
/**
 * Изменить вес предмета.
 * @param {number} newWeight
 */
    this.setWeight = function(newWeight) {
        this.weight = newWeight;
    };
}
/**
 * Функция-конструктор для создания оружия.
 * Наследует свойства и методы от ItemConstructor.
 * @constructor
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес.
 * @param {string} rarity - Редкость.
 * @param {number} damage - Урон.
 * @param {number} durability - Прочность.
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
    ItemConstructor.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;

    this.use = function() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
    };

    this.repair = function() {
        this.durability = 100;
    };
}

WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo()); 
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability); // должно уменьшиться
bow.repair();
console.log(bow.durability); // должно быть 100

const axe = new WeaponConstructor("Battle Axe", 5.0, "legendary", 20, 90);
console.log(axe.getInfo?.());
axe.use?.();
console.log(axe.durability); // должно уменьшиться
axe.repair?.();
console.log(axe.durability); // должно быть 100
