// 宠物数据
const pets = [
    {
        id: 1,
        name: "小花",
        category: "cat",
        image: "https://placekitten.com/400/300",
        description: "一只活泼可爱的英短猫",
        age: "2岁",
        gender: "母",
        details: "小花性格温顺，喜欢和人互动。已经完成疫苗接种，健康状况良好。特别喜欢逗猫棒和毛线球。",
        care: "需要定期梳理毛发，保持适量运动。"
    },
    {
        id: 2,
        name: "旺财",
        category: "dog",
        image: "https://placedog.net/400/300",
        description: "忠诚的金毛犬",
        age: "1岁",
        gender: "公",
        details: "旺财是一只充满活力的金毛犬，性格友善，特别适合家庭饲养。喜欢玩飞盘和散步。",
        care: "需要每天运动和训练，定期洗澡和梳理毛发。"
    },
    {
        id: 3,
        name: "雪球",
        category: "rabbit",
        image: "https://place-puppy.com/400x300",
        description: "可爱的荷兰垂耳兔",
        age: "6个月",
        gender: "母",
        details: "雪球毛色纯白，性格温顺，适合室内饲养。喜欢吃胡萝卜和新鲜的草料。",
        care: "需要定期修剪指甲，保持笼舍清洁。"
    },
    {
        id: 4,
        name: "金金",
        category: "fish",
        image: "https://picsum.photos/400/300",
        description: "漂亮的金鱼",
        age: "1岁",
        gender: "未知",
        details: "金金是一条体型优美的金鱼，鳞片闪闪发光，游动优雅。",
        care: "需要定期换水，控制水质和温度。"
    }
];

// 当前选中的分类
let currentCategory = 'all';

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    displayPets();
    setupNavigation();
    setupModal();
});

// 设置导航
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentCategory = link.dataset.category;
            displayPets();
        });
    });
}

// 显示宠物列表
function displayPets() {
    const container = document.getElementById('petsContainer');
    container.innerHTML = '';

    const filteredPets = currentCategory === 'all' 
        ? pets 
        : pets.filter(pet => pet.category === currentCategory);

    filteredPets.forEach(pet => {
        const card = createPetCard(pet);
        container.appendChild(card);
    });
}

// 创建宠物卡片
function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <div class="pet-info">
            <h3>${pet.name}</h3>
            <p>${pet.description}</p>
        </div>
    `;
    card.addEventListener('click', () => showPetDetail(pet));
    return card;
}

// 设置模态框
function setupModal() {
    const modal = document.getElementById('petModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 显示宠物详情
function showPetDetail(pet) {
    const modal = document.getElementById('petModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="pet-detail">
            <img src="${pet.image}" alt="${pet.name}">
            <div class="pet-detail-info">
                <h2>${pet.name}</h2>
                <p><strong>类别：</strong>${getCategoryName(pet.category)}</p>
                <p><strong>年龄：</strong>${pet.age}</p>
                <p><strong>性别：</strong>${pet.gender}</p>
                <p><strong>详细介绍：</strong>${pet.details}</p>
                <p><strong>护理需求：</strong>${pet.care}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        cat: '猫咪',
        dog: '狗狗',
        bird: '鸟类',
        fish: '鱼类',
        rabbit: '兔子'
    };
    return categories[category] || category;
}