/* 宣告常數，先找到網頁中的元件並給它們一個代號，方便後續下指令 */
const colorBox = document.getElementById('colorBox'); // 抓取顏色方塊元件
const moodEmoji = document.getElementById('moodEmoji'); // 抓取表情符號元件
const moodTitle = document.getElementById('moodTitle'); // 抓取標題文字元件

/* 統一的心情變換功能，包含座標、表情、文字、縮放角度、漸層色與爆炸顏色 */
function updateMood(e, emoji, title, scale, rotate, gradient, burstColor) {
    createBurst(e.clientX, e.clientY, burstColor); // 觸發指定顏色的點擊爆炸
    screenShake(); // 觸發螢幕震動回饋
    
    colorBox.className = "moving"; // 開啟方塊流體動畫
    colorBox.style.background = gradient; // 設定背景漸層顏色
    moodEmoji.innerText = emoji; // 更改中間顯示的表情
    moodTitle.innerText = title; // 更改標題文字
    
    colorBox.style.transform = `scale(${scale}) rotate(${rotate}deg)`; // 設定方塊縮放倍率與旋轉角度
    moodTitle.style.transform = "translateY(-20px)"; // 標題文字向上位移，避免遮擋
}

/* 幸福按鈕行為：點擊後噴發粉色粒子 */
document.getElementById('heartBtn').onclick = function(e) {
    updateMood(e, "💗🥰", "今天有小確幸！！", 1.15, -3, "linear-gradient(-45deg, #fce8e9, #f99598, #f9d0c6, #f8d7da)", "#ffb6c1");
};

/* 開心按鈕行為：點擊後噴發金黃色粒子 */
document.getElementById('happyBtn').onclick = function(e) {
    updateMood(e, "✨🤩", "太棒了！保持快樂！", 1.1, 5, "linear-gradient(-45deg, #b2f2bb, #81e6d9, #ffffff, #b2f2bb)", "#ffd700");
};

/* 生氣按鈕行為：點擊後噴發火紅色粒子 */
document.getElementById('angryBtn').onclick = function(e) {
    updateMood(e, "💢🤬", "呼... 冷靜一下下。", 1, -10, "linear-gradient(-45deg, #eebfb7, #b73333, #cb7b7b, #f6c9c1)", "#ff4d4d");
};

/* 震驚按鈕行為：點擊後噴發亮橘色粒子 */
document.getElementById('shockBtn').onclick = function(e) {
    updateMood(e, "❗️😲", "天啊！發生什麼事？", 1.2, 0, "linear-gradient(-45deg, #fcf4dd, #ffe97a, #fff9c4, #fcf4dd)", "#ffae00");
};

/* 憂鬱按鈕行為：點擊後噴發藍灰色粒子 */
document.getElementById('sadBtn').onclick = function(e) {
    updateMood(e, "☁️😔", "沒關係，休息一下。", 0.9, -5, "linear-gradient(-45deg, #e5e5e5, #607d8b, #cfd8dc, #e5e5e5)", "#90a4ae");
};

/* 恢復原狀按鈕行為：點擊後噴發白色粒子 */
document.getElementById('resetBtn').onclick = function(e) {
    createBurst(e.clientX, e.clientY, "#ffffff"); // 觸發白色爆炸
    screenShake(); // 觸發螢幕震動
    colorBox.className = ""; // 移除流體動畫類別
    colorBox.style.background = "#ffffff"; // 背景換回純白色
    moodEmoji.innerText = "🤍😶"; // 換回初始表情
    moodTitle.innerText = "今天心情如何？"; // 換回初始標題文字
    colorBox.style.transform = "scale(1) rotate(0deg)"; // 恢復方塊大小與角度
    moodTitle.style.transform = "translateY(0)"; // 標題文字回到原始高度
};

/* 點擊爆炸特效功能：根據傳入的座標與特定顏色產生噴射粒子 */
function createBurst(x, y, color) {
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'burst-particle';
        
        p.style.backgroundColor = color; // 設定粒子的背景顏色
        p.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`; // 設定粒子的發光陰影
        
        const size = Math.random() * 6 + 4; // 隨機生成粒子的大小
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        document.body.appendChild(p);
        
        const angle = Math.random() * Math.PI * 2; // 隨機計算噴射角度
        const velocity = Math.random() * 100 + 50; // 隨機計算噴射力度與距離
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity;
        
        setTimeout(() => {
            p.style.transform = `translate(${moveX}px, ${moveY}px) scale(0)`; // 執行位移動畫並縮小至消失
            p.style.opacity = '0'; // 漸變至透明
        }, 10);
        setTimeout(() => { p.remove(); }, 800); // 0.8秒後徹底移除標籤
    }
}

/* 閃粉特效功能：滑鼠移動時產生細微的白金色跟隨粒子 */
document.addEventListener('mousemove', function(e) {
    for (let i = 0; i < 2; i++) {
        const dust = document.createElement('div');
        dust.className = 'fairy-dust'; 
        
        const size = Math.random() * 3 + 3; // 隨機生成閃粉大小
        dust.style.width = size + 'px';
        dust.style.height = size + 'px';
        
        const offsetX = (Math.random() - 0.5) * 15; // 隨機水平偏移量
        const offsetY = (Math.random() - 0.5) * 15; // 隨機垂直偏移量
        dust.style.left = (e.clientX + offsetX) + 'px';
        dust.style.top = (e.clientY + offsetY) + 'px';
        
        document.body.appendChild(dust);
        
        setTimeout(() => {
            const moveX = (Math.random() - 0.5) * 70; // 粒子隨機飄散的水平距離
            const moveY = (Math.random() - 0.5) * 70; // 粒子隨機飄散的垂直距離
            dust.style.transform = `translate(${moveX}px, ${moveY}px) scale(0)`; // 執行飄散縮小動畫
            dust.style.opacity = '0'; // 漸變至透明
        }, 10);
        setTimeout(() => { dust.remove(); }, 1200); // 1.2秒後移除粒子標籤
    } 
});

/* 螢幕震動功能：透過增加 CSS 類別來觸發短暫的畫面晃動感 */
function screenShake() {
    document.body.classList.add('shake-effect');
    setTimeout(() => {
        document.body.classList.remove('shake-effect');
    }, 200); // 0.2秒後移除震動效果類別
}