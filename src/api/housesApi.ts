import type { House } from '../types/HPHouse';
import type { CharacterDetails } from '../types/HPCharacter';

export const housesApi = {
    url: 'https://potterhead-api.vercel.app/api',

    async getAllHouses(): Promise<House[]> {
        try {
            const response = await fetch(`${this.url}/houses`);
            if (!response.ok) throw new Error('Не удалось загрузить данные');
            const houses = await response.json();
            return houses.map((name: string) => ({ name }));
          } catch (error) {
            console.error('Ошибка загрузки факультетов:', error);
            return [];
        }
    },

    async getStudentsByHouse(house: string): Promise<CharacterDetails[]> {
        console.log(`Пытаемся загрузить студентов факультета: ${house}`);
      
        // Количество попыток
        const maxRetries = 3;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Попытка ${attempt} из ${maxRetries} для ${house}`);
                
                const apiUrl = `${this.url}/houses/${house.toLowerCase()}`;
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                
                // Добавляем небольшую задержку между попытками, кроме первой
                if (attempt > 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Экспоненциальная задержка
                }
                
                const response = await fetch(proxyUrl + apiUrl);
          
                if (!response.ok) {
                    console.warn(`Попытка ${attempt}: HTTP ошибка ${response.status} для ${house}`);
                    continue; // Пробуем еще раз
                }
          
                const houseData = await response.json();
                
                // Проверяем, что получили корректные данные
                if (!houseData) {
                    console.warn(`Попытка ${attempt}: Пустой ответ для ${house}`);
                    continue;
                }
                
                // Убеждаемся, что houseData - массив
                const dataArray = Array.isArray(houseData) ? houseData : [];
                
                const mappedMembers: CharacterDetails[] = dataArray
                    .filter((member: any) => member && typeof member === 'object')
                    .map((member: any): CharacterDetails => ({
                        name: String(member.name || member.fullName || member.character || 'Неизвестный'),
                        gender: String(member.gender || 'unknown').toLowerCase(),
                        hogwartsStudent: Boolean(member.hogwartsStudent || member.student || false),
                        hogwartsStaff: Boolean(member.hogwartsStaff || member.staff || false),
                    }));
                
                // Проверяем, что получили хотя бы одного студента
                if (mappedMembers.length > 0) {
                    console.log(`✓ Успешно загружено ${mappedMembers.length} студентов факультета ${house} (попытка ${attempt})`);
                    return mappedMembers;
                } else {
                    console.warn(`Попытка ${attempt}: Нет данных о студентах для ${house}`);
                    // Пробуем еще раз, может быть временная проблема
                }
                
            } catch (error) {
                console.error(`Попытка ${attempt} для ${house} не удалась:`, error);
                
                // Если это последняя попытка - бросаем ошибку дальше
                if (attempt === maxRetries) {
                    console.error(`Все ${maxRetries} попытки для ${house} не удались`);
                    return [];
                }
            }
        }
        
        // Если дошли сюда - все попытки исчерпаны
        return [];
    }
};